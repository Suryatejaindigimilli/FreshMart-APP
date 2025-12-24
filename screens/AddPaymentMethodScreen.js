import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
  r: { md: 16, lg: 20, pill: 999 },
};

export default function AddPaymentMethodScreen({ navigation }) {
  const [type, setType] = useState('UPI');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSave = () => {
    if (type === 'UPI' && upiId.trim() === '') {
      Alert.alert('Error', 'Please enter your UPI ID');
      return;
    }

    if (type === 'Card' && (cardNumber.replace(/\s/g, '').length < 12 || expiry === '' || cvv.length < 3)) {
      Alert.alert('Error', 'Please enter valid card details');
      return;
    }

    Alert.alert('Success', `${type} method added successfully`);
    navigation.goBack();
  };

  const formatCard = (v) => {
    const x = v.replace(/\D/g, '').slice(0, 16);
    const parts = x.match(/.{1,4}/g) || [];
    return parts.join(' ');
  };

  const formatExpiry = (v) => {
    const x = v.replace(/\D/g, '').slice(0, 4);
    if (x.length <= 2) return x;
    return `${x.slice(0, 2)}/${x.slice(2)}`;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.85} style={styles.iconBtn}>
              <Icon name="chevron-back" size={22} color={t.c.text} />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Add Payment</Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}
              activeOpacity={0.85}
              style={styles.iconBtn}
            >
              <Icon name="home-outline" size={20} color={t.c.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Choose method</Text>

            <View style={styles.segment}>
              <TouchableOpacity
                style={[styles.segBtn, type === 'UPI' ? styles.segActive : null]}
                onPress={() => setType('UPI')}
                activeOpacity={0.9}
              >
                <Icon name="qr-code-outline" size={18} color={type === 'UPI' ? '#fff' : t.c.sub} />
                <Text style={[styles.segText, type === 'UPI' ? styles.segTextActive : null]}>UPI</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.segBtn, type === 'Card' ? styles.segActive : null]}
                onPress={() => setType('Card')}
                activeOpacity={0.9}
              >
                <Icon name="card-outline" size={18} color={type === 'Card' ? '#fff' : t.c.sub} />
                <Text style={[styles.segText, type === 'Card' ? styles.segTextActive : null]}>Card</Text>
              </TouchableOpacity>
            </View>

            {type === 'UPI' ? (
              <>
                <Text style={styles.label}>UPI ID</Text>
                <View style={styles.inputWrap}>
                  <Icon name="at-outline" size={18} color={t.c.sub} />
                  <TextInput
                    style={styles.input}
                    placeholder="example@upi"
                    placeholderTextColor="#8E8E8E"
                    value={upiId}
                    onChangeText={setUpiId}
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.hintRow}>
                  <Icon name="shield-checkmark-outline" size={16} color={t.c.pri} />
                  <Text style={styles.hintText}>Your UPI ID is securely stored.</Text>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.label}>Card Number</Text>
                <View style={styles.inputWrap}>
                  <Icon name="card-outline" size={18} color={t.c.sub} />
                  <TextInput
                    style={styles.input}
                    placeholder="1234 5678 9012 3456"
                    placeholderTextColor="#8E8E8E"
                    keyboardType="number-pad"
                    value={cardNumber}
                    onChangeText={(v) => setCardNumber(formatCard(v))}
                  />
                </View>

                <View style={styles.row}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.label}>Expiry</Text>
                    <View style={styles.inputWrap}>
                      <Icon name="calendar-outline" size={18} color={t.c.sub} />
                      <TextInput
                        style={styles.input}
                        placeholder="MM/YY"
                        placeholderTextColor="#8E8E8E"
                        keyboardType="number-pad"
                        value={expiry}
                        onChangeText={(v) => setExpiry(formatExpiry(v))}
                      />
                    </View>
                  </View>

                  <View style={{ width: 12 }} />

                  <View style={{ flex: 1 }}>
                    <Text style={styles.label}>CVV</Text>
                    <View style={styles.inputWrap}>
                      <Icon name="lock-closed-outline" size={18} color={t.c.sub} />
                      <TextInput
                        style={styles.input}
                        placeholder="***"
                        placeholderTextColor="#8E8E8E"
                        keyboardType="number-pad"
                        secureTextEntry
                        value={cvv}
                        onChangeText={(v) => setCvv(v.replace(/\D/g, '').slice(0, 4))}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.hintRow}>
                  <Icon name="lock-closed-outline" size={16} color={t.c.pri} />
                  <Text style={styles.hintText}>Card details are encrypted.</Text>
                </View>
              </>
            )}

            <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.9}>
              <Text style={styles.saveText}>Save Method</Text>
              <Icon name="checkmark" size={18} color="#fff" style={{ marginLeft: 8 }} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              activeOpacity={0.9}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.secondaryText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: t.c.bg },
  container: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 18 },

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

  card: {
    backgroundColor: t.c.card,
    borderRadius: t.r.lg,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 2,
  },

  cardTitle: { fontSize: 14, fontWeight: '900', color: t.c.text, marginBottom: 10 },

  segment: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F7',
    borderRadius: 16,
    padding: 4,
    marginBottom: 14,
  },

  segBtn: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },

  segActive: { backgroundColor: t.c.pri },

  segText: { fontSize: 13, fontWeight: '900', color: t.c.sub },
  segTextActive: { color: '#fff' },

  label: { fontSize: 12, fontWeight: '900', color: t.c.text, marginBottom: 8, marginTop: 10 },

  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F7',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '700',
    color: t.c.text,
    paddingVertical: 0,
  },

  row: { flexDirection: 'row', marginTop: 8 },

  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: t.c.priSoft,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 12,
    gap: 8,
  },

  hintText: { fontSize: 12, fontWeight: '800', color: t.c.pri },

  saveButton: {
    marginTop: 16,
    backgroundColor: t.c.pri,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  saveText: { color: '#fff', fontWeight: '900', fontSize: 14 },

  secondaryBtn: {
    marginTop: 10,
    backgroundColor: t.c.priSoft,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryText: { color: t.c.pri, fontWeight: '900', fontSize: 14 },
});
