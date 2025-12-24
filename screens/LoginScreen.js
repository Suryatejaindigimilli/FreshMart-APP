import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
    danger: '#FF3B30',
  },
  r: { md: 16, lg: 20, pill: 999 },
};

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://192.168.0.137:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        await AsyncStorage.setItem('userToken', data.token);
        navigation.replace('MainTabs');
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <View style={styles.top}>
            <View style={styles.logoWrap}>
              <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
            </View>

            <Text style={styles.heading}>Welcome back</Text>
            <Text style={styles.subText}>Log in to continue shopping fresh groceries</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrap}>
              <Icon name="mail-outline" size={18} color={t.c.sub} />
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#8E8E8E"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <Text style={[styles.label, { marginTop: 14 }]}>Password</Text>
            <View style={styles.inputWrap}>
              <Icon name="lock-closed-outline" size={18} color={t.c.sub} />
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#8E8E8E"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry={secureText}
              />
              <TouchableOpacity
                onPress={() => setSecureText(!secureText)}
                activeOpacity={0.8}
                style={styles.eyeBtn}
              >
                <Icon name={secureText ? 'eye-off-outline' : 'eye-outline'} size={20} color={t.c.sub} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.forgotBtn} activeOpacity={0.85}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginButton, loading ? { opacity: 0.8 } : null]}
              onPress={handleLogin}
              activeOpacity={0.9}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <Text style={styles.loginText}>Log In</Text>
                  <Icon name="arrow-forward" size={18} color="#fff" style={{ marginLeft: 8 }} />
                </>
              )}
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity
              style={styles.secondaryBtn}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('RegistrationScreen')}
            >
              <Text style={styles.secondaryText}>Create new account</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerText}>
            Don’t have an account?{' '}
            <Text style={styles.signupLink} onPress={() => navigation.navigate('RegistrationScreen')}>
              Signup
            </Text>
          </Text>

          <View style={{ height: 10 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: t.c.bg },

  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 22,
    justifyContent: 'center',
  },

  top: { alignItems: 'center', marginBottom: 16 },

  logoWrap: {
    width: 64,
    height: 64,
    borderRadius: 22,
    backgroundColor: t.c.card,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 2,
    marginBottom: 14,
  },

  logo: { width: 42, height: 42 },

  heading: { fontSize: 22, fontWeight: '900', color: t.c.text },
  subText: { marginTop: 6, fontSize: 13, fontWeight: '700', color: t.c.sub, textAlign: 'center' },

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

  label: { fontSize: 12, fontWeight: '900', color: t.c.text, marginBottom: 8 },

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

  eyeBtn: {
    width: 36,
    height: 36,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  forgotBtn: { alignSelf: 'flex-end', marginTop: 10, marginBottom: 14 },
  forgotText: { fontSize: 12, fontWeight: '800', color: t.c.sub },

  loginButton: {
    backgroundColor: t.c.pri,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 2,
  },

  loginText: { color: '#fff', fontWeight: '900', fontSize: 14 },

  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 14 },
  line: { flex: 1, height: 1, backgroundColor: t.c.line },
  dividerText: { marginHorizontal: 10, fontSize: 12, fontWeight: '900', color: t.c.sub },

  secondaryBtn: {
    backgroundColor: t.c.priSoft,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: { fontSize: 13, fontWeight: '900', color: t.c.pri },

  footerText: { textAlign: 'center', marginTop: 14, fontSize: 13, fontWeight: '700', color: t.c.sub },
  signupLink: { color: t.c.pri, fontWeight: '900' },
});
  