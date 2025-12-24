// import React from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const favorites = [
//   {
//     id: '1',
//     name: 'Sprite Can',
//     desc: '325ml, Price',
//     price: '$1.50',
//     image: require('../assets/sprite.png'),
//   },
//   {
//     id: '2',
//     name: 'Diet Coke',
//     desc: '355ml, Price',
//     price: '$1.99',
//     image: require('../assets/diet-coke.png'),
//   },
//   {
//     id: '3',
//     name: 'Apple & Grape Juice',
//     desc: '2L, Price',
//     price: '$15.50',
//     image: require('../assets/juice.png'),
//   },
//   {
//     id: '4',
//     name: 'Coca Cola Can',
//     desc: '325ml, Price',
//     price: '$4.99',
//     image: require('../assets/coke.png'),
//   },
//   {
//     id: '5',
//     name: 'Pepsi Can',
//     desc: '330ml, Price',
//     price: '$4.99',
//     image: require('../assets/pepsi.png'),
//   },
// ];

// const FavouriteScreen = () => {
//   const renderItem = ({ item }) => (
//     <View style={styles.itemRow}>
//       <Image source={item.image} style={styles.itemImage} />
//       <View style={styles.itemTextContainer}>
//         <Text style={styles.itemName}>{item.name}</Text>
//         <Text style={styles.itemDesc}>{item.desc}</Text>
//       </View>
//       <View style={styles.itemRight}>
//         <Text style={styles.itemPrice}>{item.price}</Text>
//         <Icon name="chevron-forward" size={18} color="#000" />
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Favourite</Text>
//       <FlatList
//         data={favorites}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ paddingBottom: 120 }}
//       />

//       <TouchableOpacity style={styles.addButton}>
//         <Text style={styles.addButtonText}>Add All To Cart</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingTop: 50,
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   itemRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderColor: '#eee',
//   },
//   itemImage: {
//     width: 50,
//     height: 50,
//     resizeMode: 'contain',
//   },
//   itemTextContainer: {
//     flex: 1,
//     marginHorizontal: 10,
//   },
//   itemName: {
//     fontWeight: 'bold',
//     fontSize: 15,
//   },
//   itemDesc: {
//     color: '#666',
//     fontSize: 12,
//   },
//   itemRight: {
//     alignItems: 'flex-end',
//   },
//   itemPrice: {
//     fontWeight: 'bold',
//     fontSize: 14,
//     marginBottom: 4,
//   },
//   addButton: {
//     position: 'absolute',
//     bottom: 20,
//     left: 20,
//     right: 20,
//     backgroundColor: '#3CB371',
//     padding: 16,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   addButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default FavouriteScreen;

// FavouriteScreen.js
import React, { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
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
  },
};

const FavouriteScreen = ({ route, navigation }) => {
  const favorites = route.params?.favorites || [];

  const total = useMemo(() => {
    return favorites.reduce((s, x) => s + (Number(x.price) || 0), 0);
  }, [favorites]);

  const renderItem = ({ item }) => (
    <TouchableOpacity activeOpacity={0.9} style={styles.itemCard}>
      <View style={styles.imgWrap}>
        <Image source={item.image} style={styles.itemImage} />
      </View>

      <View style={styles.itemText}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemDesc} numberOfLines={1}>{item.weight}</Text>

        <View style={styles.pricePill}>
          <Text style={styles.pricePillText}>₹{item.price}</Text>
        </View>
      </View>

      <Icon name="chevron-forward" size={18} color="#8E8E8E" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation?.goBack?.()} style={styles.iconBtn}>
          <Icon name="chevron-back" size={22} color={t.c.text} />
        </TouchableOpacity>

        <View style={{ alignItems: 'center' }}>
          <Text style={styles.hTitle}>Favourites</Text>
          <Text style={styles.hSub}>{favorites.length} items saved</Text>
        </View>

        <View style={styles.iconBtnGhost} />
      </View>

      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <Icon name="heart-outline" size={36} color={t.c.pri} />
          </View>
          <Text style={styles.emptyTitle}>No favourites yet</Text>
          <Text style={styles.emptySub}>Tap the heart on a product to save it here</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={favorites}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 130, paddingTop: 8 }}
            showsVerticalScrollIndicator={false}
          />

          <View style={styles.footer}>
            <View style={styles.footerRow}>
              <View>
                <Text style={styles.footerHint}>Estimated total</Text>
                <Text style={styles.footerTotal}>₹{total.toFixed(2)}</Text>
              </View>

              <TouchableOpacity activeOpacity={0.9} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add All To Cart</Text>
                <Icon name="cart-outline" size={16} color="#fff" style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
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
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hTitle: { fontSize: 16, fontWeight: '900', color: t.c.text },
  hSub: { marginTop: 4, fontSize: 12, fontWeight: '800', color: t.c.sub },

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
  iconBtnGhost: { width: 40, height: 40 },

  itemCard: {
    backgroundColor: t.c.card,
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: t.c.line,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 1,
  },
  imgWrap: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#F7F8FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  itemImage: { width: '75%', height: '75%', resizeMode: 'contain' },

  itemText: { flex: 1 },
  itemName: { fontSize: 13, fontWeight: '900', color: t.c.text },
  itemDesc: { marginTop: 4, fontSize: 12, fontWeight: '800', color: t.c.sub },

  pricePill: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: t.c.priSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  pricePillText: { fontSize: 12, fontWeight: '900', color: t.c.pri },

  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 10,
    backgroundColor: 'rgba(246,247,251,0.92)',
  },
  footerRow: {
    backgroundColor: t.c.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: t.c.line,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 2,
  },
  footerHint: { fontSize: 10, fontWeight: '900', color: t.c.sub },
  footerTotal: { marginTop: 4, fontSize: 16, fontWeight: '900', color: t.c.text },

  addButton: {
    backgroundColor: t.c.pri,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  addButtonText: { color: '#fff', fontSize: 13, fontWeight: '900' },

  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 22 },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: t.c.priSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  emptyTitle: { fontSize: 16, fontWeight: '900', color: t.c.text },
  emptySub: { marginTop: 6, fontSize: 12, fontWeight: '800', color: t.c.sub, textAlign: 'center' },
});

export default FavouriteScreen;
