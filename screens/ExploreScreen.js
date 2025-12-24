import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
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

const products = [
  { id: '1', name: 'Egg Chicken Red', desc: '4pcs, Price', price: '$1.99', image: require('../assets/egg-red.png') },
  { id: '2', name: 'Egg Chicken White', desc: '180g, Price', price: '$1.50', image: require('../assets/egg-white.png') },
  { id: '3', name: 'Egg Pasta', desc: '30gm, Price', price: '$15.99', image: require('../assets/pasta.png') },
  { id: '4', name: 'Egg Noodles', desc: '2L, Price', price: '$15.99', image: require('../assets/noodles1.png') },
  { id: '5', name: 'Mayonnais Eggless', desc: '325ml, Price', price: '$5.99', image: require('../assets/mayo.png') },
  { id: '6', name: 'Egg Noodles', desc: '330ml, Price', price: '$6.99', image: require('../assets/noodles2.png') },
];

const ExploreScreen = () => {
  const [search, setSearch] = useState('');

  const data = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [search]);

  const renderItem = ({ item }) => (
    <TouchableOpacity activeOpacity={0.9} style={styles.card}>
      <View style={styles.imgWrap}>
        <Image source={item.image} style={styles.productImage} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.productTitle} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productDesc} numberOfLines={1}>{item.desc}</Text>
      </View>

      <View style={styles.cardBottom}>
        <View>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </View>

        <TouchableOpacity activeOpacity={0.9} style={styles.addButton}>
          <Icon name="add" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.hTitle}>Explore</Text>
        <Text style={styles.hSub}>Find products you love</Text>
      </View>

      <View style={styles.searchCard}>
        <View style={styles.searchLeft}>
          <View style={styles.searchIconWrap}>
            <Icon name="search" size={18} color={t.c.sub} />
          </View>
          <TextInput
            placeholder="Search products"
            placeholderTextColor="#9AA0AA"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        <TouchableOpacity activeOpacity={0.9} style={styles.filterBtn}>
          <Icon name="options-outline" size={18} color={t.c.text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
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
    paddingBottom: 6,
  },
  hTitle: { fontSize: 20, fontWeight: '900', color: t.c.text },
  hSub: { marginTop: 4, fontSize: 12, fontWeight: '800', color: t.c.sub },

  searchCard: {
    marginTop: 10,
    marginHorizontal: 16,
    backgroundColor: t.c.card,
    borderRadius: 18,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: t.c.line,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 2,
  },
  searchLeft: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  searchIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#F2F3F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    color: t.c.text,
    paddingVertical: 6,
  },
  filterBtn: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: t.c.priSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    width: '48.2%',
    backgroundColor: t.c.card,
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: t.c.line,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 2,
  },
  imgWrap: {
    height: 112,
    borderRadius: 16,
    backgroundColor: '#F7F8FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  productImage: { width: '85%', height: '85%', resizeMode: 'contain' },

  productTitle: { fontWeight: '900', fontSize: 13, color: t.c.text },
  productDesc: { marginTop: 4, fontSize: 12, fontWeight: '800', color: t.c.sub },

  cardBottom: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: { fontSize: 10, fontWeight: '900', color: t.c.sub },
  productPrice: { fontWeight: '900', fontSize: 14, color: t.c.text },

  addButton: {
    width: 40,
    height: 40,
    borderRadius: 16,
    backgroundColor: t.c.pri,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ExploreScreen;
