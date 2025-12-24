import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
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
};

export default function MyDetailsScreen({ navigation }) {
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn} activeOpacity={0.8}>
            <Icon name="arrow-back" size={20} color={t.c.text} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>My Details</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}
            style={styles.iconBtn}
            activeOpacity={0.8}
          >
            <Icon name="home-outline" size={20} color={t.c.text} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.avatarWrap}>
              <View style={styles.avatarCircle}>
                <Icon name="person-outline" size={48} color={t.c.pri} />
              </View>

              <TouchableOpacity style={styles.editFab} activeOpacity={0.85}>
                <Icon name="camera-outline" size={16} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.profileName}>{name?.trim() ? name : 'Your Name'}</Text>
              <Text style={styles.profileSub}>
                Keep your details updated for faster checkout.
              </Text>
            </View>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Personal Info</Text>

            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputWrap}>
              <Icon name="person-outline" size={18} color={t.c.sub} />
              <TextInput
                style={styles.input}
                placeholder="Enter full name"
                placeholderTextColor="#9AA0A6"
                value={name}
                onChangeText={setName}
              />
            </View>

            <Text style={styles.label}>Sex</Text>
            <View style={styles.pickerWrap}>
              <Icon name="male-female-outline" size={18} color={t.c.sub} style={{ marginLeft: 10 }} />
              <View style={{ flex: 1 }}>
                <Picker selectedValue={gender} onValueChange={setGender} style={styles.picker}>
                  <Picker.Item label="Select" value="" />
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                  <Picker.Item label="Other" value="other" />
                </Picker>
              </View>
            </View>

            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputWrap}>
              <Icon name="call-outline" size={18} color={t.c.sub} />
              <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                placeholderTextColor="#9AA0A6"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrap}>
              <Icon name="mail-outline" size={18} color={t.c.sub} />
              <TextInput
                style={styles.input}
                placeholder="Enter email"
                placeholderTextColor="#9AA0A6"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.saveBtn} activeOpacity={0.9}>
            <Text style={styles.saveText}>Save Changes</Text>
            <Icon name="checkmark-circle-outline" size={18} color="#fff" />
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

  profileCard: {
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
  avatarWrap: { width: 86, height: 86, alignItems: 'center', justifyContent: 'center' },
  avatarCircle: {
    width: 78,
    height: 78,
    borderRadius: 26,
    backgroundColor: t.c.priSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editFab: {
    position: 'absolute',
    bottom: 4,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 14,
    backgroundColor: t.c.pri,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: t.c.card,
  },
  profileName: { fontSize: 16, fontWeight: '900', color: t.c.text },
  profileSub: { marginTop: 4, fontSize: 12, fontWeight: '800', color: t.c.sub, lineHeight: 18 },

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

  saveBtn: {
    marginTop: 14,
    backgroundColor: t.c.pri,
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  saveText: { color: '#fff', fontWeight: '900', fontSize: 14 },
});
