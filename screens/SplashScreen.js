import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({ navigation }) {
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textTranslate = useRef(new Animated.Value(14)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let timer;

    const run = async () => {
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 350, useNativeDriver: true }),
        Animated.spring(logoScale, { toValue: 1, friction: 5, tension: 90, useNativeDriver: true }),
      ]).start(() => {
        Animated.parallel([
          Animated.timing(textTranslate, { toValue: 0, duration: 450, useNativeDriver: true }),
          Animated.timing(textOpacity, { toValue: 1, duration: 450, useNativeDriver: true }),
        ]).start(() => {
          timer = setTimeout(async () => {
            try {
              const token = await AsyncStorage.getItem('userToken');
              const ok = token && token !== 'null' && token !== 'undefined' && token.trim().length > 5;
              navigation.replace(ok ? 'MainTabs' : 'WelcomeScreen');
            } catch (e) {
              console.log('Token check failed:', e);
              navigation.replace('WelcomeScreen');
            }
          }, 900);
        });
      });
    };

    run();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [navigation, logoOpacity, logoScale, textOpacity, textTranslate]);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#ffffff"
        barStyle={Platform.OS === 'android' ? 'dark-content' : 'dark-content'}
      />

      <View style={styles.brandWrap}>
        <View style={styles.glow} />

        <Animated.Image
          source={require('../assets/logo.png')}
          style={[
            styles.logo,
            { opacity: logoOpacity, transform: [{ scale: logoScale }] },
          ]}
          resizeMode="contain"
        />

        <Animated.View style={{ opacity: textOpacity, transform: [{ translateY: textTranslate }], alignItems: 'center' }}>
          <Text style={styles.title}>
            <Text style={styles.green}>Fresh</Text>
            <Text style={styles.gray}>Cart</Text>
          </Text>
          <Text style={styles.tagline}>Groceries, Delivered Fresh!</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  brandWrap: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingVertical: 28,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#00B14F',
    opacity: 0.08,
    top: -120,
    right: -120,
  },
  logo: {
    height: 120,
    width: 120,
    marginBottom: 18,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 0.2,
  },
  green: { color: '#00B14F' },
  gray: { color: '#111' },
  tagline: {
    fontSize: 13,
    color: '#666',
    marginTop: 8,
  },
});
