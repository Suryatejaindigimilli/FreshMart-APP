import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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

export default function AccountScreen({ navigation }) {
  const profile = {
    name: 'Surya Teja',
    email: 'suryateja5483@gmail.com',
    image: require('../assets/profile.jpg'),
  };

  const menuItems = [
    { icon: 'clipboard-list-outline', title: 'Orders', screen: 'OrderDetailsScreen' },
    { icon: 'map-marker-outline', title: 'Delivery Address', screen: 'DeliveryAddressScreen' },
    { icon: 'credit-card-outline', title: 'Payment Methods', screen: 'PaymentScreen' },
    { icon: 'bell-outline', title: 'Notifications', screen: 'NotificationsScreen' },
    { icon: 'help-circle-outline', title: 'Help', screen: 'HelpScreen' },
    { icon: 'information-outline', title: 'About', screen: 'AboutScreen' },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => navigation.replace('LoginScreen'),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Account</Text>
          <TouchableOpacity activeOpacity={0.85} style={styles.headerIconBtn}>
            <Icon name="cog-outline" size={20} color={t.c.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <Image source={profile.image} style={styles.avatar} />
          <View style={styles.info}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.email}>{profile.email}</Text>

            <View style={styles.badgesRow}>
              <View style={styles.badge}>
                <Icon name="shield-check-outline" size={14} color={t.c.pri} />
                <Text style={styles.badgeText}>Verified</Text>
              </View>
              <View style={styles.badgeSoft}>
                <Icon name="star-outline" size={14} color="#333" />
                <Text style={styles.badgeSoftText}>Premium</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.editBtn} activeOpacity={0.85}>
            <Icon name="pencil-outline" size={18} color={t.c.pri} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabel}>Settings</Text>

        <View style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, index === menuItems.length - 1 ? { borderBottomWidth: 0 } : null]}
              activeOpacity={0.85}
              onPress={() => item.screen && navigation.navigate(item.screen)}
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIconWrap}>
                  <Icon name={item.icon} size={20} color={t.c.pri} />
                </View>
                <Text style={styles.menuText}>{item.title}</Text>
              </View>
              <Icon name="chevron-right" size={22} color="#9AA0A6" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.9} onPress={handleLogout}>
          <View style={styles.logoutIconWrap}>
            <Icon name="logout" size={18} color={t.c.pri} />
          </View>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={{ height: 14 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: t.c.bg },

  container: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 18,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: t.c.text,
  },

  headerIconBtn: {
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

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: t.c.card,
    borderRadius: t.r.lg,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 2,
  },

  avatar: {
    width: 62,
    height: 62,
    borderRadius: 22,
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontWeight: '900',
    fontSize: 16,
    color: t.c.text,
  },

  email: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '700',
    color: t.c.sub,
  },

  badgesRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 8,
    flexWrap: 'wrap',
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: t.c.priSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: t.r.pill,
    gap: 6,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: '900',
    color: t.c.pri,
  },

  badgeSoft: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: t.r.pill,
    gap: 6,
  },

  badgeSoftText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#333',
  },

  editBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: t.c.priSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sectionLabel: {
    marginTop: 14,
    marginBottom: 10,
    fontSize: 12,
    fontWeight: '900',
    color: t.c.sub,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },

  menuCard: {
    backgroundColor: t.c.card,
    borderRadius: t.r.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 2,
  },

  menuItem: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: t.c.line,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  menuIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: t.c.priSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  menuText: {
    fontSize: 14,
    fontWeight: '800',
    color: t.c.text,
  },

  logoutButton: {
    marginTop: 14,
    backgroundColor: t.c.card,
    borderRadius: t.r.lg,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 2,
  },

  logoutIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: t.c.priSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoutText: {
    color: t.c.pri,
    fontWeight: '900',
    fontSize: 14,
  },
});
