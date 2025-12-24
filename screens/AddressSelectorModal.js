import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
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
  r: { md: 16, lg: 20, pill: 999 },
};

const AddressSelectorModal = ({ visible, onClose, onSelect }) => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (visible) {
      setAddresses([
        {
          id: 7,
          full_name: 'Surya Teja',
          phone_number: '9876543210',
          house_number: '126/A',
          street_address: '5th Cross Street, KPHB Phase 6',
          city: 'Hyderabad',
          state: 'Telangana',
          address_type: 'Home',
          default_address: 1,
          created_at: '2024-07-31 10:23:45',
        },
      ]);
    }
  }, [visible]);

  const handleSelect = (address) => {
    onSelect(address);
    onClose();
  };

  const renderItem = ({ item }) => {
    const isDef = Number(item.default_address) === 1;

    return (
      <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={() => handleSelect(item)}>
        <View style={styles.cardTop}>
          <View style={styles.nameRow}>
            <Text numberOfLines={1} style={styles.name}>
              {item.full_name}
            </Text>
            {isDef ? (
              <View style={styles.badge}>
                <Icon name="checkmark-circle-outline" size={14} color={t.c.pri} />
                <Text style={styles.badgeText}>Default</Text>
              </View>
            ) : null}
          </View>

          <Icon name="chevron-forward" size={20} color="#9AA0A6" />
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaPill}>
            <Icon name="call-outline" size={14} color={t.c.pri} />
            <Text style={styles.metaText}>{item.phone_number}</Text>
          </View>

          <View style={styles.typePill}>
            <Icon name={item.address_type === 'Work' ? 'briefcase-outline' : 'home-outline'} size={14} color="#333" />
            <Text style={styles.typeText}>{item.address_type}</Text>
          </View>
        </View>

        <Text style={styles.addr} numberOfLines={3}>
          {item.house_number}, {item.street_address}, {item.city}, {item.state}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.sheet}>
          <View style={styles.grabber} />

          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Delivery address</Text>
              <Text style={styles.subtitle}>Choose where to deliver your order</Text>
            </View>

            <TouchableOpacity onPress={onClose} activeOpacity={0.85} style={styles.closeBtn}>
              <Icon name="close" size={18} color={t.c.text} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={addresses}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 10 }}
            showsVerticalScrollIndicator={false}
          />

          <TouchableOpacity activeOpacity={0.9} style={styles.addBtn} onPress={() => {}}>
            <Icon name="add" size={18} color="#fff" />
            <Text style={styles.addBtnText}>Add new address</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddressSelectorModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },

  sheet: {
    backgroundColor: t.c.bg,
    padding: 16,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    maxHeight: '82%',
  },

  grabber: {
    alignSelf: 'center',
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: '#D7DBE6',
    marginBottom: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },

  title: { fontSize: 16, fontWeight: '900', color: t.c.text },
  subtitle: { marginTop: 4, fontSize: 12, fontWeight: '700', color: t.c.sub },

  closeBtn: {
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

  card: {
    backgroundColor: t.c.card,
    borderRadius: t.r.lg,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 2,
  },

  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1, paddingRight: 10 },
  name: { fontWeight: '900', fontSize: 14, color: t.c.text, flex: 1 },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: t.c.priSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: t.r.pill,
    gap: 6,
  },
  badgeText: { fontSize: 12, fontWeight: '900', color: t.c.pri },

  metaRow: { flexDirection: 'row', marginTop: 10 },

  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: t.c.priSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: t.r.pill,
    marginRight: 8,
  },
  metaText: { marginLeft: 6, fontSize: 12, fontWeight: '900', color: t.c.pri },

  typePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: t.r.pill,
  },
  typeText: { marginLeft: 6, fontSize: 12, fontWeight: '900', color: '#333' },

  addr: { marginTop: 10, fontSize: 12.5, fontWeight: '700', color: '#3A3A3A', lineHeight: 18.5 },

  addBtn: {
    marginTop: 10,
    backgroundColor: t.c.pri,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  addBtnText: { color: '#fff', fontWeight: '900', fontSize: 14 },
});
