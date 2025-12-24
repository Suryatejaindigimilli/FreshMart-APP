import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
    dangerSoft: '#FFF1F3',
    danger: '#FF3B30',
  },
};

export default function CheckoutSheet({
  visible,
  onClose,
  onPlaceOrder,
  deliveryText = 'Select Address',
  paymentText = 'Select Method',
  promoText = 'Apply',
  totalText = '₹0.00',
}) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.grabber} />

          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Checkout</Text>
              <Text style={styles.subTitle}>Review details before placing order</Text>
            </View>

            <TouchableOpacity activeOpacity={0.9} onPress={onClose} style={styles.closeBtn}>
              <Icon name="close" size={18} color={t.c.text} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity activeOpacity={0.9} style={styles.row}>
            <View style={styles.left}>
              <View style={[styles.iconWrap, { backgroundColor: t.c.priSoft }]}>
                <Icon name="location-outline" size={18} color={t.c.pri} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Delivery</Text>
                <Text style={styles.value} numberOfLines={1}>{deliveryText}</Text>
              </View>
            </View>
            <Icon name="chevron-forward" size={18} color="#8E8E8E" />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} style={styles.row}>
            <View style={styles.left}>
              <View style={[styles.iconWrap, { backgroundColor: '#EEF1F6' }]}>
                <Icon name="card-outline" size={18} color={t.c.text} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Payment</Text>
                <Text style={styles.value} numberOfLines={1}>{paymentText}</Text>
              </View>
            </View>
            <Icon name="chevron-forward" size={18} color="#8E8E8E" />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.9} style={styles.row}>
            <View style={styles.left}>
              <View style={[styles.iconWrap, { backgroundColor: '#F2F2F2' }]}>
                <Icon name="pricetag-outline" size={18} color={t.c.text} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Promo Code</Text>
                <Text style={styles.value} numberOfLines={1}>{promoText}</Text>
              </View>
            </View>
            <Icon name="chevron-forward" size={18} color="#8E8E8E" />
          </TouchableOpacity>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{totalText}</Text>
          </View>

          <Text style={styles.terms}>
            By placing an order you agree to our{' '}
            <Text style={styles.termsBold}>Terms & Conditions</Text>
          </Text>

          <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={onPlaceOrder}>
            <Text style={styles.buttonText}>Place Order</Text>
            <Icon name="arrow-forward" size={16} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  sheet: {
    backgroundColor: t.c.card,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: -8 },
    shadowRadius: 16,
    elevation: 12,
  },
  grabber: {
    alignSelf: 'center',
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: '#D9DCE3',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: '900', color: t.c.text },
  subTitle: { marginTop: 4, fontSize: 12, fontWeight: '800', color: t.c.sub },

  closeBtn: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#F2F3F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: t.c.line,
  },
  left: { flexDirection: 'row', alignItems: 'center', flex: 1, paddingRight: 10 },

  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  label: { fontSize: 12, fontWeight: '900', color: t.c.sub },
  value: { marginTop: 2, fontSize: 14, fontWeight: '900', color: t.c.text },

  totalRow: {
    marginTop: 14,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalLabel: { fontSize: 14, fontWeight: '900', color: t.c.text },
  totalValue: { fontSize: 18, fontWeight: '900', color: t.c.text },

  terms: { fontSize: 12, fontWeight: '800', color: t.c.sub, marginTop: 10 },
  termsBold: { fontWeight: '900', color: t.c.text },

  button: {
    backgroundColor: t.c.pri,
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: { color: '#fff', fontWeight: '900', fontSize: 14 },
});
