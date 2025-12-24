import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Alert,
  Image,
  StatusBar,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const KPHB_COORDS = { latitude: 17.4931, longitude: 78.3995 };

function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const t = {
  c: {
    bg: '#F6F7FB',
    card: '#FFFFFF',
    text: '#121212',
    sub: '#6A6A6A',
    line: '#E9ECF3',
    pri: '#18A957',
    priSoft: '#EAF8F1',
    warnSoft: '#FFF4E5',
  },
};

export default function LocationScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [zone, setZone] = useState('KPHB');

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  useEffect(() => {
    const fetchLocation = async () => {
      const hasPermission = await requestPermission();
      if (!hasPermission) return;

      Geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation({ latitude, longitude });
        },
        () => {},
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    fetchLocation();
  }, []);

  const handleSubmit = () => {
    if (zone !== 'KPHB') {
      Alert.alert('Service Unavailable', 'Sorry, we are not available in your selected zone.');
      return;
    }

    const mockUserLocation = location || { latitude: 17.4938, longitude: 78.3989 };

    const distance = getDistanceFromLatLonInMeters(
      mockUserLocation.latitude,
      mockUserLocation.longitude,
      KPHB_COORDS.latitude,
      KPHB_COORDS.longitude
    );

    if (distance <= 1000) navigation.replace('MainTabs');
    else Alert.alert('Service Unavailable', 'Sorry, you are outside our delivery area.');
  };

  const handleUseCurrent = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) {
      Alert.alert('Permission Required', 'Please allow location permission to continue.');
      return;
    }
    Geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ latitude, longitude });
      },
      () => Alert.alert('Location Error', 'Unable to fetch your location. Try again.'),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.badge}>
            <Icon name="location-outline" size={16} color={t.c.pri} />
            <Text style={styles.badgeText}>Location</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.imgCard}>
            <Image
              source={require('../assets/location.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Select your location</Text>
          <Text style={styles.subtitle}>
            Turn on location to see nearby stores and faster delivery options.
          </Text>

          <TouchableOpacity activeOpacity={0.9} onPress={handleUseCurrent} style={styles.useBtn}>
            <Icon name="locate-outline" size={18} color={t.c.pri} />
            <Text style={styles.useBtnText}>
              {location ? 'Location detected' : 'Use current location'}
            </Text>
            <View style={styles.dot} />
          </TouchableOpacity>

          <View style={styles.card}>
            <Text style={styles.label}>Your zone</Text>
            <View style={styles.pickerWrap}>
              <Picker selectedValue={zone} onValueChange={setZone} style={styles.picker}>
                <Picker.Item label="KPHB" value="KPHB" />
                <Picker.Item label="Other Zone" value="Other" />
              </Picker>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Icon name="information-circle-outline" size={18} color="#B26A00" />
              </View>
              <Text style={styles.infoText}>
                Currently available within <Text style={{ fontWeight: '900' }}>1 km</Text> around KPHB.
              </Text>
            </View>

            <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Continue</Text>
              <Icon name="arrow-forward" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
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
  header: { paddingTop: 10, paddingBottom: 6, alignItems: 'flex-start' },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: t.c.priSoft,
  },
  badgeText: { fontSize: 12, fontWeight: '900', color: t.c.pri },

  hero: { flex: 1, alignItems: 'center', paddingTop: 10 },
  imgCard: {
    width: 160,
    height: 160,
    borderRadius: 26,
    backgroundColor: t.c.card,
    borderWidth: 1,
    borderColor: t.c.line,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 2,
  },
  image: { width: 120, height: 120 },

  title: { marginTop: 14, fontSize: 18, fontWeight: '900', color: t.c.text },
  subtitle: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '800',
    color: t.c.sub,
    textAlign: 'center',
    paddingHorizontal: 22,
    lineHeight: 18,
  },

  useBtn: {
    marginTop: 14,
    width: '100%',
    backgroundColor: t.c.card,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: t.c.line,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  useBtnText: { flex: 1, marginLeft: 10, fontSize: 13, fontWeight: '900', color: t.c.text },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: t.c.pri,
    opacity: 0.9,
  },

  card: {
    marginTop: 12,
    width: '100%',
    backgroundColor: t.c.card,
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: t.c.line,
  },
  label: { fontSize: 12, fontWeight: '900', color: t.c.sub, marginBottom: 8 },

  pickerWrap: {
    backgroundColor: '#F7F8FB',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: t.c.line,
    overflow: 'hidden',
  },
  picker: { color: t.c.text },

  infoRow: {
    marginTop: 12,
    backgroundColor: t.c.warnSoft,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#FFE2B8',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 14,
    backgroundColor: '#FFE8C2',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  infoText: { flex: 1, fontSize: 12, fontWeight: '800', color: '#7A4A00', lineHeight: 18 },

  button: {
    marginTop: 14,
    backgroundColor: t.c.pri,
    paddingVertical: 14,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  buttonText: { color: '#fff', fontWeight: '900', fontSize: 14 },
});
