	CREATE DATABASE ecommerce;
	USE ecommerce;

	CREATE TABLE users_register (
	  id INT AUTO_INCREMENT PRIMARY KEY,
	  username VARCHAR(100) NOT NULL,
	  email VARCHAR(255) UNIQUE NOT NULL,
	  password VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL DEFAULT 'customer'
	);
 --    ALTER TABLE users_register ADD COLUMN role VARCHAR(50) NOT NULL DEFAULT 'customer';
select * from users_register;

	CREATE TABLE shops_seller_details(
		id INT AUTO_INCREMENT PRIMARY KEY,
		shop_name varchar(100),
		owner_namme varchar(100),
		shop_image_url varchar(500),
		latitude DOUBLE,
		longitude DOUBLE,
		phone_no DOUBLE,
		email varchar(100)
	);

CREATE TABLE user_favorites (	
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  product_id INT,
  FOREIGN KEY (user_id) REFERENCES users_register(id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  UNIQUE(user_id, product_id) -- avoids duplicates
);

	-- CREATE TABLE shop_category(
	-- 	id INT,
	--     cat_name  
		
		
	CREATE TABLE categories(
		id INT AUTO_INCREMENT PRIMARY KEY,
		cat_name NVARCHAR(100),
		cat_url nvarchar(500)
	);

	CREATE TABLE explore(
	id INT AUTO_INCREMENT PRIMARY KEY, 
	prod_name varchar(100), 
	product_image_url nvarchar(500), 
	price DECIMAL(10,2), 
	category varchar(100),
	foreign key (category) references categories(cat_name), 
	quantity varchar(100)
	);
		
	INSERT INTO categories (cat_name, cat_url) VALUES
	('Vegetables','https://tse1.mm.bing.net/th?id=OIP.F9iMl8aFcWhhkJ-hbAsdEgHaE6&pid=Api&P=0&h=180'),
	('Fruits','https://www.fastandup.in/nutrition-world/wp-content/uploads/2023/06/fruit-min.png'),
	('Rice & Grains','https://static.vecteezy.com/system/resources/previews/046/760/066/non_2x/freshly-harvested-rice-grains-in-wooden-bowl-outdoors-in-daylight-free-photo.jpeg'),
	('Pulses & Lentils','https://www.ohmyveg.co.uk/wp-content/uploads/2024/07/betty-subrizi-3OqOUrJBgZU-unsplash-1-1-1.jpg'),
	('Spices & Masalas','https://d3kgrlupo77sg7.cloudfront.net/media/chococoorgspice.com/images/products/coorg-special-19-spice-whole-garam-masala-mix.20240713231207.webp'),
	('Oils & Ghee','https://cdn.shopify.com/s/files/1/0566/6226/1897/files/Ghee_and_oil_preparation_techniques_480x480.jpg?v=1682655303'),
	('Bakery & Dairy','https://keralakonnect.com/web/image/product.template/920/image_1024?unique=9fbffcb'),
	('Beverages','https://sagaciresearch.com/wp-content/uploads/2019/09/Top-10-Carbonated-Soft-Drinks-Egypt-V3.jpg'),
	('Snacks & Packaged Foods','https://m.media-amazon.com/images/I/81ZX-dvnU1L.AC_UF1000,1000_QL80.jpg'),
	('Meat & Seafood','https://www.fbcindustries.com/wp-content/uploads/2018/10/shutterstock_604472048-min.jpg');

	INSERT INTO shops_seller_details (
		shop_name, owner_namme, shop_image_url, latitude, longitude, phone_no, email
	) VALUES
	('FreshMart', 'Rajesh Kumar', 'https://images.unsplash.com/photo-1584467735871-44f07d2508ba', 12.9716, 77.5946, 9876543210, 'rajesh@freshmart.com'),
	('GreenLeaf Store', 'Anita Verma', 'https://images.unsplash.com/photo-1598514982849-dfae69f2397d', 12.9721, 77.5950, 9876543211, 'anita@greenleaf.com'),
	('Daily Basket', 'Ramesh Yadav', 'https://images.unsplash.com/photo-1581579185169-d3e30b03e9a9', 12.9732, 77.5962, 9876543212, 'ramesh@dailybasket.com'),
	('Organic Hub', 'Priya Sharma', 'https://images.unsplash.com/photo-1620189507181-07f5e5de5691', 12.9740, 77.5930, 9876543213, 'priya@organichub.com'),
	('Smart Groceries', 'Nitin Mehta', 'https://images.unsplash.com/photo-1603117987212-5d0a6ec2b8e2', 12.9755, 77.5970, 9876543214, 'nitin@smartgroceries.com'),
	('Nature’s Basket', 'Sneha Rao', 'https://images.unsplash.com/photo-1590080875890-93899440d72c', 12.9760, 77.5940, 9876543215, 'sneha@naturesbasket.com'),
	('Urban Fresh', 'Amit Kapoor', 'https://images.unsplash.com/photo-1556911220-e15b29be8c02', 12.9772, 77.5980, 9876543216, 'amit@urbanfresh.com'),
	('Veggie Vault', 'Deepika Singh', 'https://images.unsplash.com/photo-1583947582883-d8d1a0a1c1ab', 12.9784, 77.5912, 9876543217, 'deepika@veggievault.com'),
	('Farm2Home', 'Karan Joshi', 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce', 12.9791, 77.5938, 9876543218, 'karan@farm2home.com'),
	('GrocerEase', 'Pooja Patel', 'https://images.unsplash.com/photo-1610448949393-92fd7a3e9693', 12.9800, 77.5921, 9876543219, 'pooja@grocerease.com');


	show tables;
	select * from users_register;


	UPDATE shops_seller_details
	SET shop_image_url = 'https://khatabook-assets.s3.amazonaws.com/media/post/5gB_sMvwavcDxq60EL-LIobryUCqgtFEe9mvlZPPEFti7Iwv2Gp8GwzjjvkZHb4EpTqmVEcpfZ7oBJO8NWorrpuL3Pkt1U8BxTln7RddVkwheSJpbU1KRGXcvJHLS155FmIcbnYNeUE5uqW_XW9T6Sw.webp'
	WHERE id = 2;

	CREATE TABLE areas (
	  id INT AUTO_INCREMENT PRIMARY KEY,
	  shop_id INT,
	  latitude DECIMAL(10, 7),
	  longitude DECIMAL(10, 7),
	  address VARCHAR(255),
	  pincode VARCHAR(10),
	  landmark VARCHAR(100),
	  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	  FOREIGN KEY (shop_id) REFERENCES shops_seller_details(id)
	);

	-- KPHB Metro Station
	INSERT INTO areas (shop_id, latitude, longitude, address, pincode, landmark)
	VALUES (1, 17.493274, 78.399515, 'KPHB Metro Station', '500072', 'Near Forum Mall');

	-- Forum Sujana Mall
	INSERT INTO areas (shop_id, latitude, longitude, address, pincode, landmark)
	VALUES (2, 17.493580, 78.399270, 'Forum Sujana Mall, KPHB', '500072', 'Next to Metro');

	-- Malaysian Township Road
	INSERT INTO areas (shop_id, latitude, longitude, address, pincode, landmark)
	VALUES (3, 17.491190, 78.395920, 'Malaysian Township Rd, Kukatpally', '500072', 'Opposite KPHB Colony');

	-- Pragathi Nagar Road
	INSERT INTO areas (shop_id, latitude, longitude, address, pincode, landmark)
	VALUES (4, 17.497045, 78.401890, 'Pragathi Nagar Road', '500090', 'Near JNTU');

	-- JNTU Hyderabad Entrance
	INSERT INTO areas (shop_id, latitude, longitude, address, pincode, landmark)
	VALUES (5, 17.498400, 78.392300, 'JNTU Entrance, Kukatpally', '500085', 'Main gate');

	INSERT INTO areas (shop_id, latitude, longitude, address, pincode, landmark)
	VALUES (
	  6,
	  16.709056,
	  81.650917,
	  'Some Street, Near Eluru',
	  '534002',
	  'Near Railway Station'
	);

	 select * from areas;
	CREATE TABLE products (
	  id INT AUTO_INCREMENT PRIMARY KEY,
	  shop_seller_id INT,
	  foreign key (shop_seller_id) references shops_seller_details(id),
	  category VARCHAR(100),
	  product_name VARCHAR(200),
	  quantity VARCHAR(100),
	  product_image_url VARCHAR(500),
	  price INT
	);
select * from products;
select * from shops_seller_details;
	Drop Table areas;

INSERT INTO products (shop_seller_id, category, product_name, quantity, product_image_url, price) VALUES
	(1, 'Fruits', 'Apple', '1kg', 'https://example.com/images/apple.png', 120),
	(1, 'Vegetables', 'Tomato', '1kg', 'https://example.com/images/tomato.png', 30),
	(1, 'Dairy', 'Milk Packet', '500ml', 'https://example.com/images/milk.png', 25),
	(2, 'Bakery', 'Brown Bread', '400g', 'https://example.com/images/bread.png', 45),
	(2, 'Snacks', 'Potato Chips', '150g', 'https://example.com/images/chips.png', 20),
	(2, 'Beverages', 'Orange Juice', '1L', 'https://example.com/images/orange-juice.png', 80),
	(3, 'Fruits', 'Banana', '1 dozen', 'https://example.com/images/banana.png', 50),
	(3, 'Dairy', 'Paneer', '200g', 'https://example.com/images/paneer.png', 85),
	(3, 'Frozen', 'Green Peas', '500g', 'https://example.com/images/peas.png', 60),
	(1, 'Personal Care', 'Toothpaste', '150g', 'https://example.com/images/toothpaste.png', 55);

	
	select * from users_register;

CREATE TABLE delivery_addresses (
  cust_id INT,
  foreign key (cust_id) references users_register(id),
  full_name VARCHAR(100) NOT NULL,
  phone_number VARCHAR(15) NOT NULL,
  house_number VARCHAR(50) NOT NULL,
  street_address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  address_type ENUM('Home', 'Work', 'Other') DEFAULT 'Home',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  default_address bit
);

select * from delivery_addresses;

ALTER TABLE shops_seller_details MODIFY phone_no VARCHAR(15);

