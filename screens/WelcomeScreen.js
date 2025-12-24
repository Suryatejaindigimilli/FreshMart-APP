import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS } from './theme';

export default function WelcomeScreen({ navigation }) {
  const handleNavigation = async () => {
    try {
      const isNewUser = await AsyncStorage.getItem('isNewUser');

      if (isNewUser === null) {
        await AsyncStorage.setItem('isNewUser', 'false');
        navigation.navigate('RegistrationScreen');
      } else {
        navigation.navigate('LoginScreen');
      }
    } catch (error) {
      console.error('Navigation decision error:', error);
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ImageBackground
        source={require('../assets/welcome-bg.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        <View style={styles.darkOverlay} />

        <View style={styles.sheet}>
          <Text style={styles.title}>
            Welcome{'\n'}to <Text style={styles.brand}>FreshCart</Text>
          </Text>

          <Text style={styles.subtitle}>
            Get your groceries delivered fresh in as fast as 10 mins.
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleNavigation} activeOpacity={0.9}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

          <Text style={styles.hint}>
            By continuing you agree to our <Text style={styles.link}>Terms</Text> &{' '}
            <Text style={styles.link}>Privacy</Text>.
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },

  bgImage: { flex: 1, justifyContent: 'flex-end' },

  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  sheet: {
    margin: 16,
    marginBottom: Platform.OS === 'android' ? 18 : 28,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.9)',
    elevation: 6,
    shadowColor: COLORS.black,
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
  },

  title: {
    fontSize: 26,
    fontFamily: FONTS.bold,
    color: '#111',
    textAlign: 'left',
    lineHeight: 32,
    marginBottom: 10,
  },
  brand: { color: COLORS.primary },

  subtitle: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    lineHeight: 18,
    marginBottom: 18,
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: 15,
  },

  hint: {
    marginTop: 12,
    fontSize: 11,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    textAlign: 'center',
  },
  link: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
  },
});
