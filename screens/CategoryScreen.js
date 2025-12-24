// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   Platform,
//   StatusBar,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// // import { SafeAreaView } from 'react-native-safe-area-context';

// const initialProducts = [
//   {
//     id: '1',
//     name: 'fresh! Tomato - Local',
//     weight: '1 kg',
//     price: 38,
//     oldPrice: 65,
//     offer: '42% OFF',
//     label: 'Har Din Sasta!',
//     image: require('../assets/tomato.png'),
//   },
//   {
//     id: '2',
//     name: 'fresh! Onion',
//     weight: '1 kg',
//     price: 29,
//     oldPrice: 56,
//     offer: '48% OFF',
//     label: 'Get for Free',
//     image: require('../assets/onion.png'),
//   },
//   {
//     id: '3',
//     name: 'fresh! Chilli - Green Long',
//     weight: '100 g',
//     price: 5.6,
//     oldPrice: 12,
//     offer: '53% OFF',
//     label: 'Har Din Sasta!',
//     image: require('../assets/chilli.png'),
//   },
//   {
//     id: '4',
//     name: 'fresh! Watermelon - Small',
//     weight: '1 pc - 1.7 - 2.5 kg',
//     price: 67,
//     oldPrice: 134,
//     offer: '49% OFF',
//     label: 'Har Din Sasta!',
//     image: require('../assets/watermelon.png'),
//   },
// ];

// const CategoryScreen = () => {
//   const [products, setProducts] = useState(
//     initialProducts.map(item => ({ ...item, count: 0 }))
//   );

//   const increaseCount = (id) => {
//     setProducts(prev =>
//       prev.map(item =>
//         item.id === id ? { ...item, count: item.count + 1 } : item
//       )
//     );
//   };

//   const decreaseCount = (id) => {
//     setProducts(prev =>
//       prev.map(item =>
//         item.id === id && item.count > 0
//           ? { ...item, count: item.count - 1 }
//           : item
//       )
//     );
//   };

//   return (
//     <View style={styles.safeArea}>
//       <View style={styles.container}>
//         {/* Header */}
//         <View style={styles.header}>
//           <TouchableOpacity>
//             <Icon name="arrow-back" size={22} color="#000" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Fruits & Vegetables</Text>
//           <TouchableOpacity>
//             <Icon name="search" size={22} color="#000" />
//           </TouchableOpacity>
//         </View>

//         {/* Filters */}
//         <ScrollView horizontal style={styles.filters} showsHorizontalScrollIndicator={false}>
//           <Text style={styles.filter}>🍌 Banana, Sapota & Papaya</Text>
//           <Text style={styles.filter}>🥝 Kiwi</Text>
//         </ScrollView>

//         {/* Products Grid */}
//         <FlatList
//           data={products}
//           keyExtractor={item => item.id}
//           numColumns={2}
//           contentContainerStyle={styles.productGrid}
//           renderItem={({ item }) => (
//             <View style={styles.productCard}>
//               <View style={styles.offerTag}>
//                 <Text style={styles.offerText}>{item.offer}</Text>
//               </View>
//               <Image source={item.image} style={styles.productImage} />
//               <Text style={styles.productPrice}>₹{item.price} <Text style={styles.oldPrice}>₹{item.oldPrice}</Text></Text>
//               <Text style={styles.productName}>{item.name}</Text>
//               <Text style={styles.productWeight}>{item.weight}</Text>

//               {item.count === 0 ? (
//                 <TouchableOpacity style={styles.addButton} onPress={() => increaseCount(item.id)}>
//                   <Icon name="add" size={18} color="#fff" />
//                 </TouchableOpacity>
//               ) : (
//                 <View style={styles.counterContainer}>
//                   <TouchableOpacity onPress={() => decreaseCount(item.id)} style={styles.counterButton}>
//                     <Icon name="remove" size={18} color="#fff" />
//                   </TouchableOpacity>
//                   <Text style={styles.counterText}>{item.count}</Text>
//                   <TouchableOpacity onPress={() => increaseCount(item.id)} style={styles.counterButton}>
//                     <Icon name="add" size={18} color="#fff" />
//                   </TouchableOpacity>
//                 </View>
//               )}
//             </View>
//           )}
//         />

//         {/* Cart Button */}
//         <TouchableOpacity style={styles.cartButton}>
//           <Text style={styles.cartText}>View Cart</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 100,
//     backgroundColor: '#fff',
//   },
//   container: { flex: 1 },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   headerTitle: { fontSize: 18, fontWeight: 'bold' },
//   filters: {
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     backgroundColor: '#fff',
//   },
//   filter: {
//     backgroundColor: '#e8f5e9',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     marginRight: 10,
//     fontSize: 13,
//     color: '#2e7d32',
//     fontWeight: '500',
//   },
//   productGrid: {
//     paddingHorizontal: 12,
//     paddingBottom: 100,
//   },
//   productCard: {
//     width: '47%',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 10,
//     margin: '1.5%',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.08,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     position: 'relative',
//   },
//   offerTag: {
//     position: 'absolute',
//     top: 8,
//     left: 8,
//     backgroundColor: '#2e7d32',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 4,
//     zIndex: 1,
//   },
//   offerText: {
//     color: '#fff',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
//   productImage: {
//     width: '100%',
//     height: 100,
//     resizeMode: 'contain',
//     marginBottom: 8,
//   },
//   productPrice: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   oldPrice: {
//     fontSize: 12,
//     color: '#888',
//     textDecorationLine: 'line-through',
//   },
//   productName: {
//     fontSize: 13,
//     color: '#333',
//     fontWeight: '500',
//   },
//   productWeight: {
//     fontSize: 12,
//     color: '#666',
//     marginBottom: 8,
//   },
//   addButton: {
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
//     backgroundColor: '#00B14F',
//     borderRadius: 6,
//     padding: 6,
//   },
//   counterContainer: {
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
//     backgroundColor: '#00B14F',
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//   },
//   counterButton: {
//     paddingHorizontal: 6,
//   },
//   counterText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     marginHorizontal: 6,
//   },
//   cartButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     backgroundColor: '#00B14F',
//     borderRadius: 50,
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     elevation: 4,
//   },
//   cartText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 13,
//   },
// });

// export default CategoryScreen;

// CategoryScreen.js (UI improved + consistent with your new theme)
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const t = {
  c: {
    bg: '#F6F7FB',
    card: '#FFFFFF',
    text: '#121212',
    sub: '#6A6A6A',
    line: '#E9ECF3',
    pri: '#18A957',
    priSoft: '#EAF8F1',
    dangerSoft: '#FFF1F3',
    danger: '#FF3B30',
    dark: '#0E0E10',
  },
  r: { md: 16, lg: 20, pill: 999 },
};

const initialProducts = [
  {
    id: '1',
    name: 'fresh! Tomato - Local',
    weight: '1 kg',
    price: 38,
    oldPrice: 65,
    offer: '42% OFF',
    label: 'Har Din Sasta!',
    image: require('../assets/tomato.png'),
  },
  {
    id: '2',
    name: 'fresh! Onion',
    weight: '1 kg',
    price: 29,
    oldPrice: 56,
    offer: '48% OFF',
    label: 'Get for Free',
    image: require('../assets/onion.png'),
  },
  {
    id: '3',
    name: 'fresh! Chilli - Green Long',
    weight: '100 g',
    price: 5.6,
    oldPrice: 12,
    offer: '53% OFF',
    label: 'Har Din Sasta!',
    image: require('../assets/chilli.png'),
  },
  {
    id: '4',
    name: 'fresh! Watermelon - Small',
    weight: '1 pc - 1.7 - 2.5 kg',
    price: 67,
    oldPrice: 134,
    offer: '49% OFF',
    label: 'Har Din Sasta!',
    image: require('../assets/watermelon.png'),
  },
];

const CategoryScreen = ({ navigation }) => {
  const [q, setQ] = useState('');
  const [products, setProducts] = useState(
    initialProducts.map((item) => ({ ...item, count: 0, isFavorite: false }))
  );

  const toggleFavorite = (id) => {
    setProducts((prev) => prev.map((x) => (x.id === id ? { ...x, isFavorite: !x.isFavorite } : x)));
  };

  const increaseCount = (id) => {
    setProducts((prev) => prev.map((x) => (x.id === id ? { ...x, count: x.count + 1 } : x)));
  };

  const decreaseCount = (id) => {
    setProducts((prev) =>
      prev.map((x) => (x.id === id && x.count > 0 ? { ...x, count: x.count - 1 } : x))
    );
  };

  const favoriteItems = products.filter((x) => x.isFavorite);

  const data = products.filter((x) => {
    const s = `${x.name} ${x.weight}`.toLowerCase();
    return s.includes(q.trim().toLowerCase());
  });

  const renderItem = ({ item }) => {
    const offPct =
      item.oldPrice && item.oldPrice > 0 ? Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100) : null;

    return (
      <View style={styles.card}>
        <View style={styles.cardTopRow}>
          <View style={styles.offerPill}>
            <Icon name="sparkles-outline" size={12} color={t.c.pri} />
            <Text style={styles.offerText}>{item.offer || (offPct ? `${offPct}% OFF` : 'Offer')}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.favBtn, item.isFavorite ? styles.favBtnOn : null]}
            onPress={() => toggleFavorite(item.id)}
          >
            <Icon name={item.isFavorite ? 'heart' : 'heart-outline'} size={16} color={item.isFavorite ? t.c.danger : '#666'} />
          </TouchableOpacity>
        </View>

        <View style={styles.imgWrap}>
          <Image source={item.image} style={styles.img} />
        </View>

        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.wt} numberOfLines={1}>
          {item.weight}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{item.price}</Text>
          <Text style={styles.old}>₹{item.oldPrice}</Text>
        </View>

        <View style={styles.bottomRow}>
          {item.count === 0 ? (
            <TouchableOpacity activeOpacity={0.9} style={styles.addBtn} onPress={() => increaseCount(item.id)}>
              <Icon name="add" size={16} color="#fff" />
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.qty}>
              <TouchableOpacity activeOpacity={0.9} onPress={() => decreaseCount(item.id)} style={styles.qtyBtn}>
                <Icon name="remove" size={16} color={t.c.text} />
              </TouchableOpacity>
              <Text style={styles.qtyVal}>{item.count}</Text>
              <TouchableOpacity activeOpacity={0.9} onPress={() => increaseCount(item.id)} style={[styles.qtyBtn, styles.qtyBtnPri]}>
                <Icon name="add" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.85} style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={22} color={t.c.text} />
        </TouchableOpacity>

        <View style={{ flex: 1, marginHorizontal: 10 }}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            Fruits & Vegetables
          </Text>
          <Text style={styles.headerSub}>Fresh picks near you</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.iconBtn}
          onPress={() => navigation.navigate('FavouriteScreen', { favorites: favoriteItems })}
        >
          <Icon name="heart-outline" size={20} color={t.c.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchWrap}>
        <Icon name="search-outline" size={18} color="#777" style={{ marginRight: 8 }} />
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Search items..."
          placeholderTextColor="#8E8E8E"
          style={styles.search}
        />
        {q.length > 0 ? (
          <TouchableOpacity activeOpacity={0.9} onPress={() => setQ('')} style={styles.clearBtn}>
            <Icon name="close" size={16} color="#666" />
          </TouchableOpacity>
        ) : null}
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: t.c.bg,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBtn: {
    width: 40,
    height: 40,
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

  headerTitle: { fontSize: 16, fontWeight: '900', color: t.c.text },
  headerSub: { marginTop: 2, fontSize: 12, fontWeight: '800', color: t.c.sub },

  searchWrap: {
    marginHorizontal: 16,
    backgroundColor: t.c.card,
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 2,
  },

  search: { flex: 1, fontSize: 14, fontWeight: '800', color: t.c.text, paddingVertical: 0 },

  clearBtn: {
    width: 30,
    height: 30,
    borderRadius: 12,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  grid: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 30,
  },

  card: {
    width: '48%',
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

  cardTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

  offerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: t.c.priSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: t.r.pill,
    gap: 6,
  },
  offerText: { fontSize: 11, fontWeight: '900', color: t.c.pri },

  favBtn: {
    width: 34,
    height: 34,
    borderRadius: 14,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favBtnOn: { backgroundColor: t.c.dangerSoft },

  imgWrap: {
    marginTop: 10,
    height: 92,
    borderRadius: 16,
    backgroundColor: '#EEF1F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: { width: 78, height: 78, resizeMode: 'contain' },

  name: { marginTop: 10, fontSize: 13, fontWeight: '900', color: t.c.text },
  wt: { marginTop: 4, fontSize: 12, fontWeight: '800', color: t.c.sub },

  priceRow: { marginTop: 8, flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  price: { fontSize: 15, fontWeight: '900', color: t.c.text },
  old: { fontSize: 12, fontWeight: '800', color: '#8E8E8E', textDecorationLine: 'line-through' },

  bottomRow: { marginTop: 10, flexDirection: 'row', justifyContent: 'flex-end' },

  addBtn: {
    backgroundColor: t.c.pri,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addText: { color: '#fff', fontWeight: '900', fontSize: 12 },

  qty: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: '#F3F4F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnPri: { backgroundColor: t.c.pri },
  qtyVal: { marginHorizontal: 10, fontSize: 14, fontWeight: '900', color: t.c.text },
});

export default CategoryScreen;
