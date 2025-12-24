// AdminScreen (UI improved + matches your premium understanding theme)
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { decode as base64Decode } from 'react-native-base64';

const API_BASE = 'http://192.168.117.1:5000';
const ENDPOINTS = {
  shop: (id) => `/shop?id=${encodeURIComponent(id)}`,
  updateShop: '/shop',
  categories: '/categories',
  productsBySeller: (id) => `/products/${encodeURIComponent(id)}`,
  createProduct: '/products',
  updateProduct: (id) => `/products/${encodeURIComponent(id)}`,
  deleteProduct: (id) => `/products/${encodeURIComponent(id)}`,
};

const CATEGORY_OPTIONS = ['Fruits', 'Vegetables', 'Milk products', 'Bread items'];
const FILTERS = ['New Product', 'Offers', 'Best Prices', 'Orders History'];

const LOGO = require('../assets/logo.png');

const t = {
  c: {
    bg: '#F6F7FB',
    card: '#FFFFFF',
    text: '#121212',
    sub: '#6A6A6A',
    line: '#E9ECF3',
    pri: '#18A957',
    priSoft: '#EAF8F1',
    danger: '#FF3B30',
    warn: '#FFB020',
  },
  r: { md: 16, lg: 20, pill: 999 },
};

function decodeJwt(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(base64Decode(payload));
  } catch {
    return null;
  }
}
function safeJson(res) {
  return res.json().catch(() => ({}));
}
function mapCategoryArray(raw) {
  if (Array.isArray(raw) && raw.every((x) => typeof x === 'string')) return raw;
  if (Array.isArray(raw)) {
    return raw
      .map((r) => r?.name || r?.title || r?.category || r?.category_name)
      .filter(Boolean);
  }
  return [];
}
function normalizeProduct(p) {
  return {
    id: p.id,
    title: p.title || p.product_name || p.name || 'Untitled',
    price: Number(p.price) || 0,
    type: p.type || p.category || '',
    discount: p.discount ?? p.discount_pct ?? 0,
    image: p.image || p.product_image_url || null,
    quantity: p.quantity || '',
  };
}

export default function AdminScreen() {
  const navigation = useNavigation();

  const [token, setToken] = useState(null);
  const claims = useMemo(() => decodeJwt(token), [token]);
  const sellerId = claims?.id ?? null;
  const sellerIdNum = useMemo(() => (sellerId != null ? Number(sellerId) : null), [sellerId]);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [shopCategory, setShopCategory] = useState('Vegetable');
  const [shopName, setShopName] = useState('SHOP NAME');
  const [ownerName, setOwnerName] = useState('Owner name');
  const [phoneNumber, setPhoneNumber] = useState('Phone number');
  const [shopImage, setShopImage] = useState(null);

  const [isShopModalOpen, setIsShopModalOpen] = useState(false);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);

  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    type: '',
    discount: '',
    image: '',
    quantity: '',
  });
  const [editProduct, setEditProduct] = useState({
    id: null,
    title: '',
    price: '',
    type: '',
    image: '',
    quantity: '',
  });

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [savingShop, setSavingShop] = useState(false);
  const [updatingProduct, setUpdatingProduct] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const tkn = (await AsyncStorage.getItem('token')) || (await AsyncStorage.getItem('userToken'));
        setToken(tkn);
      })();
    }, [])
  );

  useEffect(() => {
    if (!claims) return;
    if (claims.role !== 'admin') {
      Alert.alert('Access denied', 'Admin only. Redirecting to Login.', [
        { text: 'OK', onPress: () => navigation.navigate('LoginScreen') },
      ]);
    }
  }, [claims, navigation]);

  useEffect(() => {
    if (!sellerIdNum || !token) return;
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

    async function load() {
      setLoading(true);
      setMsg({ text: '', type: '' });
      try {
        const [shopRes, catsRes, prodsRes] = await Promise.all([
          fetch(`${API_BASE}${ENDPOINTS.shop(sellerIdNum)}`, { headers }),
          fetch(`${API_BASE}${ENDPOINTS.categories}`, { headers }),
          fetch(`${API_BASE}${ENDPOINTS.productsBySeller(sellerIdNum)}`, { headers }),
        ]);

        if ([shopRes, catsRes, prodsRes].some((r) => r.status === 401 || r.status === 403)) {
          setMsg({ text: 'Please login again.', type: 'error' });
          navigation.navigate('LoginScreen');
          return;
        }
        if (!shopRes.ok) throw new Error((await safeJson(shopRes))?.message || `Failed to load shop (${shopRes.status})`);
        if (!catsRes.ok) throw new Error((await safeJson(catsRes))?.message || `Failed to load categories (${catsRes.status})`);
        if (!prodsRes.ok) throw new Error((await safeJson(prodsRes))?.message || `Failed to load products (${prodsRes.status})`);

        const shopData = await shopRes.json();
        const catsData = await catsRes.json();
        const prodsData = await prodsRes.json();

        setShopCategory(shopData.category || 'Vegetable');
        setShopName(shopData.shop_name || shopData.shopName || 'SHOP NAME');
        setOwnerName(shopData.owner_namme || shopData.ownerName || 'Owner name');
        setPhoneNumber(
          shopData.phone_no != null
            ? String(shopData.phone_no)
            : shopData.phoneNumber != null
              ? String(shopData.phoneNumber)
              : 'Phone number'
        );
        setShopImage(shopData.shop_image_url || shopData.image || null);

        setCategories(mapCategoryArray(catsData));
        setProducts(Array.isArray(prodsData) ? prodsData.map(normalizeProduct) : []);
      } catch (e) {
        setMsg({ text: e.message || 'Failed to load data', type: 'error' });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [sellerIdNum, token, navigation]);

  const toast = (text, type) => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: '', type: '' }), 2200);
  };

  const handleSaveShop = async () => {
    if (!token) return;
    setSavingShop(true);
    try {
      const res = await fetch(`${API_BASE}${ENDPOINTS.updateShop}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          category: shopCategory,
          shopName,
          ownerName,
          phoneNumber,
          image: shopImage,
          shop_name: shopName,
          owner_namme: ownerName,
          shop_image_url: shopImage,
          phone_no: phoneNumber,
        }),
      });
      const data = await safeJson(res);
      if (!res.ok) {
        toast(data.message || `Failed to save shop (HTTP ${res.status})`, 'error');
        return;
      }
      setIsShopModalOpen(false);
      toast('Shop saved.', 'success');
    } catch {
      toast('Cannot reach server.', 'error');
    } finally {
      setSavingShop(false);
    }
  };

  const handleAddProduct = async () => {
    const title = String(newProduct.title || '').trim();
    const type = String(newProduct.type || '').trim();
    const priceNum = Number(newProduct.price);
    if (!title || !type || isNaN(priceNum)) {
      toast('Please fill Product Name, Category, and a valid Price.', 'error');
      return;
    }
    if (!sellerIdNum) {
      toast('No seller id found. Login again.', 'error');
      return;
    }
    if (!token) {
      toast('You must be logged in.', 'error');
      return;
    }

    setAdding(true);
    try {
      const res = await fetch(`${API_BASE}${ENDPOINTS.createProduct}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          shop_seller_id: sellerIdNum,
          category: type,
          product_name: title,
          quantity: newProduct.quantity || null,
          product_image_url: newProduct.image || null,
          price: priceNum,
        }),
      });
      const created = await safeJson(res);
      if (!res.ok) {
        toast(`Failed to add product (HTTP ${res.status})${created?.message ? ': ' + created.message : ''}`, 'error');
        return;
      }
      const normalized = created?.id
        ? normalizeProduct(created)
        : normalizeProduct({
            id: Date.now(),
            product_name: title,
            category: type,
            price: priceNum,
            product_image_url: newProduct.image || null,
            quantity: newProduct.quantity || null,
          });

      setProducts((prev) => [...prev, normalized]);
      setIsNewProductModalOpen(false);
      setNewProduct({ title: '', price: '', type: '', discount: '', image: '', quantity: '' });
      toast('Product added.', 'success');
    } catch {
      toast('Cannot reach server. Check IP/port.', 'error');
    } finally {
      setAdding(false);
    }
  };

  const startEditProduct = (p) => {
    setEditProduct({
      id: p.id,
      title: p.title,
      price: String(p.price),
      type: p.type,
      image: p.image || '',
      quantity: p.quantity || '',
    });
    setIsEditProductModalOpen(true);
  };

  const handleSaveEditedProduct = async () => {
    if (!editProduct.id) {
      toast('No product selected.', 'error');
      return;
    }
    const title = String(editProduct.title || '').trim();
    const type = String(editProduct.type || '').trim();
    const priceNum = Number(editProduct.price);
    if (!title || !type || isNaN(priceNum)) {
      toast('Please fill Product Name, Category, and a valid Price.', 'error');
      return;
    }

    setUpdatingProduct(true);
    try {
      const res = await fetch(`${API_BASE}${ENDPOINTS.updateProduct(editProduct.id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({
          category: type,
          product_name: title,
          quantity: editProduct.quantity || null,
          product_image_url: editProduct.image || null,
          price: priceNum,
        }),
      });
      const data = await safeJson(res);
      if (!res.ok) {
        toast(data.message || `Failed to update product (HTTP ${res.status})`, 'error');
        return;
      }

      setProducts((prev) =>
        prev.map((p) =>
          p.id === editProduct.id
            ? { ...p, title, price: priceNum, type, image: editProduct.image || null, quantity: editProduct.quantity || '' }
            : p
        )
      );
      setIsEditProductModalOpen(false);
      toast('Product updated.', 'success');
    } catch {
      toast('Cannot reach server.', 'error');
    } finally {
      setUpdatingProduct(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const res = await fetch(`${API_BASE}${ENDPOINTS.deleteProduct(id)}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      });
      const data = await safeJson(res);
      if (!res.ok) {
        toast(data.message || `Failed to delete product (HTTP ${res.status})`, 'error');
        return;
      }
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast('Product deleted.', 'success');
    } catch {
      toast('Cannot reach server.', 'error');
    }
  };

  const renderProduct = ({ item }) => (
    <View style={styles.pCard}>
      <View style={styles.pImgWrap}>
        <Image source={item.image ? { uri: item.image } : LOGO} style={styles.pImg} />
        <View style={styles.pBadge}>
          <Text style={styles.pBadgeText}>₹{item.price}</Text>
        </View>
      </View>

      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.pTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.pMeta} numberOfLines={1}>
          {item.type || '—'} {item.quantity ? `• ${item.quantity}` : ''}
        </Text>

        <View style={styles.pActions}>
          <TouchableOpacity style={styles.smallBtn} activeOpacity={0.9} onPress={() => startEditProduct(item)}>
            <Ionicons name="create-outline" size={16} color={t.c.text} />
            <Text style={styles.smallBtnText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.smallBtn, styles.dangerBtn]}
            activeOpacity={0.9}
            onPress={() => handleDeleteProduct(item.id)}
          >
            <Ionicons name="trash-outline" size={16} color={t.c.danger} />
            <Text style={[styles.smallBtnText, { color: t.c.danger }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const FilterChip = ({ label, onPress }) => (
    <TouchableOpacity activeOpacity={0.9} style={styles.fChip} onPress={onPress}>
      <Text style={styles.fChipText}>{label}</Text>
    </TouchableOpacity>
  );

  const CatChip = ({ label, active, onPress }) => (
    <TouchableOpacity activeOpacity={0.9} style={[styles.cChip, active ? styles.cChipA : null]} onPress={onPress}>
      <Text style={[styles.cChipT, active ? styles.cChipTA : null]}>{label}</Text>
    </TouchableOpacity>
  );

  const Input = ({ label, value, onChangeText, placeholder, keyboardType }) => (
    <View style={{ marginTop: 10 }}>
      <Text style={styles.lbl}>{label}</Text>
      <View style={styles.inWrap}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#8E8E8E"
          keyboardType={keyboardType}
          style={styles.inp}
        />
      </View>
    </View>
  );

  const Sheet = ({ visible, onClose, title, children, primaryText, onPrimary, primaryLoading }) => (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.sheetBg}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.sheet}>
            <View style={styles.grab} />
            <View style={styles.sheetHead}>
              <View>
                <Text style={styles.sheetTitle}>{title}</Text>
                <Text style={styles.sheetSub}>Fill the details and save</Text>
              </View>
              <TouchableOpacity style={styles.iconBtn} activeOpacity={0.85} onPress={onClose}>
                <Ionicons name="close" size={18} color={t.c.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>

            <View style={styles.sheetBtns}>
              <TouchableOpacity
                style={[styles.priBtn, primaryLoading ? { opacity: 0.8 } : null]}
                activeOpacity={0.9}
                onPress={onPrimary}
                disabled={primaryLoading}
              >
                {primaryLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.priBtnT}>{primaryText}</Text>}
              </TouchableOpacity>
              <TouchableOpacity style={styles.secBtn} activeOpacity={0.9} onPress={onClose} disabled={primaryLoading}>
                <Text style={styles.secBtnT}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );

  const catList = categories.length ? categories : CATEGORY_OPTIONS;

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.logoWrap}>
            <Image source={LOGO} style={styles.logo} />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.topTitle}>FreshMart</Text>
            <Text style={styles.topSub}>Admin dashboard</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.editShopBtn} activeOpacity={0.9} onPress={() => setIsShopModalOpen(true)}>
          <Ionicons name="create-outline" size={16} color={t.c.pri} />
          <Text style={styles.editShopText}>Edit Shop</Text>
        </TouchableOpacity>
      </View>

      {!!msg.text && (
        <View style={[styles.toast, msg.type === 'error' ? styles.toastErr : styles.toastOk]}>
          <Text style={[styles.toastText, msg.type === 'error' ? { color: '#B42318' } : { color: t.c.pri }]}>{msg.text}</Text>
        </View>
      )}

      <View style={styles.shopCard}>
        <Image source={shopImage ? { uri: shopImage } : LOGO} style={styles.shopImg} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={styles.shopPill}>
              <Ionicons name="storefront-outline" size={14} color={t.c.pri} />
              <Text style={styles.shopPillT}>{shopCategory}</Text>
            </View>
            <View style={styles.shopPillSoft}>
              <Ionicons name="call-outline" size={14} color="#333" />
              <Text style={styles.shopPillSoftT}>{phoneNumber}</Text>
            </View>
          </View>

          <Text style={styles.shopName} numberOfLines={1}>
            {shopName}
          </Text>
          <Text style={styles.shopOwner} numberOfLines={1}>
            Owner: {ownerName}
          </Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 16, marginTop: 4 }}>
        {FILTERS.map((x) => (
          <FilterChip
            key={x}
            label={x}
            onPress={() => (x === 'New Product' ? setIsNewProductModalOpen(true) : null)}
          />
        ))}
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 16, marginTop: 10 }}>
        {loading && categories.length === 0 ? (
          <Text style={{ color: t.c.sub, fontWeight: '800' }}>Loading categories…</Text>
        ) : (
          catList.map((cat) => (
            <CatChip key={cat} label={cat} active={shopCategory === cat} onPress={() => setShopCategory(cat)} />
          ))
        )}
      </ScrollView>

      <View style={styles.listHead}>
        <Text style={styles.listTitle}>Products</Text>
        <TouchableOpacity style={styles.addBtn} activeOpacity={0.9} onPress={() => setIsNewProductModalOpen(true)}>
          <Ionicons name="add" size={18} color="#fff" />
          <Text style={styles.addBtnT}>Add</Text>
        </TouchableOpacity>
      </View>

      {loading && products.length === 0 ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={t.c.pri} />
          <Text style={{ marginTop: 8, color: t.c.sub, fontWeight: '800' }}>Loading products…</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id ?? item.title + item.price)}
          renderItem={renderProduct}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Sheet
        visible={isShopModalOpen}
        onClose={() => setIsShopModalOpen(false)}
        title="Edit shop details"
        primaryText={savingShop ? 'Saving…' : 'Save'}
        onPrimary={handleSaveShop}
        primaryLoading={savingShop}
      >
        <Text style={styles.lbl}>Category</Text>
        <View style={styles.selectWrap}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {catList.map((cat) => (
              <CatChip key={cat} label={cat} active={shopCategory === cat} onPress={() => setShopCategory(cat)} />
            ))}
          </ScrollView>
        </View>

        <Input label="Shop Name" value={shopName} onChangeText={setShopName} placeholder="Shop name" />
        <Input label="Owner Name" value={ownerName} onChangeText={setOwnerName} placeholder="Owner name" />
        <Input label="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Phone number" keyboardType="phone-pad" />
        <Input label="Image URL (optional)" value={shopImage || ''} onChangeText={setShopImage} placeholder="https://.../image.jpg" />
        <View style={{ height: 6 }} />
      </Sheet>

      <Sheet
        visible={isNewProductModalOpen}
        onClose={() => setIsNewProductModalOpen(false)}
        title="Add new product"
        primaryText={adding ? 'Adding…' : 'Add Product'}
        onPrimary={handleAddProduct}
        primaryLoading={adding}
      >
        <Input
          label="Product Name *"
          value={newProduct.title}
          onChangeText={(v) => setNewProduct({ ...newProduct, title: v })}
          placeholder="Eg: Tomato"
        />
        <Input
          label="Price *"
          value={newProduct.price}
          onChangeText={(v) => setNewProduct({ ...newProduct, price: v })}
          placeholder="Eg: 50"
          keyboardType="numeric"
        />

        <Text style={styles.lbl}>Category *</Text>
        <View style={styles.selectWrap}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORY_OPTIONS.map((cat) => (
              <CatChip
                key={cat}
                label={cat}
                active={newProduct.type === cat}
                onPress={() => setNewProduct({ ...newProduct, type: cat })}
              />
            ))}
          </ScrollView>
        </View>

        <Input
          label="Quantity"
          value={newProduct.quantity}
          onChangeText={(v) => setNewProduct({ ...newProduct, quantity: v })}
          placeholder="Eg: 1kg / 1L / 6pcs"
        />
        <Input
          label="Image URL (optional)"
          value={newProduct.image}
          onChangeText={(v) => setNewProduct({ ...newProduct, image: v })}
          placeholder="https://.../image.jpg"
        />
        <View style={{ height: 6 }} />
      </Sheet>

      <Sheet
        visible={isEditProductModalOpen}
        onClose={() => setIsEditProductModalOpen(false)}
        title="Edit product"
        primaryText={updatingProduct ? 'Saving…' : 'Save'}
        onPrimary={handleSaveEditedProduct}
        primaryLoading={updatingProduct}
      >
        <Input
          label="Product Name *"
          value={editProduct.title}
          onChangeText={(v) => setEditProduct({ ...editProduct, title: v })}
          placeholder="Product name"
        />
        <Input
          label="Price *"
          value={editProduct.price}
          onChangeText={(v) => setEditProduct({ ...editProduct, price: v })}
          keyboardType="numeric"
          placeholder="Price"
        />

        <Text style={styles.lbl}>Category *</Text>
        <View style={styles.selectWrap}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORY_OPTIONS.map((cat) => (
              <CatChip
                key={cat}
                label={cat}
                active={editProduct.type === cat}
                onPress={() => setEditProduct({ ...editProduct, type: cat })}
              />
            ))}
          </ScrollView>
        </View>

        <Input
          label="Quantity"
          value={editProduct.quantity}
          onChangeText={(v) => setEditProduct({ ...editProduct, quantity: v })}
          placeholder="Qty"
        />
        <Input
          label="Image URL (optional)"
          value={editProduct.image}
          onChangeText={(v) => setEditProduct({ ...editProduct, image: v })}
          placeholder="https://.../image.jpg"
        />
        <View style={{ height: 6 }} />
      </Sheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: t.c.bg },

  topBar: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    backgroundColor: t.c.bg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logoWrap: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: t.c.card,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 2,
  },
  logo: { width: 24, height: 24, resizeMode: 'contain' },

  topTitle: { fontSize: 16, fontWeight: '900', color: t.c.text },
  topSub: { marginTop: 2, fontSize: 12, fontWeight: '800', color: t.c.sub },

  editShopBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: t.c.priSoft,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    gap: 8,
  },
  editShopText: { fontSize: 13, fontWeight: '900', color: t.c.pri },

  toast: {
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  toastErr: { backgroundColor: '#FEE4E2' },
  toastOk: { backgroundColor: t.c.priSoft },
  toastText: { fontWeight: '900', fontSize: 12 },

  shopCard: {
    backgroundColor: t.c.card,
    marginHorizontal: 16,
    borderRadius: t.c.r,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 2,
  },

  shopImg: { width: 86, height: 86, borderRadius: 18, backgroundColor: '#E9ECF3' },

  shopPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: t.c.priSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: t.r.pill,
    gap: 6,
  },
  shopPillT: { fontSize: 12, fontWeight: '900', color: t.c.pri },

  shopPillSoft: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: t.r.pill,
    gap: 6,
  },
  shopPillSoftT: { fontSize: 12, fontWeight: '900', color: '#333' },

  shopName: { marginTop: 10, fontSize: 16, fontWeight: '900', color: t.c.text },
  shopOwner: { marginTop: 4, fontSize: 12, fontWeight: '800', color: t.c.sub },

  fChip: {
    backgroundColor: t.c.card,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: t.c.line,
  },
  fChipText: { fontWeight: '900', color: '#333', fontSize: 12 },

  cChip: {
    backgroundColor: '#F2F2F2',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 10,
  },
  cChipA: { backgroundColor: t.c.priSoft },
  cChipT: { fontWeight: '900', color: '#333', fontSize: 12 },
  cChipTA: { color: t.c.pri },

  listHead: {
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listTitle: { fontSize: 16, fontWeight: '900', color: t.c.text },

  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: t.c.pri,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
    gap: 6,
  },
  addBtnT: { color: '#fff', fontWeight: '900', fontSize: 13 },

  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  pCard: {
    flexDirection: 'row',
    backgroundColor: t.c.card,
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 2,
  },

  pImgWrap: { position: 'relative' },
  pImg: { width: 84, height: 84, borderRadius: 16, backgroundColor: '#E9ECF3' },

  pBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  pBadgeText: { color: '#fff', fontWeight: '900', fontSize: 12 },

  pTitle: { fontSize: 15, fontWeight: '900', color: t.c.text },
  pMeta: { marginTop: 6, fontSize: 12, fontWeight: '800', color: t.c.sub },

  pActions: { flexDirection: 'row', marginTop: 10, gap: 10 },

  smallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F3F4F7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },
  dangerBtn: { backgroundColor: '#FFF1F3' },
  smallBtnText: { fontWeight: '900', color: '#333', fontSize: 12 },

  sheetBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'flex-end' },

  sheet: {
    backgroundColor: t.c.bg,
    padding: 16,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    maxHeight: '92%',
  },

  grab: {
    alignSelf: 'center',
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: '#D7DBE6',
    marginBottom: 10,
  },

  sheetHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },

  sheetTitle: { fontSize: 16, fontWeight: '900', color: t.c.text },
  sheetSub: { marginTop: 4, fontSize: 12, fontWeight: '800', color: t.c.sub },

  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: t.c.card,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 2,
  },

  lbl: { fontSize: 12, fontWeight: '900', color: t.c.text, marginBottom: 8, marginTop: 10 },

  inWrap: {
    backgroundColor: '#F3F4F7',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inp: { fontSize: 14, fontWeight: '800', color: t.c.text, paddingVertical: 0 },

  selectWrap: { backgroundColor: '#F3F4F7', borderRadius: 16, padding: 8 },

  sheetBtns: { flexDirection: 'row', gap: 10, marginTop: 14 },
  priBtn: {
    flex: 1,
    backgroundColor: t.c.pri,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priBtnT: { color: '#fff', fontWeight: '900', fontSize: 14 },

  secBtn: {
    flex: 1,
    backgroundColor: t.c.priSoft,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secBtnT: { color: t.c.pri, fontWeight: '900', fontSize: 14 },
});
