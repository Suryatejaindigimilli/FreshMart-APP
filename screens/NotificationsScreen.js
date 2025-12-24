import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  Platform,
  StatusBar,
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
    dot: '#FF3B30',
  },
};

export default function NotificationsScreen({ navigation }) {
  const [notifications, setNotifications] = useState([
    { id: 1, image: require('../assets/fresh-stock.png'), title: 'Fresh stock available', subtitle: 'Get 40% off', read: false },
    { id: 2, image: require('../assets/fresh-stock.png'), title: 'Limited offer!', subtitle: 'Buy 1 Get 1 Free', read: false },
    { id: 3, image: require('../assets/fresh-stock.png'), title: 'Weekly deals', subtitle: 'Up to 70% off', read: true },
    { id: 4, image: require('../assets/fresh-stock.png'), title: 'New arrivals', subtitle: 'Fresh produce stocked', read: true },
  ]);

  const fadeAnim = useRef(notifications.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    fadeAnim.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 380,
        delay: index * 90,
        useNativeDriver: true,
      }).start();
    });
  }, [fadeAnim]);

  const unreadCount = notifications.reduce((a, n) => a + (n.read ? 0 : 1), 0);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markOneAsRead = (id) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBtn} activeOpacity={0.85}>
            <Icon name="arrow-back" size={20} color={t.c.text} />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Notifications</Text>
            {unreadCount > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            ) : null}
          </View>

          <TouchableOpacity onPress={markAllAsRead} style={styles.chip} activeOpacity={0.85}>
            <Icon name="checkmark-done-outline" size={16} color={t.c.pri} />
            <Text style={styles.chipText}>Mark all</Text>
          </TouchableOpacity>
        </View>

        {/* List */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
          {notifications.map((item, index) => (
            <Animated.View key={item.id} style={{ opacity: fadeAnim[index] }}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => markOneAsRead(item.id)}
                style={[styles.card, !item.read && styles.cardUnread]}
              >
                <View style={[styles.thumb, !item.read && styles.thumbUnread]}>
                  <Image source={item.image} style={styles.img} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={[styles.title, !item.read && styles.titleUnread]} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={[styles.sub, !item.read && styles.subUnread]} numberOfLines={2}>
                    {item.subtitle}
                  </Text>
                </View>

                {!item.read ? <View style={styles.dot} /> : <Icon name="chevron-forward" size={18} color="#A7ADB7" />}
              </TouchableOpacity>
            </Animated.View>
          ))}

          {notifications.length === 0 ? (
            <View style={styles.empty}>
              <Icon name="notifications-off-outline" size={42} color="#B5BAC4" />
              <Text style={styles.emptyTitle}>No notifications</Text>
              <Text style={styles.emptySub}>You’re all caught up.</Text>
            </View>
          ) : null}
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
    gap: 10,
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
  headerCenter: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1, justifyContent: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '900', color: t.c.text },
  badge: {
    backgroundColor: t.c.priSoft,
    borderWidth: 1,
    borderColor: '#BFEBD3',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  badgeText: { color: t.c.pri, fontWeight: '900', fontSize: 12 },

  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: t.c.card,
    borderWidth: 1,
    borderColor: t.c.line,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 14,
  },
  chipText: { fontWeight: '900', color: t.c.pri, fontSize: 12 },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: t.c.card,
    borderWidth: 1,
    borderColor: t.c.line,
    borderRadius: 20,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 2,
  },
  cardUnread: {
    backgroundColor: '#F2FBF6',
    borderColor: '#CDEFE0',
  },

  thumb: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#F7F8FB',
    borderWidth: 1,
    borderColor: t.c.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbUnread: {
    backgroundColor: t.c.priSoft,
    borderColor: '#BFEBD3',
  },
  img: { width: 34, height: 34, resizeMode: 'contain' },

  title: { fontSize: 14, fontWeight: '900', color: t.c.text },
  titleUnread: { color: t.c.text },
  sub: { marginTop: 3, fontSize: 12, fontWeight: '800', color: t.c.sub, lineHeight: 18 },
  subUnread: { color: '#3C3C3C' },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: t.c.dot,
  },

  empty: { marginTop: 60, alignItems: 'center' },
  emptyTitle: { marginTop: 10, fontSize: 14, fontWeight: '900', color: t.c.text },
  emptySub: { marginTop: 4, fontSize: 12, fontWeight: '800', color: t.c.sub },
});
