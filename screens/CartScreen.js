import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';
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
  },
  r: { md: 16, lg: 20, pill: 999 },
};

const CartScreen = () => {
  const { cartItems, incrementItem, decrementItem, removeFromCart, getTotalPrice } = useCart();
  const navigation = useNavigation();

  const total = Number(getTotalPrice() || 0);

  const renderItem = ({ item }) => {
    const unit = Number(item.price || 0);
    const cnt = Number(item.count || 0);
    const sub = unit * cnt;

    return (
      <View style={styles.card}>
        <View style={styles.imgWrap}>
          <Image
            source={item.product_image_url ? { uri: item.product_image_url } : require('../assets/logo.png')}
            style={styles.img}
          />
        </View>

        <View style={styles.info}>
          <View style={styles.topRow}>
            <Text style={styles.name} numberOfLines={1}>
              {item.product_name}
            </Text>

            <TouchableOpacity
              onPress={() => removeFromCart(item.id)}
              activeOpacity={0.9}
              style={styles.removeBtn}
            >
              <Icon name="close" size={16} color={t.c.danger} />
            </TouchableOpacity>
          </View>

          <Text style={styles.desc} numberOfLines={1}>
            {item.quantity || '—'}
          </Text>

          <View style={styles.metaRow}>
            <View style={styles.pill}>
              <Icon name="pricetag-outline" size={14} color={t.c.pri} />
              <Text style={styles.pillText}>₹{unit}</Text>
            </View>

            <View style={styles.pillSoft}>
              <Icon name="cash-outline" size={14} color="#333" />
              <Text style={styles.pillSoftText}>₹{sub.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.bottomRow}>
            <View style={styles.qty}>
              <TouchableOpacity
                onPress={() => decrementItem(item)}
                activeOpacity={0.9}
                style={styles.qtyBtn}
              >
                <Icon name="remove" size={16} color={t.c.text} />
              </TouchableOpacity>

              <Text style={styles.qtyVal}>{cnt}</Text>

              <TouchableOpacity
                onPress={() => incrementItem(item)}
                activeOpacity={0.9}
                style={[styles.qtyBtn, styles.qtyBtnPri]}
              >
                <Icon name="add" size={16} color="#fff" />
              </TouchableOpacity>
            </View>

            <Text style={styles.totalLine}>
              Total: <Text style={styles.totalStrong}>₹{sub.toFixed(2)}</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const Empty = () => (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <Icon name="cart-outline" size={26} color={t.c.pri} />
      </View>
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptySub}>Add items to continue to checkout</Text>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.shopBtn}
        onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}
      >
        <Text style={styles.shopBtnText}>Browse products</Text>
        <Icon name="arrow-forward" size={16} color="#fff" style={{ marginLeft: 8 }} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerRow}>
        <TouchableOpacity activeOpacity={0.85} style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={22} color={t.c.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Cart</Text>

        <View style={styles.iconBtnGhost} />
      </View>

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(it) => String(it.id)}
        contentContainerStyle={[
          styles.listPad,
          cartItems.length === 0 ? { flexGrow: 1 } : null,
        ]}
        ListEmptyComponent={<Empty />}
        showsVerticalScrollIndicator={false}
      />

      {cartItems.length > 0 ? (
        <View style={styles.footer}>
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.sumLabel}>Total payable</Text>
              <Text style={styles.sumValue}>₹{total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.checkoutBtn}
              onPress={() => navigation.navigate('CheckoutScreen', { cartItems, total })}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
              <Icon name="arrow-forward" size={16} color="#fff" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: t.c.bg },

  headerRow: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 16, fontWeight: '900', color: t.c.text },

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

  listPad: { paddingHorizontal: 16, paddingBottom: 120, paddingTop: 6 },

  card: {
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

  imgWrap: {
    width: 86,
    height: 86,
    borderRadius: 16,
    backgroundColor: '#E9ECF3',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  img: { width: 70, height: 70, resizeMode: 'contain' },

  info: { flex: 1, marginLeft: 12 },

  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  name: { flex: 1, fontSize: 15, fontWeight: '900', color: t.c.text, marginRight: 10 },

  removeBtn: {
    width: 34,
    height: 34,
    borderRadius: 14,
    backgroundColor: t.c.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  desc: { marginTop: 6, fontSize: 12, fontWeight: '800', color: t.c.sub },

  metaRow: { flexDirection: 'row', marginTop: 10, gap: 8 },

  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: t.c.priSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: t.r.pill,
    gap: 6,
  },
  pillText: { fontSize: 12, fontWeight: '900', color: t.c.pri },

  pillSoft: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: t.r.pill,
    gap: 6,
  },
  pillSoftText: { fontSize: 12, fontWeight: '900', color: '#333' },

  bottomRow: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

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

  totalLine: { fontSize: 12, fontWeight: '800', color: t.c.sub },
  totalStrong: { color: t.c.pri, fontWeight: '900' },

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

  summaryRow: {
    backgroundColor: t.c.card,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 2,
  },

  sumLabel: { fontSize: 12, fontWeight: '900', color: t.c.sub },
  sumValue: { marginTop: 6, fontSize: 18, fontWeight: '900', color: t.c.text },

  checkoutBtn: {
    backgroundColor: t.c.pri,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkoutText: { color: '#fff', fontSize: 14, fontWeight: '900' },

  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  emptyIcon: {
    width: 54,
    height: 54,
    borderRadius: 20,
    backgroundColor: t.c.priSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  emptyTitle: { fontSize: 16, fontWeight: '900', color: t.c.text },
  emptySub: { marginTop: 6, fontSize: 12, fontWeight: '800', color: t.c.sub, textAlign: 'center' },

  shopBtn: {
    marginTop: 14,
    backgroundColor: t.c.pri,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopBtnText: { color: '#fff', fontSize: 14, fontWeight: '900' },
});

export default CartScreen;
