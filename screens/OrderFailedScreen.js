import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
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
    danger: '#E53935',
    dangerSoft: '#FFE9E8',
    pri: '#18A957',
  },
};

export default function OrderFailedScreen({ navigation, route }) {
  const onRetry = route?.params?.onRetry;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Top bar */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.85}
          >
            <Icon name="close" size={20} color={t.c.text} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Order Status</Text>

          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}
            activeOpacity={0.85}
          >
            <Icon name="home-outline" size={20} color={t.c.text} />
          </TouchableOpacity>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <View style={styles.badge}>
            <Icon name="alert-circle-outline" size={16} color={t.c.danger} />
            <Text style={styles.badgeText}>Payment failed</Text>
          </View>

          <View style={styles.illustrationWrap}>
            <Image
              source={require('../assets/failed.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Oops! Order Failed</Text>
          <Text style={styles.subtitle}>
            We couldn’t complete your order. Please check your payment method or try again.
          </Text>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.primaryBtn}
              activeOpacity={0.9}
              onPress={() => {
                if (typeof onRetry === 'function') onRetry();
                else navigation.goBack();
              }}
            >
              <Icon name="refresh" size={18} color="#fff" />
              <Text style={styles.primaryText}>Try Again</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}
            >
              <Icon name="home-outline" size={18} color={t.c.text} />
              <Text style={styles.secondaryText}>Back to Home</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.helpHint}>
            Need help? Go to <Text style={styles.link} onPress={() => navigation.navigate('HelpScreen')}>Support</Text>
          </Text>
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

  header: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
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

  card: {
    marginTop: 6,
    backgroundColor: t.c.card,
    borderWidth: 1,
    borderColor: t.c.line,
    borderRadius: 22,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 18,
    elevation: 2,
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: t.c.dangerSoft,
    borderWidth: 1,
    borderColor: '#FFC8C6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  badgeText: { fontWeight: '900', color: t.c.danger, fontSize: 12 },

  illustrationWrap: {
    width: '100%',
    marginTop: 14,
    marginBottom: 8,
    borderRadius: 18,
    paddingVertical: 14,
    backgroundColor: '#F9FAFD',
    borderWidth: 1,
    borderColor: t.c.line,
    alignItems: 'center',
  },
  image: { width: 140, height: 140 },

  title: { marginTop: 10, fontSize: 18, fontWeight: '900', color: t.c.text, textAlign: 'center' },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: t.c.sub,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 6,
  },

  actions: { width: '100%', marginTop: 16, gap: 10 },

  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: t.c.danger,
    paddingVertical: 14,
    borderRadius: 14,
  },
  primaryText: { color: '#fff', fontWeight: '900', fontSize: 15 },

  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#F3F5FA',
    borderWidth: 1,
    borderColor: t.c.line,
    paddingVertical: 14,
    borderRadius: 14,
  },
  secondaryText: { color: t.c.text, fontWeight: '900', fontSize: 15 },

  helpHint: { marginTop: 14, fontSize: 12, color: '#8B92A0' },
  link: { color: t.c.pri, fontWeight: '900' },
});
