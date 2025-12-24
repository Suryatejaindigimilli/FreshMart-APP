import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    warn: '#FF5A5F',
  },
};

export default function DeliveryAddressScreen({ navigation }) {
  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchAddresses = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get('http://192.168.0.137:3000/delivery-addresses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data || [];
      setAddresses(data);
      const d = data.find((x) => x.default_address === 1);
      if (d) setSelected(d.id);
    } catch (err) {
      console.error('Error fetching addresses:', err.message);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSelectDefault = async (addr) => {
    setSelected(addr.id);
    try {
      const token = await AsyncStorage.getItem('userToken');
      await axios.put(
        `http://192.168.0.137:3000/delivery-addresses/${addr.id}`,
        { ...addr, default_address: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAddresses();
    } catch (err) {
      console.error('Failed to update default address:', err.message);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.goBack()} style={styles.iconBtn}>
          <Icon name="chevron-back" size={22} color={t.c.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Delivery Address</Text>
        <View style={styles.iconBtnGhost} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.cardTop}>
          <View style={styles.locIcon}>
            <Icon name="navigate-outline" size={18} color={t.c.pri} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTopTitle}>Use current location</Text>
            <Text style={styles.cardTopSub}>Fastest delivery based on your GPS</Text>
          </View>
          <Icon name="chevron-forward" size={18} color="#8E8E8E" />
        </View>

        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Saved addresses</Text>
          <Text style={styles.sectionHint}>{addresses.length} total</Text>
        </View>

        {addresses.map((addr) => {
          const isOn = selected === addr.id;
          return (
            <TouchableOpacity
              key={addr.id}
              activeOpacity={0.9}
              onPress={() => handleSelectDefault(addr)}
              style={[styles.addrCard, isOn && styles.addrCardOn]}
            >
              <View style={styles.addrTopRow}>
                <View style={styles.addrLeft}>
                  <MaterialIcon
                    name={isOn ? 'radiobox-marked' : 'radiobox-blank'}
                    size={22}
                    color={isOn ? t.c.pri : '#B7BCC7'}
                  />
                  <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text style={styles.addrType} numberOfLines={1}>
                      {addr.address_type || 'Address'} {addr.default_address ? '• Default' : ''}
                    </Text>
                    <Text style={styles.addrName} numberOfLines={1}>{addr.full_name || '—'}</Text>
                  </View>
                </View>

                <View style={styles.addrActions}>
                  <TouchableOpacity activeOpacity={0.9} style={styles.smallIconBtn}>
                    <Icon name="create-outline" size={18} color={t.c.text} />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.9} style={[styles.smallIconBtn, { backgroundColor: t.c.dangerSoft }]}>
                    <Icon name="trash-outline" size={18} color={t.c.danger} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.addrLine} />

              <Text style={styles.addrText} numberOfLines={2}>
                {addr.house_number ? `${addr.house_number}, ` : ''}
                {addr.street_address ? `${addr.street_address}, ` : ''}
                {addr.city ? `${addr.city}, ` : ''}
                {addr.state || ''}
              </Text>

              {isOn ? (
                <View style={styles.badge}>
                  <Icon name="checkmark-circle" size={16} color={t.c.pri} />
                  <Text style={styles.badgeText}>Selected</Text>
                </View>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.addBtn}
          onPress={() => navigation.navigate('NewAddressScreen')}
        >
          <Icon name="add" size={18} color="#fff" />
          <Text style={styles.addBtnText}>Add New Address</Text>
        </TouchableOpacity>
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

  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { fontSize: 16, fontWeight: '900', color: t.c.text },
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

  cardTop: {
    marginTop: 8,
    marginHorizontal: 16,
    backgroundColor: t.c.card,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 2,
  },
  locIcon: {
    width: 40,
    height: 40,
    borderRadius: 16,
    backgroundColor: t.c.priSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  cardTopTitle: { fontSize: 13, fontWeight: '900', color: t.c.text },
  cardTopSub: { marginTop: 2, fontSize: 12, fontWeight: '800', color: t.c.sub },

  sectionHead: {
    marginTop: 14,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  sectionTitle: { fontSize: 13, fontWeight: '900', color: t.c.text },
  sectionHint: { fontSize: 12, fontWeight: '800', color: t.c.sub },

  addrCard: {
    marginTop: 10,
    marginHorizontal: 16,
    backgroundColor: t.c.card,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: t.c.line,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 1,
  },
  addrCardOn: {
    borderColor: t.c.pri,
    backgroundColor: '#FFFFFF',
  },
  addrTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addrLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, paddingRight: 10 },
  addrType: { fontSize: 12, fontWeight: '900', color: t.c.sub },
  addrName: { marginTop: 3, fontSize: 13, fontWeight: '900', color: t.c.text },

  addrActions: { flexDirection: 'row', gap: 10 },
  smallIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#F2F3F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addrLine: { height: 1, backgroundColor: t.c.line, marginTop: 12, marginBottom: 10 },
  addrText: { fontSize: 12, fontWeight: '800', color: t.c.sub, lineHeight: 18 },

  badge: {
    marginTop: 10,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: t.c.priSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    gap: 6,
  },
  badgeText: { fontSize: 12, fontWeight: '900', color: t.c.pri },

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
  addBtn: {
    backgroundColor: t.c.pri,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  addBtnText: { color: '#fff', fontWeight: '900', fontSize: 14 },
});
