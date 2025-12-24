import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const posters = [
  require('../assets/poster1.png'),
  require('../assets/poster2.png'),
  require('../assets/poster3.png'),
  require('../assets/poster4.png'),
];

const CACHE_TTL_MS = 10 * 60 * 1000;
const K_CAT = 'cache_categories';
const K_CAT_TS = 'cache_categories_ts';
const K_SHOP = 'cache_shops';
const K_SHOP_TS = 'cache_shops_ts';

const HomeScreen = ({ route, navigation }) => {
  const userLocation = route?.params?.location || 'KBPB';
  const scrollRef = useRef(null);

  const [posterIndex, setPosterIndex] = useState(0);
  const [searchText, setSearchText] = useState('');

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [recommendedShops, setRecommendedShops] = useState([]);
  const [loadingShops, setLoadingShops] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const getJwtToken = async () => {
    try {
      return await AsyncStorage.getItem('userToken');
    } catch (e) {
      return null;
    }
  };

  const readCache = async (dataKey, tsKey) => {
    try {
      const [[, dataStr], [, tsStr]] = await AsyncStorage.multiGet([dataKey, tsKey]);
      if (!dataStr || !tsStr) return null;
      const age = Date.now() - Number(tsStr);
      if (!Number.isFinite(age) || age > CACHE_TTL_MS) return null;
      const data = JSON.parse(dataStr);
      return Array.isArray(data) ? data : null;
    } catch (e) {
      return null;
    }
  };

  const writeCache = async (dataKey, tsKey, data) => {
    try {
      await AsyncStorage.multiSet([
        [dataKey, JSON.stringify(data)],
        [tsKey, String(Date.now())],
      ]);
    } catch (e) {}
  };

  const hydrateFromCache = async () => {
    const [c, s] = await Promise.all([readCache(K_CAT, K_CAT_TS), readCache(K_SHOP, K_SHOP_TS)]);
    if (c) {
      setCategories(c);
      setLoadingCategories(false);
    }
    if (s) {
      setRecommendedShops(s);
      setLoadingShops(false);
    }
  };

  const fetchCategories = async (showLoader = true) => {
    const token = await getJwtToken();
    if (showLoader) setLoadingCategories(true);
    try {
      if (!token) return;
      const res = await axios.get('http://192.168.0.137:5000/categories', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = Array.isArray(res.data) ? res.data : [];
      setCategories(data);
      await writeCache(K_CAT, K_CAT_TS, data);
    } catch (e) {
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchShops = async (showLoader = true) => {
    const token = await getJwtToken();
    if (showLoader) setLoadingShops(true);
    try {
      if (!token) return;
      const res = await axios.get('http://192.168.0.137:5000/shops', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = Array.isArray(res.data) ? res.data : [];
      setRecommendedShops(data);
      await writeCache(K_SHOP, K_SHOP_TS, data);
    } catch (e) {
    } finally {
      setLoadingShops(false);
    }
  };

  useEffect(() => {
    hydrateFromCache();
    fetchCategories(true);
    fetchShops(true);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setPosterIndex((p) => {
        const n = (p + 1) % posters.length;
        scrollRef.current?.scrollTo({ x: n * width, animated: true });
        return n;
      });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const onPosterScrollEnd = (e) => {
    const x = e.nativeEvent.contentOffset.x;
    const i = Math.round(x / width);
    setPosterIndex(i);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchCategories(false), fetchShops(false)]);
    setRefreshing(false);
  };

  const q = searchText.trim().toLowerCase();

  const catsShown = useMemo(() => {
    if (!q) return categories;
    return categories.filter((c) => (c?.cat_name || '').toLowerCase().includes(q));
  }, [q, categories]);

  const shopsShown = useMemo(() => {
    if (!q) return recommendedShops;
    return recommendedShops.filter((s) => {
      const a = (s?.shop_name || '').toLowerCase();
      const b = (s?.owner_namme || '').toLowerCase();
      return a.includes(q) || b.includes(q);
    });
  }, [q, recommendedShops]);

  const hasNoResults =
    q.length > 0 && catsShown.length === 0 && shopsShown.length === 0 && !loadingCategories && !loadingShops;

  const CategorySkeleton = () => (
    <View style={styles.gridContainer}>
      {Array.from({ length: 6 }).map((_, i) => (
        <View key={i} style={styles.catSkelCard}>
          <View style={styles.catSkelImg} />
          <View style={styles.catSkelLine} />
        </View>
      ))}
    </View>
  );

  const ShopSkeleton = () => (
    <View style={{ paddingHorizontal: 16 }}>
      {Array.from({ length: 3 }).map((_, i) => (
        <View key={i} style={styles.shopSkelCard}>
          <View style={styles.shopSkelImg} />
          <View style={styles.shopSkelInfo}>
            <View style={styles.shopSkelLineBig} />
            <View style={styles.shopSkelLine} />
            <View style={styles.shopSkelRow}>
              <View style={styles.shopSkelPill} />
              <View style={styles.shopSkelPill} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.topWrap}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.hiText}>Hi 👋</Text>
              <View style={styles.locationRow}>
                <Icon name="location-outline" size={16} color="#18A957" />
                <Text style={styles.locationText}>{userLocation}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.profileBtn} activeOpacity={0.8}>
              <Icon name="person-outline" size={20} color="#1B1B1B" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.searchWrapper} activeOpacity={1}>
            <Icon name="search-outline" size={18} color="#7A7A7A" />
            <TextInput
              placeholder="Search groceries, snacks, shops..."
              placeholderTextColor="#8E8E8E"
              value={searchText}
              onChangeText={setSearchText}
              style={styles.searchInput}
            />
            <TouchableOpacity style={styles.micBtn} activeOpacity={0.8}>
              <Icon name="mic-outline" size={18} color="#18A957" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <View style={styles.carouselWrap}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            ref={scrollRef}
            onMomentumScrollEnd={onPosterScrollEnd}
          >
            {posters.map((item, index) => (
              <View key={index} style={styles.posterCard}>
                <Image source={item} style={styles.poster} />
              </View>
            ))}
          </ScrollView>

          <View style={styles.dotsRow}>
            {posters.map((_, i) => (
              <View key={i} style={[styles.dot, posterIndex === i ? styles.dotActive : styles.dotIdle]} />
            ))}
          </View>
        </View>

        {hasNoResults && (
          <View style={styles.emptyWrap}>
            <Icon name="search-outline" size={28} color="#18A957" />
            <Text style={styles.emptyTitle}>No results found</Text>
            <Text style={styles.emptySub}>Try a different keyword.</Text>
          </View>
        )}

        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {loadingCategories ? (
          categories.length > 0 ? (
            <ActivityIndicator size="small" color="#18A957" style={{ marginVertical: 10 }} />
          ) : (
            <CategorySkeleton />
          )
        ) : catsShown.length === 0 && q ? (
          <Text style={styles.noneText}>No categories match “{searchText}”.</Text>
        ) : (
          <View style={styles.gridContainer}>
            {catsShown.slice(0, 6).map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.catCard}
                onPress={() => navigation.navigate('CategoryScreen', { category: item })}
                activeOpacity={0.85}
              >
                <View style={styles.catImgWrap}>
                  <Image source={{ uri: item.cat_url }} style={styles.categoryImage} />
                </View>
                <Text numberOfLines={1} style={styles.categoryText}>
                  {item.cat_name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {categories.length > 6 && !loadingCategories && !q && (
          <View style={{ marginTop: 6 }}>
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>More</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {categories.slice(6).map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.chip}
                  onPress={() => navigation.navigate('CategoryScreen', { category: item })}
                  activeOpacity={0.85}
                >
                  <Image source={{ uri: item.cat_url }} style={styles.chipImg} />
                  <Text numberOfLines={1} style={styles.chipText}>
                    {item.cat_name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Recommended Shops</Text>
        </View>

        {loadingShops ? (
          recommendedShops.length > 0 ? (
            <ActivityIndicator size="small" color="#18A957" style={{ marginVertical: 10 }} />
          ) : (
            <ShopSkeleton />
          )
        ) : shopsShown.length === 0 && q ? (
          <Text style={styles.noneText}>No shops match “{searchText}”.</Text>
        ) : (
          shopsShown.map((shop) => (
            <TouchableOpacity
              key={shop.id}
              style={styles.shopCard}
              onPress={() => navigation.navigate('ShopProfileScreen', { shop })}
              activeOpacity={0.9}
            >
              <View style={styles.shopImgWrap}>
                <Image source={{ uri: shop.shop_image_url }} style={styles.shopImage} />
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>4.5 ★</Text>
                </View>
              </View>

              <View style={styles.shopInfo}>
                <Text numberOfLines={1} style={styles.shopName}>
                  {shop.shop_name}
                </Text>

                <Text numberOfLines={1} style={styles.shopOwner}>
                  Owner: {shop.owner_namme}
                </Text>

                <View style={styles.metaRow}>
                  <View style={styles.metaPill}>
                    <Icon name="navigate-outline" size={14} color="#18A957" />
                    <Text style={styles.metaText}>Near you</Text>
                  </View>

                  <View style={styles.metaPillSoft}>
                    <Icon name="time-outline" size={14} color="#333" />
                    <Text style={styles.metaTextSoft}>20-30 min</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.favBtn} activeOpacity={0.8}>
                <Icon name="heart-outline" size={20} color="#18A957" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}

        <View style={{ height: 18 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F7FB' },
  scrollView: { flex: 1 },

  topWrap: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 12,
    backgroundColor: '#F6F7FB',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },

  hiText: { fontSize: 16, fontWeight: '700', color: '#121212' },

  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },

  locationText: { marginLeft: 6, fontSize: 14, fontWeight: '600', color: '#3A3A3A' },

  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 2,
  },

  searchWrapper: {
    marginTop: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
    marginLeft: 8,
    color: '#111',
  },

  micBtn: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#EAF8F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  carouselWrap: { marginTop: 4 },
  posterCard: { width, paddingHorizontal: 16 },
  poster: { width: width - 32, height: 140, borderRadius: 18, resizeMode: 'cover' },

  dotsRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 4 },
  dot: { height: 7, borderRadius: 20, marginHorizontal: 4 },
  dotActive: { width: 18, backgroundColor: '#18A957' },
  dotIdle: { width: 7, backgroundColor: '#CFEFDB' },

  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 14,
    marginBottom: 8,
  },

  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#121212' },
  seeAll: { fontSize: 13, fontWeight: '700', color: '#18A957' },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

  catCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 2,
  },

  catImgWrap: {
    height: 88,
    borderRadius: 14,
    backgroundColor: '#F2FBF6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  categoryImage: { width: 76, height: 76, resizeMode: 'contain' },
  categoryText: { fontWeight: '800', fontSize: 13, color: '#1B1B1B' },

  horizontalScroll: { paddingLeft: 16, paddingVertical: 8 },

  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 2,
  },

  chipImg: { width: 26, height: 26, resizeMode: 'contain', marginRight: 8 },
  chipText: { fontSize: 13, fontWeight: '800', color: '#1B1B1B', maxWidth: 120 },

  shopCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 18,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 2,
  },

  shopImgWrap: { position: 'relative' },
  shopImage: { width: 108, height: 108, borderRadius: 16, resizeMode: 'cover' },

  ratingBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },

  ratingText: { color: '#fff', fontSize: 12, fontWeight: '800' },

  shopInfo: { flex: 1, marginLeft: 12, marginRight: 6, justifyContent: 'center' },
  shopName: { fontSize: 16, fontWeight: '900', color: '#121212' },
  shopOwner: { fontSize: 12, color: '#6A6A6A', marginTop: 6, fontWeight: '600' },

  metaRow: { flexDirection: 'row', marginTop: 10 },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF8F1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
  },
  metaText: { fontSize: 12, fontWeight: '800', color: '#18A957', marginLeft: 6 },

  metaPillSoft: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  metaTextSoft: { fontSize: 12, fontWeight: '800', color: '#333', marginLeft: 6 },

  favBtn: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#F3FBF6',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  noneText: { paddingHorizontal: 16, color: '#6A6A6A', fontWeight: '700', marginBottom: 12 },

  emptyWrap: {
    marginTop: 10,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 2,
  },
  emptyTitle: { marginTop: 8, fontSize: 16, fontWeight: '900', color: '#121212' },
  emptySub: { marginTop: 4, fontSize: 12, fontWeight: '700', color: '#7A7A7A' },

  skel: { backgroundColor: '#E9ECF3' },

  catSkelCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 1,
  },
  catSkelImg: { height: 88, borderRadius: 14, backgroundColor: '#E9ECF3' },
  catSkelLine: { height: 12, borderRadius: 8, backgroundColor: '#E9ECF3', marginTop: 12, width: '70%' },

  shopSkelCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 1,
  },
  shopSkelImg: { width: 108, height: 108, borderRadius: 16, backgroundColor: '#E9ECF3' },
  shopSkelInfo: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  shopSkelLineBig: { height: 14, borderRadius: 8, backgroundColor: '#E9ECF3', width: '70%' },
  shopSkelLine: { height: 12, borderRadius: 8, backgroundColor: '#E9ECF3', width: '55%', marginTop: 10 },
  shopSkelRow: { flexDirection: 'row', marginTop: 12 },
  shopSkelPill: {
    height: 26,
    width: 86,
    borderRadius: 999,
    backgroundColor: '#E9ECF3',
    marginRight: 10,
  },
});

export default HomeScreen;
