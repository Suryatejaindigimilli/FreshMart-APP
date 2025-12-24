import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
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
    warn: '#FF5A5F',
  },
};

export default function NewAddressScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [addressType, setAddressType] = useState('Home');
  const [isDefault, setIsDefault] = useState(false);

  const handleSave = async () => {
    if (!fullName || !phoneNumber || !houseNumber || !streetAddress || !city || !state) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }

    const address = {
      full_name: fullName,
      phone_number: phoneNumber,
      house_number: houseNumber,
      street_address: streetAddress,
      city,
      state,
      address_type: addressType,
      default_address: isDefault ? 1 : 0,
    };

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Unauthorized', 'Please login again.');
        return;
      }

      await axios.post('http://192.168.0.191:3000/delivery-addresses', address, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert('Success', 'Address saved successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Save Address Error:', error.message);
      Alert.alert('Error', 'Failed to save address.');
    }
  };

  const TypeChip = ({ label, icon, active, onPress }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
    >
      <MaterialIcon name={icon} size={18} color={active ? t.c.pri : t.c.sub} />
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
      {active ? <Icon name="checkmark-circle" size={18} color={t.c.pri} /> : null}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn} activeOpacity={0.8}>
            <Icon name="arrow-back" size={20} color={t.c.text} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>New Address</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}
            style={styles.iconBtn}
            activeOpacity={0.8}
          >
            <Icon name="home-outline" size={20} color={t.c.text} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
          {/* Top Card */}
          <View style={styles.topCard}>
            <View style={styles.topIcon}>
              <Icon name="location-outline" size={20} color={t.c.pri} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.topTitle}>Add Delivery Address</Text>
              <Text style={styles.topSub}>Make checkout faster by saving an address.</Text>
            </View>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Contact</Text>

            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputWrap}>
              <Icon name="person-outline" size={18} color={t.c.sub} />
              <TextInput
                style={styles.input}
                placeholder="Enter full name"
                placeholderTextColor="#9AA0A6"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputWrap}>
              <Icon name="call-outline" size={18} color={t.c.sub} />
              <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                placeholderTextColor="#9AA0A6"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 14 }]}>Address</Text>

            <Text style={styles.label}>House / Flat No.</Text>
            <View style={styles.inputWrap}>
              <Icon name="home-outline" size={18} color={t.c.sub} />
              <TextInput
                style={styles.input}
                placeholder="Enter house number"
                placeholderTextColor="#9AA0A6"
                value={houseNumber}
                onChangeText={setHouseNumber}
              />
            </View>

            <Text style={styles.label}>Street Address</Text>
            <View style={styles.inputWrap}>
              <Icon name="navigate-outline" size={18} color={t.c.sub} />
              <TextInput
                style={styles.input}
                placeholder="Street / Landmark"
                placeholderTextColor="#9AA0A6"
                value={streetAddress}
                onChangeText={setStreetAddress}
              />
            </View>

            <View style={styles.twoCol}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>City</Text>
                <View style={styles.inputWrap}>
                  <Icon name="business-outline" size={18} color={t.c.sub} />
                  <TextInput
                    style={styles.input}
                    placeholder="City"
                    placeholderTextColor="#9AA0A6"
                    value={city}
                    onChangeText={setCity}
                  />
                </View>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.label}>State</Text>
                <View style={styles.pickerWrap}>
                  <Icon name="map-outline" size={18} color={t.c.sub} style={{ marginLeft: 10 }} />
                  <View style={{ flex: 1 }}>
                    <Picker selectedValue={state} onValueChange={setState} style={styles.picker}>
                      <Picker.Item label="Select" value="" />
                      <Picker.Item label="Andhra Pradesh" value="AP" />
                      <Picker.Item label="Telangana" value="TG" />
                      <Picker.Item label="Tamil Nadu" value="TN" />
                      <Picker.Item label="Karnataka" value="KA" />
                    </Picker>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Type Card */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Address Type</Text>

            <View style={styles.chipRow}>
              <TypeChip
                label="Home"
                icon="home-variant-outline"
                active={addressType === 'Home'}
                onPress={() => setAddressType('Home')}
              />
              <TypeChip
                label="Work"
                icon="briefcase-outline"
                active={addressType === 'Work'}
                onPress={() => setAddressType('Work')}
              />
              <TypeChip
                label="Other"
                icon="map-marker-outline"
                active={addressType === 'Other'}
                onPress={() => setAddressType('Other')}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setIsDefault(!isDefault)}
              style={[styles.defaultRow, isDefault && styles.defaultRowActive]}
            >
              <View style={[styles.check, isDefault && styles.checkOn]}>
                {isDefault ? <Icon name="checkmark" size={16} color="#fff" /> : null}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.defaultTitle}>Set as default</Text>
                <Text style={styles.defaultSub}>We’ll use this address automatically at checkout.</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Buttons */}
          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.9}>
              <Text style={styles.saveText}>Save Address</Text>
              <Icon name="checkmark-circle-outline" size={18} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()} activeOpacity={0.9}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.note}>
            Tip: Add landmark in street address for faster delivery.
          </Text>
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
  },
  headerTitle: { fontSize: 16, fontWeight: '900', color: t.c.text },

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

  topCard: {
    backgroundColor: t.c.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: t.c.line,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 2,
  },
  topIcon: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: t.c.priSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: { fontSize: 15, fontWeight: '900', color: t.c.text },
  topSub: { marginTop: 4, fontSize: 12, fontWeight: '800', color: t.c.sub, lineHeight: 18 },

  card: {
    marginTop: 12,
    backgroundColor: t.c.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: t.c.line,
    padding: 14,
  },
  sectionTitle: { fontSize: 13, fontWeight: '900', color: t.c.text, marginBottom: 10 },

  label: { fontSize: 12, fontWeight: '900', color: t.c.sub, marginTop: 10, marginBottom: 8 },

  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F7F8FB',
    borderWidth: 1,
    borderColor: t.c.line,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  input: { flex: 1, fontSize: 14, fontWeight: '800', color: t.c.text, paddingVertical: 0 },

  twoCol: { flexDirection: 'row', gap: 10, marginTop: 2 },

  pickerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8FB',
    borderWidth: 1,
    borderColor: t.c.line,
    borderRadius: 16,
    overflow: 'hidden',
  },
  picker: { color: t.c.text },

  chipRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#F7F8FB',
    borderWidth: 1,
    borderColor: t.c.line,
    flexGrow: 1,
    justifyContent: 'space-between',
    minWidth: '30%',
  },
  chipActive: { backgroundColor: t.c.priSoft, borderColor: '#BFEBD3' },
  chipText: { fontSize: 12, fontWeight: '900', color: t.c.text },
  chipTextActive: { color: t.c.pri },

  defaultRow: {
    marginTop: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: t.c.line,
    backgroundColor: '#F7F8FB',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  defaultRowActive: { backgroundColor: t.c.priSoft, borderColor: '#BFEBD3' },
  check: {
    width: 26,
    height: 26,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#C8CDD8',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkOn: { backgroundColor: t.c.pri, borderColor: t.c.pri },
  defaultTitle: { fontSize: 13, fontWeight: '900', color: t.c.text },
  defaultSub: { marginTop: 3, fontSize: 12, fontWeight: '800', color: t.c.sub, lineHeight: 18 },

  btnRow: { marginTop: 12, flexDirection: 'row', gap: 10 },
  saveBtn: {
    flex: 1,
    backgroundColor: t.c.pri,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  saveText: { color: '#fff', fontWeight: '900', fontSize: 14 },

  cancelBtn: {
    width: 110,
    backgroundColor: t.c.card,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: t.c.line,
  },
  cancelText: { color: t.c.text, fontWeight: '900', fontSize: 14 },

  note: { marginTop: 10, fontSize: 12, fontWeight: '800', color: t.c.sub, textAlign: 'center' },
});
