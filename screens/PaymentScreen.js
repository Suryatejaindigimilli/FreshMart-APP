import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  StatusBar,
  SafeAreaView,
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
    priSoft: '#EAF7F0',
    danger: '#D32F2F',
    dangerSoft: '#FEECEC',
    chip: '#F3F5FA',
  },
};

function typeIcon(type) {
  const v = (type || '').toLowerCase();
  if (v.includes('upi')) return 'qr-code-outline';
  if (v.includes('card')) return 'card-outline';
  if (v.includes('cash')) return 'cash-outline';
  return 'wallet-outline';
}

export default function PaymentScreen({ navigation }) {
  const [methods, setMethods] = useState([
    { id: 1, type: 'UPI', details: 'raj@upi', isDefault: true },
    { id: 2, type: 'Card', details: '**** **** **** 1234', isDefault: false },
  ]);

  const setDefault = (id) => {
    setMethods((prev) =>
      prev.map((m) => ({ ...m, isDefault: m.id === id }))
    );
  };

  const removeMethod = (id) => {
    Alert.alert(
      'Remove Payment Method',
      'Are you sure you want to remove this method?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => setMethods((prev) => prev.filter((m) => m.id !== id)),
        },
      ]
    );
  };

  const defaultMethod = methods.find((m) => m.isDefault);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()} activeOpacity={0.85}>
            <Icon name="arrow-back" size={20} color={t.c.text} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Payment Methods</Text>

          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}
            activeOpacity={0.85}
          >
            <Icon name="home-outline" size={20} color={t.c.text} />
          </TouchableOpacity>
        </View>

        {/* Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryLeft}>
            <View style={styles.summaryIcon}>
              <Icon name="wallet-outline" size={18} color={t.c.pri} />
            </View>
            <View>
              <Text style={styles.summaryTitle}>Default method</Text>
              <Text style={styles.summarySub} numberOfLines={1}>
                {defaultMethod ? `${defaultMethod.type} • ${defaultMethod.details}` : 'No default set'}
              </Text>
            </View>
          </View>

          <View style={styles.countPill}>
            <Text style={styles.countText}>{methods.length}</Text>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
          {methods.map((method) => (
            <View key={method.id} style={styles.methodCard}>
              <View style={styles.left}>
                <View style={styles.typeBadge}>
                  <Icon name={typeIcon(method.type)} size={16} color={t.c.text} />
                </View>

                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={styles.methodType}>{method.type}</Text>
                    {method.isDefault ? (
                      <View style={styles.defaultChip}>
                        <Icon name="checkmark-circle" size={14} color={t.c.pri} />
                        <Text style={styles.defaultText}>Default</Text>
                      </View>
                    ) : null}
                  </View>

                  <Text style={styles.methodDetails} numberOfLines={1}>
                    {method.details}
                  </Text>
                </View>
              </View>

              <View style={styles.actions}>
                {!method.isDefault && (
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => setDefault(method.id)}
                    activeOpacity={0.9}
                  >
                    <Icon name="checkmark" size={18} color={t.c.pri} />
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  style={[styles.actionBtn, styles.dangerBtn]}
                  onPress={() => removeMethod(method.id)}
                  activeOpacity={0.9}
                >
                  <Icon name="trash-outline" size={18} color={t.c.danger} />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={styles.addCard}
            onPress={() => navigation.navigate('AddPaymentMethodScreen')}
            activeOpacity={0.9}
          >
            <View style={styles.addIcon}>
              <Icon name="add" size={18} color="#fff" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.addTitle}>Add new method</Text>
              <Text style={styles.addSub}>UPI or Card</Text>
            </View>
            <Icon name="chevron-forward" size={18} color="#7E8696" />
          </TouchableOpacity>
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
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 12,
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

  summaryCard: {
    backgroundColor: t.c.card,
    borderWidth: 1,
    borderColor: t.c.line,
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 16,
    elevation: 1,
  },
  summaryLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  summaryIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: t.c.priSoft,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CDEEDD',
  },
  summaryTitle: { fontSize: 12, color: '#7E8696', fontWeight: '800' },
  summarySub: { fontSize: 13, color: t.c.text, fontWeight: '800', marginTop: 2 },

  countPill: {
    backgroundColor: t.c.chip,
    borderWidth: 1,
    borderColor: t.c.line,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  countText: { fontWeight: '900', color: t.c.text },

  methodCard: {
    backgroundColor: t.c.card,
    borderWidth: 1,
    borderColor: t.c.line,
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 16,
    elevation: 1,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  typeBadge: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: '#F3F5FA',
    borderWidth: 1,
    borderColor: t.c.line,
    alignItems: 'center',
    justifyContent: 'center',
  },

  methodType: { fontSize: 14, fontWeight: '900', color: t.c.text },
  methodDetails: { fontSize: 12, color: t.c.sub, fontWeight: '700', marginTop: 4 },

  defaultChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: t.c.priSoft,
    borderWidth: 1,
    borderColor: '#CDEEDD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  defaultText: { fontSize: 12, fontWeight: '900', color: t.c.pri },

  actions: { flexDirection: 'row', alignItems: 'center', gap: 10, marginLeft: 12 },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#F3F5FA',
    borderWidth: 1,
    borderColor: t.c.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerBtn: {
    backgroundColor: t.c.dangerSoft,
    borderColor: '#FFD2D2',
  },

  addCard: {
    marginTop: 4,
    backgroundColor: t.c.card,
    borderWidth: 1,
    borderColor: t.c.line,
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  addIcon: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: t.c.pri,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addTitle: { fontSize: 14, fontWeight: '900', color: t.c.text },
  addSub: { fontSize: 12, color: t.c.sub, fontWeight: '700', marginTop: 2 },
});
