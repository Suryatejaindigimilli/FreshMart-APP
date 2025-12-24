import React, { useState } from 'react';
import { API_URL } from '@env';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegistrationScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const base = (API_URL || 'http://192.168.0.137:5000').replace(/\/+$/, '');

  const handleSignUp = async () => {
    const u = username.trim();
    const e = email.trim();
    const p = password.trim();

    if (!u || !e || !p) {
      Alert.alert('Missing Fields', 'Please fill in all the required fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${base}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: u, email: e, password: p }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        Alert.alert('Registration Failed', data.message || `HTTP ${res.status}`);
        return;
      }

      if (data?.token) {
        await AsyncStorage.setItem('userToken', String(data.token));
        Alert.alert('Success', 'Registration successful!');
        navigation.replace('MainTabs');
      } else {
        Alert.alert('Success', 'Registered! Please login.');
        navigation.replace('LoginScreen');
      }
    } catch (err) {
      Alert.alert('Error', 'Network error. Check IP / cleartext / same WiFi.');
      console.log('Registration Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.safeArea}>
      {/* Header (same style as other screens) */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sign Up</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}>
          <Icon name="home-outline" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.topBlock}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>Enter your details to continue</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputRow}>
            <Icon name="person-outline" size={18} color="#777" />
            <TextInput
              style={styles.input}
              placeholder="Your name"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <Text style={styles.label}>Email</Text>
          <View style={styles.inputRow}>
            <Icon name="mail-outline" size={18} color="#777" />
            <TextInput
              style={styles.input}
              placeholder="example@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {email.trim().length > 5 && <Icon name="checkmark" size={18} color="#2e7d32" />}
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputRow}>
            <Icon name="lock-closed-outline" size={18} color="#777" />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secure}
            />
            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <Icon name={secure ? 'eye-off' : 'eye'} size={18} color="#777" />
            </TouchableOpacity>
          </View>

          <Text style={styles.agreeText}>
            By continuing you agree to our <Text style={styles.link}>Terms</Text> and{' '}
            <Text style={styles.link}>Privacy</Text>.
          </Text>

          <TouchableOpacity
            style={[styles.signupButton, loading && { opacity: 0.7 }]}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.signupText}>Create Account</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text style={styles.link} onPress={() => navigation.navigate('LoginScreen')}>
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },

  container: {
    padding: 20,
    paddingBottom: 30,
  },
  topBlock: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 18,
  },
  logo: {
    width: 48,
    height: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#e6e6e6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#111',
    padding: 0,
  },

  agreeText: {
    fontSize: 12,
    color: '#777',
    marginTop: 14,
    textAlign: 'center',
  },
  link: {
    color: '#2e7d32',
    fontWeight: '700',
  },

  signupButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 18,
    alignItems: 'center',
  },
  signupText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  footerText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 13,
    color: '#444',
  },
});

export default RegistrationScreen;