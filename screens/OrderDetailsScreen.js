import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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

export default function OrderDetailsScreen({ navigation }) {
  const order = {
    orderId: 'OD-05-29-T4RA-MJQMQ',
    shopName: 'ZAM ZAM FAMILY RESTAURANT',
    status: 'Delivered',
    deliveredTime: '2 hours ago',
    items: [
      { name: 'Chicken Fry Biryani', qty: 1, price: 280.0 },
      { name: 'S.P Chicken Biryani', qty: 1, price: 280.0 },
    ],
    storeCharges: 0,
    distanceCharges: 0,
    gst: 0,
    total: 560,
    paymentMode: 'COD',
    address: 'Srmap, FG85+56H, Guntur, Amaravati, Andhra Pradesh 522503, India',
  };

  const money = (v) => `₹${Number(v || 0).toFixed(2)}`;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn} activeOpacity={0.85}>
            <Icon name="arrow-back" size={20} color={t.c.text} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Order Details</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}
            style={styles.iconBtn}
            activeOpacity={0.85}
          >
            <Icon name="home-outline" size={20} color={t.c.text} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 22 }}>
          {/* Top Card */}
          <View style={styles.card}>
            <View style={styles.topRow}>
              <View style={styles.statusPill}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>{order.status}</Text>
              </View>

              <Text style={styles.timeText}>{order.deliveredTime}</Text>
            </View>

            <Text style={styles.shopName} numberOfLines={2}>
              {order.shopName}
            </Text>

            <View style={styles.metaRow}>
              <View style={styles.metaChip}>
                <Icon name="receipt-outline" size={14} color={t.c.sub} />
                <Text style={styles.metaText} numberOfLines={1}>
                  {order.orderId}
                </Text>
              </View>
              <View style={styles.metaChip}>
                <Icon name="cash-outline" size={14} color={t.c.sub} />
                <Text style={styles.metaText}>{order.paymentMode}</Text>
              </View>
            </View>
          </View>

          {/* Items */}
          <View style={styles.card}>
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>Items</Text>
              <Text style={styles.sectionHint}>{order.items.length} items</Text>
            </View>

            {order.items.map((item, index) => (
              <View key={index} style={[styles.itemRow, index !== 0 && styles.itemRowLine]}>
                <View style={styles.qtyPill}>
                  <Text style={styles.qtyText}>x{item.qty}</Text>
                </View>
                <Text style={styles.itemName} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={styles.itemPrice}>{money(item.price)}</Text>
              </View>
            ))}
          </View>

          {/* Bill */}
          <View style={styles.card}>
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>Bill Details</Text>
            </View>

            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Store charges</Text>
              <Text style={styles.billValue}>{money(order.storeCharges)}</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Distance charges</Text>
              <Text style={styles.billValue}>{money(order.distanceCharges)}</Text>
            </View>
            <View style={styles.billRow}>
              <Text style={styles.billLabel}>GST</Text>
              <Text style={styles.billValue}>{money(order.gst)}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{order.total}</Text>
            </View>
          </View>

          {/* Address */}
          <View style={styles.card}>
            <View style={styles.sectionHead}>
              <Text style={styles.sectionTitle}>Delivery Address</Text>
            </View>
            <View style={styles.addrRow}>
              <View style={styles.addrIcon}>
                <Icon name="location-outline" size={18} color={t.c.pri} />
              </View>
              <Text style={styles.addressText}>{order.address}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: t.c.bg,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: { flex: 1, paddingHorizontal: 16 },

  header: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '900',
    color: t.c.text,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: t.c.card,
    borderWidth: 1,
    borderColor: t.c.line,
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    backgroundColor: t.c.card,
    borderWidth: 1,
    borderColor: t.c.line,
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 2,
  },

  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: t.c.priSoft,
    borderWidth: 1,
    borderColor: '#BFEBD3',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusDot: { width: 8, height: 8, borderRadius: 8, backgroundColor: t.c.pri },
  statusText: { fontWeight: '900', color: t.c.pri, fontSize: 12 },
  timeText: { color: '#8B92A0', fontWeight: '800', fontSize: 12 },

  shopName: { marginTop: 10, fontSize: 16, fontWeight: '900', color: t.c.text },

  metaRow: { flexDirection: 'row', gap: 8, marginTop: 10, flexWrap: 'wrap' },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F7F8FB',
    borderWidth: 1,
    borderColor: t.c.line,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 14,
    maxWidth: '100%',
  },
  metaText: { color: t.c.sub, fontWeight: '800', fontSize: 12 },

  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  sectionTitle: { fontSize: 14, fontWeight: '900', color: t.c.text },
  sectionHint: { fontSize: 12, fontWeight: '800', color: '#8B92A0' },

  itemRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  itemRowLine: { borderTopWidth: 1, borderTopColor: t.c.line },
  qtyPill: {
    backgroundColor: '#F7F8FB',
    borderWidth: 1,
    borderColor: t.c.line,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  qtyText: { fontWeight: '900', color: t.c.text, fontSize: 12 },
  itemName: { flex: 1, fontWeight: '800', color: '#2A2A2A', fontSize: 13, lineHeight: 18 },
  itemPrice: { fontWeight: '900', color: t.c.text, fontSize: 13 },

  billRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  billLabel: { color: t.c.sub, fontWeight: '800', fontSize: 13 },
  billValue: { color: t.c.text, fontWeight: '900', fontSize: 13 },

  divider: { height: 1, backgroundColor: t.c.line, marginTop: 6, marginBottom: 10 },

  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 14, fontWeight: '900', color: t.c.text },
  totalValue: { fontSize: 16, fontWeight: '900', color: t.c.pri },

  addrRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  addrIcon: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: t.c.priSoft,
    borderWidth: 1,
    borderColor: '#BFEBD3',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  addressText: { flex: 1, color: '#3B3B3B', fontWeight: '800', fontSize: 12, lineHeight: 18 },
});
