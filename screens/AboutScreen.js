import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const t = {
  c: {
    bg: '#F6F7FB',
    card: '#FFFFFF',
    text: '#121212',
    sub: '#6A6A6A',
    pri: '#18A957',
    priSoft: '#EAF8F1',
    line: '#E9ECF3',
  },
  r: { md: 16, lg: 20, pill: 999 },
};

export default function AboutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 18 }}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
            style={styles.iconBtn}
          >
            <Icon name="chevron-back" size={22} color={t.c.text} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>About</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}
            activeOpacity={0.85}
            style={styles.iconBtn}
          >
            <Icon name="home-outline" size={20} color={t.c.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.brandRow}>
            <View style={styles.brandIcon}>
              <Icon name="cart-outline" size={22} color={t.c.pri} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.brandTitle}>FreshCart</Text>
              <Text style={styles.brandSub}>Your smart grocery partner</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>10 min</Text>
            </View>
          </View>

          <Text style={styles.desc}>
            Welcome to FreshCart — your smart grocery partner! 🛒✨{"\n\n"}
            We deliver fresh groceries to your doorstep in just 10 minutes. With real-time location tracking,
            your pincode instantly shows nearby grocery stores, so you can shop from the closest and fastest
            options available.{"\n\n"}
            Whether it’s your daily essentials or a last-minute item, we’ve got you covered — quick, reliable,
            and right on time.{"\n"}
            Your location. Your stores. Your FreshCart.
          </Text>

          <View style={styles.infoRow}>
            <View style={styles.pill}>
              <Icon name="location-outline" size={14} color={t.c.pri} />
              <Text style={styles.pillText}>Nearby stores</Text>
            </View>
            <View style={styles.pill}>
              <Icon name="flash-outline" size={14} color={t.c.pri} />
              <Text style={styles.pillText}>Fast delivery</Text>
            </View>
            <View style={styles.pill}>
              <Icon name="shield-checkmark-outline" size={14} color={t.c.pri} />
              <Text style={styles.pillText}>Trusted</Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.primaryBtn}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}
          >
            <Text style={styles.primaryBtnText}>Start Shopping</Text>
            <Icon name="arrow-forward" size={18} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: t.c.bg, paddingHorizontal: 16, paddingTop: 10 },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
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

  heroCard: {
    backgroundColor: t.c.card,
    borderRadius: t.r.lg,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 2,
  },

  brandRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },

  brandIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: t.c.priSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  brandTitle: { fontSize: 18, fontWeight: '900', color: t.c.text },
  brandSub: { marginTop: 2, fontSize: 12, fontWeight: '700', color: t.c.sub },

  badge: {
    backgroundColor: t.c.priSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: t.r.pill,
  },
  badgeText: { fontSize: 12, fontWeight: '900', color: t.c.pri },

  desc: { fontSize: 13.5, fontWeight: '600', color: '#2B2B2B', lineHeight: 20.5, marginTop: 6 },

  infoRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 },

  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: t.c.priSoft,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: t.r.pill,
    gap: 6,
  },
  pillText: { fontSize: 12, fontWeight: '800', color: t.c.pri },

  primaryBtn: {
    marginTop: 16,
    backgroundColor: t.c.pri,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primaryBtnText: { color: '#fff', fontSize: 14, fontWeight: '900' },
});
