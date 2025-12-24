const express = require('express');
const Razorpay = require('razorpay');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config(); // ✅ Load .env if present

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = process.env.SECRET_KEY || 'dsjasjsdbbxa43vffvnfvhdbnchv3jhc4hcvg2ccg'; // Use env in production

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Suryateja@1',
  database: process.env.DB_NAME || 'ecommerce',
});

db.connect(err => {
    if (err) {throw err;}
  console.log('✅ MySQL connected...');
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_9A3QWbqnrOe3ds', // TEST key
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'fyHRB9CI9AED06Bz772EdLRZ', // TEST secret
});

app.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount,
      currency: 'INR',
      receipt: 'receipt_' + Date.now(),
    });
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send('Order creation failed');
  }
});

// Payment verification endpoint
app.post('/verify-payment', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    // Verify the payment signature
    const text = razorpay_order_id + '|' + razorpay_payment_id;
    const crypto = require('crypto');
    const signature = crypto
      .createHmac('sha256', 'fyHRB9CI9AED06Bz772EdLRZ')
      .update(text)
      .digest('hex');

    if (signature === razorpay_signature) {
      // Payment is verified
      res.json({
        success: true,
        message: 'Payment verified successfully',
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
    });
  }
});

// ✅ Register (no password hashing)
app.post('/register', (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  // Check if email exists
  db.query('SELECT * FROM users_register WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Insert new user
    db.query(
      'INSERT INTO users_register (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, password, role],
      (err1, result) => {
        if (err1) {
          return res.status(500).json({ message: 'Registration failed' });
        }
        const token = jwt.sign({ id: result.insertId, email, role }, SECRET_KEY);
        res.status(201).json({ message: 'User registered successfully', token });
      }
    );
  });
});


// ✅ Login (compare plain password)
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users_register WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length === 0 || results[0].password !== password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = results[0];
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY);
    res.json({ message: 'Login successful', token, role: user.role });
  });
});

// ✅ Middleware to verify token
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  if (!token){
     return res.sendStatus(401);
  }
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err){
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

app.get('/shops', authenticateToken, (req, res) => {
  db.query('SELECT * FROM shops_seller_details', (err, result) => {
    if (err) {return res.status(500).send(err);}
    res.json(result);
  });
});

// Provide a single shop object for dashboard banner (first shop or by ?id=)
// Get shop for seller (by ?id= or token)
// Get shop for seller (by ?id= or from token)
app.get('/shop', authenticateToken, (req, res) => {
  const sellerId = req.query.id ? Number(req.query.id) : req.user.id;

  const sql = `
    SELECT id, shop_name, owner_namme, shop_image_url, latitude, longitude, phone_no, email
    FROM shops_seller_details
    WHERE id = ?
    LIMIT 1
  `;

  db.query(sql, [sellerId], (err, rows) => {
    if (err) {return res.status(500).json({ message: 'Failed to fetch shop' });}
    if (rows.length === 0) {return res.status(404).json({ message: 'No shop found' });}

    const s = rows[0];
    res.json({
      // raw DB keys (match your table)
      id: s.id,
      shop_name: s.shop_name,
      owner_namme: s.owner_namme,
      shop_image_url: s.shop_image_url,
      latitude: s.latitude,
      longitude: s.longitude,
      phone_no: s.phone_no,
      email: s.email,                 // ✅ email included

      // friendly aliases (optional)
      shopName: s.shop_name,
      ownerName: s.owner_namme,
      image: s.shop_image_url,
      phoneNumber: s.phone_no != null ? String(s.phone_no) : '',
      shopEmail: s.email,            // ✅ alias if your UI expects a different name
    });
  });
});



// === Update Shop (seller-only; derives seller id from token) ===
// Update shop for token's seller id
app.put('/shop', authenticateToken, (req, res) => {
  const sellerId = req.user.id;

  // Accept both raw keys and legacy aliases from older clients
  const shop_name      = req.body.shop_name      ?? req.body.shopName      ?? null;
  const owner_namme    = req.body.owner_namme    ?? req.body.ownerName     ?? null;
  const shop_image_url = req.body.shop_image_url ?? req.body.image         ?? null;
  const phone_no       = req.body.phone_no       ?? req.body.phoneNumber   ?? null;
  const email          = req.body.email          ?? req.body.shopEmail     ?? null; // ✅ email
  const latitude       = req.body.latitude       ?? null;
  const longitude      = req.body.longitude      ?? null;

  const updateSql = `
    UPDATE shops_seller_details
       SET shop_name = ?, owner_namme = ?, shop_image_url = ?, latitude = ?, longitude = ?, phone_no = ?, email = ?
     WHERE id = ?
  `;

  db.query(updateSql, [shop_name, owner_namme, shop_image_url, latitude, longitude, phone_no, email, sellerId], (err, result) => {
    if (err) {return res.status(500).json({ message: 'Failed to update shop' });}

    if (result.affectedRows === 0) {
      const insertSql = `
        INSERT INTO shops_seller_details
          (id, shop_name, owner_namme, shop_image_url, latitude, longitude, phone_no, email)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      db.query(insertSql, [sellerId, shop_name, owner_namme, shop_image_url, latitude, longitude, phone_no, email], (err2) => {
        if (err2) {return res.status(500).json({ message: 'Failed to insert shop' });}
        return res.status(201).json({ message: 'Shop created' });
      });
    } else {
      return res.json({ message: 'Shop updated' });
    }
  });
});


// ---------- Products ----------
// All products (for dashboard)
app.get('/products', authenticateToken, (req, res) => {
  db.query('SELECT * FROM products', (err, result) => {
    if (err) {return res.status(500).send(err);}
    res.json(result);
  });
});

// Products by seller id (existing)
app.get('/products/:shop_seller_id', authenticateToken, (req, res) => {
  const shopSellerId = req.params.shop_seller_id;
  db.query('SELECT * FROM products WHERE shop_seller_id = ?', [shopSellerId], (err, result) => {
    if (err) {return res.status(500).send(err);}
    res.json(result);
  });
});

// add products
app.post('/products', authenticateToken, (req, res) => {
  const { shop_seller_id, category, product_name, quantity, product_image_url, price } = req.body;
  if (!shop_seller_id || !product_name || !category || price == null) {
    return res.status(400).json({ message: 'shop_seller_id, product_name, category and price are required' });
  }
  const sql = `INSERT INTO products (shop_seller_id, category, product_name, quantity, product_image_url, price)
               VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [shop_seller_id, category, product_name, quantity || null, product_image_url || null, Number(price)],
    (err, result) => {
      if (err) {return res.status(500).json({ message: 'Insert failed' });}
      res.status(201).json({ id: result.insertId, shop_seller_id, category, product_name, quantity: quantity || null, product_image_url: product_image_url || null, price: Number(price) });
    }
  );
});
// === Update Product (seller-only; ownership enforced) ===
app.put('/products/:id', authenticateToken, (req, res) => {
  const sellerId = req.user.id;
  const productId = req.params.id;
  const { category, product_name, quantity, product_image_url, price } = req.body;

  const sql = `
    UPDATE products
       SET category = ?, product_name = ?, quantity = ?, product_image_url = ?, price = ?
     WHERE id = ? AND shop_seller_id = ?
  `;
  db.query(sql, [category || null, product_name || null, quantity || null, product_image_url || null, Number(price), productId, sellerId], (err, result) => {
    if (err) {return res.status(500).json({ message: 'Update failed' });}
    if (result.affectedRows === 0) {return res.status(404).json({ message: 'Product not found or not yours' });}
    res.json({ message: 'Product updated' });
  });
});

// === Delete Product (seller-only; ownership enforced) ===
app.delete('/products/:id', authenticateToken, (req, res) => {
  const sellerId = req.user.id;
  const productId = req.params.id;

  const sql = 'DELETE FROM products WHERE id = ? AND shop_seller_id = ?';
  db.query(sql, [productId, sellerId], (err, result) => {
    if (err) {return res.status(500).json({ message: 'Delete failed' });}
    if (result.affectedRows === 0) {return res.status(404).json({ message: 'Product not found or not yours' });}
    res.json({ message: 'Product deleted' });
  });
});
// ---------- Categories ----------
app.get('/categories', authenticateToken, (req, res) => {
  db.query('SELECT * FROM categories', (err, result) => {
    if (err) {return res.status(500).send(err);}

    // If your frontend expects just names like ["Fruits",...],
    // you can map here. Otherwise return raw table rows.
    // Example mapper (uncomment if needed):
    // const names = result.map(r => r.name || r.title).filter(Boolean);
    // return res.json(names);

    res.json(result);
  });
});

// ✅ Add to Favorites
app.post('/favorites', authenticateToken, (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  const sql = 'INSERT IGNORE INTO user_favorites (user_id, product_id) VALUES (?, ?)';
  db.query(sql, [userId, productId], (err, result) => {
    if (err) {return res.status(500).json({ message: 'Error adding to favorites' });}
    res.json({ message: 'Added to favorites' });
  });
});

// ✅ Remove from Favorites
app.delete('/favorites', authenticateToken, (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  const sql = 'DELETE FROM user_favorites WHERE user_id = ? AND product_id = ?';
  db.query(sql, [userId, productId], (err, result) => {
    if (err) {return res.status(500).json({ message: 'Error removing from favorites' });}
    res.json({ message: 'Removed from favorites' });
  });
});

// ✅ Get User Favorites
app.get('/favorites', authenticateToken, (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT p.* FROM products p
    JOIN user_favorites uf ON p.id = uf.product_id
    WHERE uf.user_id = ?
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) {return res.status(500).json({ message: 'Error fetching favorites' });}
    res.json(results);
  });
});


// ✅ Nearby Areas within 1km
app.get('/areas', authenticateToken, (req, res) => {
  const userLat = parseFloat(req.query.lat);
  const userLng = parseFloat(req.query.lng);

  if (!userLat || !userLng) {
    return res.status(400).json({ error: 'Latitude and longitude are required.' });
  }

  db.query('SELECT * FROM areas', (err, results) => {
    if (err){
       return res.status(500).send(err);
    }
    const R = 6371000;
    const filtered = results.filter(area => {
      const dLat = ((area.latitude - userLat) * Math.PI) / 180;
      const dLon = ((area.longitude - userLng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(userLat * Math.PI / 180) *
        Math.cos(area.latitude * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      return distance <= 1000;
    });

    res.json(filtered);
  });
});

// ✅ Delivery Addresses

// Create
app.post('/delivery-addresses', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const {
    full_name, phone_number, house_number,
    street_address, city, state,
    address_type, default_address,
  } = req.body;

  if (!full_name || !phone_number || !house_number || !street_address || !city || !state) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const resetSql = 'UPDATE delivery_addresses SET default_address = 0 WHERE cust_id = ?';
  const insertSql = `
    INSERT INTO delivery_addresses (
      cust_id, full_name, phone_number, house_number,
      street_address, city, state, address_type, default_address
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.beginTransaction(err => {
    if (err) {return res.status(500).json({ error: 'Transaction error' });}

    const proceedInsert = () => {
      db.query(insertSql, [
        userId, full_name, phone_number, house_number,
        street_address, city, state, address_type || 'Home',
        default_address ? 1 : 0,
      ], (err2, result) => {
        if (err2) {return db.rollback(() => res.status(500).json({ error: 'Insert failed' }));}
        db.commit(err3 => {
          if (err3) {return res.status(500).json({ error: 'Commit failed' });}
          res.status(201).json({ message: 'Address saved', insertId: result.insertId });
        });
      });
    };

    if (default_address) {
      db.query(resetSql, [userId], (err1) => {
        if (err1) {return db.rollback(() => res.status(500).json({ error: 'Reset failed' }));}
        proceedInsert();
      });
    } else {
      proceedInsert();
    }
  });
});

// Read
app.get('/delivery-addresses', authenticateToken, (req, res) => {
  db.query('SELECT * FROM delivery_addresses WHERE cust_id = ?', [req.user.id], (err, results) => {
    if (err) {return res.status(500).json({ error: 'Fetch failed' });}
    res.json(results);
  });
});

// Update
app.put('/delivery-addresses/:id', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const addressId = req.params.id;
  const {
    full_name, phone_number, house_number,
    street_address, city, state,
    address_type, default_address,
  } = req.body;

  const updateSql = `
    UPDATE delivery_addresses
    SET full_name = ?, phone_number = ?, house_number = ?,
        street_address = ?, city = ?, state = ?, address_type = ?, default_address = ?
    WHERE id = ? AND cust_id = ?
  `;

  db.beginTransaction(err => {
    if (err) {return res.status(500).json({ error: 'Transaction error' });}

    const doUpdate = () => {
      db.query(updateSql, [
        full_name, phone_number, house_number,
        street_address, city, state,
        address_type || 'Home',
        default_address ? 1 : 0,
        addressId, userId,
      ], (err2) => {
        if (err2) {return db.rollback(() => res.status(500).json({ error: 'Update failed' }));}
        db.commit(err3 => {
          if (err3) {return res.status(500).json({ error: 'Commit failed' });}
          res.json({ message: 'Address updated' });
        });
      });
    };

    if (default_address) {
      db.query('UPDATE delivery_addresses SET default_address = 0 WHERE cust_id = ?', [userId], (err1) => {
        if (err1) {return db.rollback(() => res.status(500).json({ error: 'Reset default failed' }));}
        doUpdate();
      });
    } else {
      doUpdate();
    }
  });
});

// Delete
app.delete('/delivery-addresses/:id', authenticateToken, (req, res) => {
  db.query('DELETE FROM delivery_addresses WHERE id = ? AND cust_id = ?', [req.params.id, req.user.id], (err, result) => {
    if (err) {return res.status(500).json({ error: 'Delete failed' });}
    if (result.affectedRows === 0) {return res.status(404).json({ error: 'Not found' });}
    res.json({ message: 'Address deleted' });
  });
});

// ✅ Health Check or Root Welcome Route
app.get('/', (req, res) => {
  res.send('✅ FreshMart API is running');
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () =>
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`)
);

