import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';

// Import CartContext
import { CartProvider } from './context/CartContext';

// Screens
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LocationScreen from './screens/LocationScreen';
import OrderSuccessScreen from './screens/OrderSuccessScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import FavouriteScreen from './screens/FavouriteScreen';
import AccountScreen from './screens/AccountScreen';
import OrderDetailsScreen from './screens/OrderDetailsScreen';
import DeliveryAddressScreen from './screens/DeliveryAddressScreen';
import MyDetailsScreen from './screens/MyDetailsScreen';
import NewAddressScreen from './screens/NewAddressScreen';
import AboutScreen from './screens/AboutScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import HelpScreen from './screens/HelpScreen';
import PaymentScreen from './screens/PaymentScreen';
import AddPaymentMethodScreen from './screens/AddPaymentMethodScreen';
import ShopProfileScreen from './screens/ShopProfileScreen';
import CategoryScreen from './screens/CategoryScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import CheckoutScreen from './screens/CheckoutScreen';

import AdminScreen from './screens/AdminScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ✅ Main bottom tab navigation
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#00B14F',
        tabBarInactiveTintColor: '#777',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          height: 60,
        },
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Shop') {
            iconName = 'storefront-outline';
            // }
            //  else if (route.name === 'Cart') {
            //   iconName = 'cart-outline';
          } else if (route.name === 'Favourite') {
            iconName = 'heart-outline';
          } else if (route.name === 'Account') {
            iconName = 'person-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Shop" component={HomeScreen} />
      {/* <Tab.Screen name="Cart" component={CartScreen} /> */}
      <Tab.Screen name="Favourite" component={FavouriteScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

// ✅ App wrapped with CartProvider
export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="LocationScreen" component={LocationScreen} />
          <Stack.Screen name="OrderSuccessScreen" component={OrderSuccessScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="MainTabs" component={MainTabNavigator} />
          <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
          <Stack.Screen name="DeliveryAddressScreen" component={DeliveryAddressScreen} />
          <Stack.Screen name="MyDetailsScreen" component={MyDetailsScreen} />
          <Stack.Screen name="NewAddressScreen" component={NewAddressScreen} />
          <Stack.Screen name="AboutScreen" component={AboutScreen} />
          <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
          <Stack.Screen name="HelpScreen" component={HelpScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          <Stack.Screen name="AddPaymentMethodScreen" component={AddPaymentMethodScreen} />
          <Stack.Screen name="ShopProfileScreen" component={ShopProfileScreen} />
          <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
          <Stack.Screen name="FavouriteScreen" component={FavouriteScreen} />
          <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} options={{ headerShown: true, title: 'Checkout', headerBackTitleVisible: false, animation: 'slide_from_right', }} />
          <Stack.Screen
            name="AdminScreen"
            component={AdminScreen}
            options={{ headerShown: true, title: 'Admin Dashboard' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
