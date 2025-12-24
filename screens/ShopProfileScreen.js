// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   FlatList,
//   Linking,
//   ActivityIndicator,
//   TextInput,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useCart } from '../context/CartContext';
// import { API_URL } from '@env';

// const ShopProfileScreen = ({ route, navigation }) => {
//   const { shop } = route.params;
//   const [loading, setLoading] = useState(true);
//   const [searchText, setSearchText] = useState('');
//   const [products, setProducts] = useState([]);
//   const api_url = API_URL;

//   const { addToCart, incrementItem, decrementItem, getItemCount, getCartCount } = useCart();

//   const getJwtToken = async () => {
//     try {
//       return await AsyncStorage.getItem('userToken');
//     } catch (error) {
//       console.error('Token Fetch Error:', error);
//       return null;
//     }
//   };

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const fetchProducts = async () => {
//     const token = await getJwtToken();
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.get(`${api_url}/products/${shop.id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const items = response.data.map(item => ({
//         ...item,
//         id: item.id.toString(),
//       }));

//       setProducts(items);
//     } catch (error) {
//       console.error('Fetch Error:', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const filteredProducts = products.filter(item =>
//     (item.product_name || '').toLowerCase().includes(searchText.toLowerCase())
//   );

//   const renderProductItem = ({ item }) => {
//     const itemCount = getItemCount(item.id);

//     return (
//       <View style={styles.card}>
//         <Image source={{ uri: item.product_image_url }} style={styles.productImage} />
//         <Text style={styles.productTitle}>{item.product_name}</Text>
//         <Text style={styles.productDesc}>{item.quantity}</Text>
//         <View style={styles.cardBottom}>
//           <Text style={styles.productPrice}>₹{item.price}</Text>
//           {itemCount === 0 ? (
//             <TouchableOpacity
//               style={styles.addButton}
//               onPress={() => addToCart(item)}
//             >
//               <Icon name="add" size={20} color="#fff" />
//             </TouchableOpacity>
//           ) : (
//             <View style={styles.counterContainer}>
//               <TouchableOpacity
//                 onPress={() => decrementItem(item)}
//                 style={styles.counterButton}
//               >
//                 <Icon name="remove" size={18} color="#fff" />
//               </TouchableOpacity>
//               <Text style={styles.counterText}>{itemCount}</Text>
//               <TouchableOpacity
//                 onPress={() => incrementItem(item)}
//                 style={styles.counterButton}
//               >
//                 <Icon name="add" size={18} color="#fff" />
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>
//       </View>
//     );
//   };

//   const renderHeader = () => (
//     <>
//       <View style={styles.topHeader}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={24} color="#000" />
//         </TouchableOpacity>
//         <Text style={styles.screenTitle}>Shop Profile</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
//           <View>
//             <Icon name="cart-outline" size={24} color="#000" />
//             {getCartCount() > 0 && (
//               <View style={styles.cartBadge}>
//                 <Text style={styles.badgeText}>{getCartCount()}</Text>
//               </View>
//             )}
//           </View>
//         </TouchableOpacity>
//       </View>

//       <Image source={{ uri: shop.shop_image_url }} style={styles.shopImageBanner} resizeMode="cover" />

//       <View style={styles.infoCard}>
//         <Text style={styles.shopName}>{shop.shop_name}</Text>
//         <Text style={styles.owner}>Owner: {shop.owner_namme}</Text>

//         <View style={styles.buttonRowCentered}>
//           <TouchableOpacity style={styles.callButton} onPress={() => Linking.openURL(`tel:${shop.phone_no}`)}>
//             <Icon name="call" size={18} color="#fff" />
//             <Text style={styles.callButtonText}>Call</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.locationButton} onPress={() => console.log('View Location')}>
//             <Icon name="location" size={18} color="#00B14F" />
//             <Text style={styles.locationButtonText}>View Location</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <Text style={styles.categoryTitle}>Available Products</Text>
//       <View style={styles.searchWrapper}>
//         <Icon name="search-outline" size={18} color="#888" style={styles.searchIcon} />
//         <TextInput
//           placeholder="Search for groceries"
//           value={searchText}
//           onChangeText={setSearchText}
//           style={styles.searchInput}
//         />
//       </View>
//     </>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#00B14F" />
//       ) : (
//         <FlatList
//           data={filteredProducts}
//           renderItem={renderProductItem}
//           keyExtractor={item => item.id}
//           numColumns={2}
//           // eslint-disable-next-line react-native/no-inline-styles
//           columnWrapperStyle={{ justifyContent: 'space-between' }}
//           ListHeaderComponent={renderHeader}
//           // eslint-disable-next-line react-native/no-inline-styles
//           contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 15 }}
//           extraData={getCartCount()} // ✅ Add this to ensure FlatList re-renders
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   topHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 15,
//   },
//   screenTitle: { fontSize: 18, fontWeight: 'bold' },
//   cartBadge: {
//     position: 'absolute',
//     top: -6,
//     right: -10,
//     backgroundColor: 'red',
//     borderRadius: 10,
//     paddingHorizontal: 5,
//     paddingVertical: 2,
//   },
//   badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
//   shopImageBanner: {
//     width: '100%',
//     height: 220,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   infoCard: {
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     marginHorizontal: 20,
//     marginTop: -30,
//     padding: 20,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//   },
//   shopName: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
//   owner: { fontSize: 14, color: '#555', marginBottom: 12 },
//   buttonRowCentered: { flexDirection: 'row', justifyContent: 'space-evenly' },
//   callButton: {
//     backgroundColor: '#00B14F',
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 8,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   callButtonText: { color: '#fff', fontWeight: 'bold', marginLeft: 8 },
//   locationButton: {
//     borderColor: '#00B14F',
//     borderWidth: 1.5,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 8,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   locationButtonText: { color: '#00B14F', fontWeight: 'bold', marginLeft: 8 },
//   categoryTitle: { fontSize: 18, fontWeight: 'bold', padding: 15 },
//   searchWrapper: {
//     marginTop: 15,
//     marginHorizontal: 15,
//     backgroundColor: '#f1f1f1',
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//   },
//   searchIcon: { marginRight: 6 },
//   searchInput: { flex: 1, fontSize: 14, paddingVertical: 10 },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 10,
//     marginVertical: 10,
//     width: '48%',
//     elevation: 2,
//   },
//   productImage: { width: '100%', height: 100, resizeMode: 'contain' },
//   productTitle: { fontWeight: 'bold', fontSize: 14, marginTop: 5 },
//   productDesc: { fontSize: 12, color: '#666', marginVertical: 2 },
//   cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
//   productPrice: { fontWeight: 'bold', fontSize: 14 },
//   addButton: { backgroundColor: '#3CB371', padding: 6, borderRadius: 20 },
//   counterContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#3CB371',
//     borderRadius: 20,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//   },
//   counterButton: { paddingHorizontal: 6 },
//   counterText: { color: '#fff', marginHorizontal: 6, fontWeight: 'bold' },
// });

// export default ShopProfileScreen;

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, FlatList,
  Linking, ActivityIndicator, TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCart } from '../context/CartContext';

const LOGO = require('../assets/logo.png');
const API_BASE = 'http://192.168.0.137:5000'; // keep ONE base across app

const ShopProfileScreen = ({ route, navigation }) => {
  const shop = route?.params?.shop;

  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);

  const { addToCart, incrementItem, decrementItem, getItemCount, getCartCount } = useCart();

  const fetchProducts = useCallback(async () => {
    if (!shop?.id) { setLoading(false); return; }

    setLoading(true);
    const token = await AsyncStorage.getItem('userToken');

    if (!token) {
      setLoading(false);
      navigation.replace('LoginScreen');
      return;
    }

    try {
      const res = await axios.get(`${API_BASE}/products/${encodeURIComponent(shop.id)}`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 8000,
      });

      const arr = Array.isArray(res.data) ? res.data : [];
      setProducts(arr.map(x => ({ ...x, id: String(x.id) })));
    } catch (e) {
      console.log('Fetch Error:', e?.response?.data || e.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [shop?.id, navigation]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    const s = searchText.toLowerCase();
    return products.filter(p => String(p.product_name || '').toLowerCase().includes(s));
  }, [products, searchText]);

  const renderProductItem = ({ item }) => {
    const pid = String(item.id);
    const itemCount = getItemCount(pid);

    const cartItem = {
      ...item,
      id: pid,
      count: 1,
    };

    return (
      <View style={styles.card}>
        <Image
          source={item.product_image_url ? { uri: item.product_image_url } : LOGO}
          style={styles.productImage}
        />
        <Text style={styles.productTitle}>{item.product_name}</Text>
        <Text style={styles.productDesc}>{item.quantity}</Text>

        <View style={styles.cardBottom}>
          <Text style={styles.productPrice}>₹{item.price}</Text>

          {itemCount === 0 ? (
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(cartItem)}>
              <Icon name="add" size={20} color="#fff" />
            </TouchableOpacity>
          ) : (
            <View style={styles.counterContainer}>
              <TouchableOpacity onPress={() => decrementItem(cartItem)} style={styles.counterButton}>
                <Icon name="remove" size={18} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.counterText}>{itemCount}</Text>
              <TouchableOpacity onPress={() => incrementItem(cartItem)} style={styles.counterButton}>
                <Icon name="add" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderHeader = () => (
    <>
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.screenTitle}>Shop Profile</Text>

        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <View>
            <Icon name="cart-outline" size={24} color="#000" />
            {getCartCount() > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.badgeText}>{getCartCount()}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <Image
        source={shop?.shop_image_url ? { uri: shop.shop_image_url } : LOGO}
        style={styles.shopImageBanner}
        resizeMode="cover"
      />

      <View style={styles.infoCard}>
        <Text style={styles.shopName}>{shop?.shop_name || 'Shop'}</Text>
        <Text style={styles.owner}>Owner: {shop?.owner_namme || '-'}</Text>

        <View style={styles.buttonRowCentered}>
          <TouchableOpacity
            style={styles.callButton}
            onPress={() => shop?.phone_no ? Linking.openURL(`tel:${shop.phone_no}`) : null}
          >
            <Icon name="call" size={18} color="#fff" />
            <Text style={styles.callButtonText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.locationButton} onPress={() => console.log('View Location')}>
            <Icon name="location" size={18} color="#00B14F" />
            <Text style={styles.locationButtonText}>View Location</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.categoryTitle}>Available Products</Text>
      <View style={styles.searchWrapper}>
        <Icon name="search-outline" size={18} color="#888" style={styles.searchIcon} />
        <TextInput
          placeholder="Search for groceries"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00B14F" />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 15 }}
          extraData={getCartCount()}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15 },
  screenTitle: { fontSize: 18, fontWeight: 'bold' },
  cartBadge: { position: 'absolute', top: -6, right: -10, backgroundColor: 'red', borderRadius: 10, paddingHorizontal: 5, paddingVertical: 2 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  shopImageBanner: { width: '100%', height: 220, borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  infoCard: { backgroundColor: '#fff', borderRadius: 20, marginHorizontal: 20, marginTop: -30, padding: 20, elevation: 4 },
  shopName: { fontSize: 20, fontWeight: 'bold', marginBottom: 4 },
  owner: { fontSize: 14, color: '#555', marginBottom: 12 },
  buttonRowCentered: { flexDirection: 'row', justifyContent: 'space-evenly' },
  callButton: { backgroundColor: '#00B14F', flexDirection: 'row', alignItems: 'center', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20 },
  callButtonText: { color: '#fff', fontWeight: 'bold', marginLeft: 8 },
  locationButton: { borderColor: '#00B14F', borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 20 },
  locationButtonText: { color: '#00B14F', fontWeight: 'bold', marginLeft: 8 },
  categoryTitle: { fontSize: 18, fontWeight: 'bold', padding: 15 },
  searchWrapper: { marginTop: 15, marginHorizontal: 15, backgroundColor: '#f1f1f1', borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 },
  searchIcon: { marginRight: 6 },
  searchInput: { flex: 1, fontSize: 14, paddingVertical: 10 },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 10, marginVertical: 10, width: '48%', elevation: 2 },
  productImage: { width: '100%', height: 100, resizeMode: 'contain' },
  productTitle: { fontWeight: 'bold', fontSize: 14, marginTop: 5 },
  productDesc: { fontSize: 12, color: '#666', marginVertical: 2 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 },
  productPrice: { fontWeight: 'bold', fontSize: 14 },
  addButton: { backgroundColor: '#3CB371', padding: 6, borderRadius: 20 },
  counterContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#3CB371', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 4 },
  counterButton: { paddingHorizontal: 6 },
  counterText: { color: '#fff', marginHorizontal: 6, fontWeight: 'bold' },
});

export default ShopProfileScreen;
