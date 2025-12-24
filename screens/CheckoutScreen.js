// /* eslint-disable react-native/no-inline-styles */
// // import React from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   Image,
// //   TouchableOpacity,
// //   ScrollView,
// // } from 'react-native';
// // import Icon from 'react-native-vector-icons/Ionicons';

// // const cartItems = [
// //   {
// //     id: '1',
// //     name: 'Bell Pepper Red',
// //     desc: '1kg, Price',
// //     price: '$4.99',
// //     image: require('../assets/bell-pepper.png'), // Replace with actual path
// //   },
// //   {
// //     id: '2',
// //     name: 'Egg Chicken Red',
// //     desc: '4pcs, Price',
// //     price: '$1.99',
// //     image: require('../assets/egg-red.png'), // Replace with actual path
// //   },
// // ];

// // const CheckoutScreen = () => {
// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.header}>My Cart</Text>

// //       <ScrollView style={styles.cartList}>
// //         {cartItems.map((item) => (
// //           <View key={item.id} style={styles.itemContainer}>
// //             <Image source={item.image} style={styles.itemImage} />
// //             <View style={styles.itemInfo}>
// //               <Text style={styles.itemName}>{item.name}</Text>
// //               <Text style={styles.itemDesc}>{item.desc}</Text>
// //               <View style={styles.qtyRow}>
// //                 <TouchableOpacity style={styles.qtyBtn}>
// //                   <Text style={styles.qtyText}>-</Text>
// //                 </TouchableOpacity>
// //                 <Text style={styles.qtyNum}>1</Text>
// //                 <TouchableOpacity style={styles.qtyBtn}>
// //                   <Text style={styles.qtyText}>+</Text>
// //                 </TouchableOpacity>
// //               </View>
// //             </View>
// //             <Text style={styles.itemPrice}>{item.price}</Text>
// //             <TouchableOpacity>
// //               <Icon name="close" size={20} color="#ccc" />
// //             </TouchableOpacity>
// //           </View>
// //         ))}
// //       </ScrollView>

// //       {/* Checkout Panel */}
// //       <View style={styles.checkoutContainer}>
// //         <View style={styles.checkoutHeader}>
// //           <Text style={styles.checkoutTitle}>Checkout</Text>
// //           <TouchableOpacity>
// //             <Icon name="close" size={20} />
// //           </TouchableOpacity>
// //         </View>

// //         <TouchableOpacity style={styles.checkoutRow}>
// //           <Text style={styles.label}>Delivery</Text>
// //           <View style={styles.rowRight}>
// //             <Text style={styles.selectText}>Select Method</Text>
// //             <Icon name="chevron-forward" size={18} />
// //           </View>
// //         </TouchableOpacity>

// //         <TouchableOpacity style={styles.checkoutRow}>
// //           <Text style={styles.label}>Payment</Text>
// //           <Icon name="card" size={20} color="#3366ff" />
// //         </TouchableOpacity>

// //         <TouchableOpacity style={styles.checkoutRow}>
// //           <Text style={styles.label}>Promo Code</Text>
// //           <View style={styles.rowRight}>
// //             <Text style={styles.selectText}>Pick discount</Text>
// //             <Icon name="chevron-forward" size={18} />
// //           </View>
// //         </TouchableOpacity>

// //         <View style={styles.checkoutRow}>
// //           <Text style={styles.label}>Total Cost</Text>
// //           <Text style={styles.price}>$13.97</Text>
// //         </View>

// //         <Text style={styles.agreeText}>
// //           By placing an order you agree to our{' '}
// //           <Text style={styles.termsText}>Terms And Conditions</Text>
// //         </Text>

// //         <TouchableOpacity style={styles.placeOrderBtn}>
// //           <Text style={styles.placeOrderText}>Place Order</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );
// // };

// // export default CheckoutScreen;

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#fff' },
// //   header: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     margin: 16,
// //     textAlign: 'center',
// //   },
// //   cartList: { paddingHorizontal: 16 },
// //   itemContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     paddingVertical: 12,
// //     borderBottomColor: '#eee',
// //     borderBottomWidth: 1,
// //   },
// //   itemImage: { width: 50, height: 50, resizeMode: 'contain', marginRight: 12 },
// //   itemInfo: { flex: 1 },
// //   itemName: { fontSize: 16, fontWeight: 'bold' },
// //   itemDesc: { color: '#666' },
// //   qtyRow: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginTop: 6,
// //   },
// //   qtyBtn: {
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     borderRadius: 5,
// //     paddingHorizontal: 10,
// //     paddingVertical: 2,
// //   },
// //   qtyText: { fontSize: 16 },
// //   qtyNum: { marginHorizontal: 10, fontSize: 16 },
// //   itemPrice: { fontWeight: 'bold', marginRight: 10 },

// //   checkoutContainer: {
// //     backgroundColor: '#fff',
// //     borderTopLeftRadius: 20,
// //     borderTopRightRadius: 20,
// //     padding: 20,
// //     elevation: 10,
// //   },
// //   checkoutHeader: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginBottom: 16,
// //   },
// //   checkoutTitle: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //   },
// //   checkoutRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginBottom: 14,
// //   },
// //   label: {
// //     fontSize: 16,
// //     color: '#333',
// //   },
// //   selectText: {
// //     color: '#555',
// //   },
// //   rowRight: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     gap: 4,
// //   },
// //   price: {
// //     fontWeight: 'bold',
// //   },
// //   agreeText: {
// //     fontSize: 12,
// //     color: '#666',
// //     marginTop: 10,
// //     marginBottom: 10,
// //   },
// //   termsText: {
// //     fontWeight: 'bold',
// //     color: '#00a859',
// //   },
// //   placeOrderBtn: {
// //     backgroundColor: '#4CAF50',
// //     paddingVertical: 14,
// //     borderRadius: 12,
// //     alignItems: 'center',
// //     marginTop: 10,
// //   },
// //   placeOrderText: {
// //     color: '#fff',
// //     fontWeight: 'bold',
// //     fontSize: 16,
// //   },
// // });


// import React, { useState } from 'react';
// import {
//   View, Text, StyleSheet, Image, TouchableOpacity,
//   ScrollView, Alert
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import AddressSelectorModal from './AddressSelectorModal';
// import axios from 'axios';
// import CheckBox from '@react-native-community/checkbox'; // ✅ Imported checkbox

// const DELIVERY_FEE = 10;
// const TAX_RATE = 19;

// const CheckoutScreen = ({ route, navigation }) => {
//   const { cartItems: initialCartItems = [], selectedAddress, token } = route.params || {};
//   const [cartItems, setCartItems] = useState(initialCartItems);
//   const [deliveryAddress, setDeliveryAddress] = useState(selectedAddress || null);
//   const [paymentMethod, setPaymentMethod] = useState(null);
//   const [discount, setDiscount] = useState(0);
//   const [addressModalVisible, setAddressModalVisible] = useState(false);
//   const [isAgreed, setIsAgreed] = useState(false); // ✅ Checkbox state

//   const getSubtotal = () =>
//     cartItems.reduce((sum, item) => sum + item.price * item.count, 0);

//   const subtotal = cartItems.length > 0 ? Number(getSubtotal()) : 0;
//   const tax = cartItems.length > 0 ? TAX_RATE : 0;
//   const grandTotal = cartItems.length > 0 ? subtotal - discount + DELIVERY_FEE + tax : 0;

//   const handleIncrement = (itemId) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === itemId ? { ...item, count: item.count + 1 } : item
//       )
//     );
//   };

//   const handleDecrement = (itemId) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === itemId ? { ...item, count: item.count - 1 } : item
//       ).filter((item) => item.count > 0)
//     );
//   };

//   const handlePlaceOrder = async () => {
//     if (cartItems.length === 0) {
//       Alert.alert('Cart is Empty', 'Please add items to cart before placing an order.');
//       return;
//     }

//     if (!deliveryAddress) {
//       setAddressModalVisible(true);
//       return;
//     }

//     if (!paymentMethod) {
//       Alert.alert('Payment Method Required', 'Please select a payment method.');
//       return;
//     }

//     try {
//       try {
//         const res = await axios.post(
//           'http://192.168.0.191:3000/delivery-addresses',
//           deliveryAddress,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//             timeout: 5000, // optional: 5 seconds timeout
//           }
//         );
//         console.log('Address Saved:', res.data);
//       } catch (error) {
//         console.error('Address Save Failed:', error.message);
//         Alert.alert('Network Error', 'Could not save address. Please check your connection.');
//       }



//       Alert.alert('Order Placed', 'Your order has been successfully placed.');
//       navigation.navigate('OrderSuccessScreen');
//     } catch (error) {
//       console.error('Save Address Failed:', error);
//       Alert.alert('Error', 'Failed to save address.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {cartItems.length === 0 ? (
//         <View style={styles.emptyContainer}>
//           <Icon name="cart-outline" size={80} color="#ccc" />
//           <Text style={styles.emptyText}>Your cart is empty</Text>
//           <TouchableOpacity
//             style={styles.continueBtn}
//             onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}
//           >
//             <Text style={styles.continueBtnText}>Continue Shopping</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <>
//           <ScrollView style={styles.cartList}>
//             {cartItems.map((item) => (
//               <View key={item.id} style={styles.itemContainer}>
//                 <Image source={{ uri: item.product_image_url }} style={styles.itemImage} />
//                 <View style={styles.itemInfo}>
//                   <Text style={styles.itemName}>{item.product_name}</Text>
//                   <Text style={styles.itemDesc}>{item.quantity}</Text>
//                   <View style={styles.priceQtyRow}>
//                     <View style={styles.quantityRow}>
//                       <TouchableOpacity onPress={() => handleDecrement(item.id)} style={styles.qtyButton}>
//                         <Text style={styles.qtyButtonText}>-</Text>
//                       </TouchableOpacity>
//                       <Text style={styles.qtyValue}>{item.count}</Text>
//                       <TouchableOpacity onPress={() => handleIncrement(item.id)} style={styles.qtyButton}>
//                         <Text style={styles.qtyButtonText}>+</Text>
//                       </TouchableOpacity>
//                     </View>
//                     <Text style={styles.itemPrice}>₹{(item.price * item.count).toFixed(2)}</Text>
//                   </View>
//                 </View>
//               </View>
//             ))}
//           </ScrollView>

//           <View style={styles.checkoutContainer}>
//             <Text style={styles.checkoutTitle}>Checkout Summary</Text>

//             <TouchableOpacity style={styles.checkoutRow} onPress={() => setAddressModalVisible(true)}>
//               <Text style={styles.label}>Delivery</Text>
//               <View style={styles.rowRight}>
//                 <Text style={styles.selectText}>
//                   {deliveryAddress?.full_name
//                     ? `${deliveryAddress.full_name}, ${deliveryAddress.street_address}`
//                     : 'Select Address'}
//                 </Text>
//                 <Icon name="chevron-forward" size={18} />
//               </View>
//             </TouchableOpacity>

//             <View style={styles.priceRow}>
//               <Text style={styles.label}>Subtotal</Text>
//               <Text>₹{subtotal.toFixed(2)}</Text>
//             </View>
//             <View style={styles.priceRow}>
//               <Text style={styles.label}>Discount</Text>
//               <Text style={{ color: 'green' }}>– ₹{discount.toFixed(2)}</Text>
//             </View>
//             <View style={styles.priceRow}>
//               <Text style={styles.label}>Delivery Fee</Text>
//               <Text>₹{DELIVERY_FEE.toFixed(2)}</Text>
//             </View>
//             <View style={styles.priceRow}>
//               <Text style={styles.label}>Platform Fee</Text>
//               <Text>₹{tax.toFixed(2)}</Text>
//             </View>

//             <View style={[styles.priceRow, { marginTop: 10 }]}>
//               <Text style={[styles.label, { fontWeight: 'bold' }]}>Total</Text>
//               <Text style={[styles.price, { fontWeight: 'bold' }]}>₹{grandTotal.toFixed(2)}</Text>
//             </View>

//             <Text style={styles.label1}>Payment Method</Text>
//             <View style={styles.paymentOptions}>
//               <TouchableOpacity
//                 style={[
//                   styles.paymentOption,
//                   paymentMethod === 'Cash on Delivery' && styles.paymentOptionSelected,
//                 ]}
//                 onPress={() => setPaymentMethod('Cash on Delivery')}
//               >
//                 <Icon name="cash-outline" size={18} color="#333" />
//                 <Text style={styles.paymentText}>Cash on Delivery</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[
//                   styles.paymentOption,
//                   paymentMethod === 'UPI' && styles.paymentOptionSelected,
//                 ]}
//                 onPress={() => setPaymentMethod('UPI')}
//               >
//                 <Icon name="logo-google-playstore" size={18} color="#333" />
//                 <Text style={styles.paymentText}>UPI</Text>
//               </TouchableOpacity>
//             </View>

//             {/* ✅ Checkbox for Terms */}
//             <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
//               <CheckBox
//                 value={isAgreed}
//                 onValueChange={setIsAgreed}
//                 tintColors={{ true: '#00B14F', false: '#aaa' }}
//               />
//               <Text style={styles.agreeText}>
//                 By placing an order you agree to our{' '}
//                 <Text style={styles.termsText}>Terms And Conditions</Text>
//               </Text>
//             </View>

//             <TouchableOpacity
//               style={[styles.placeOrderBtn, !isAgreed && { backgroundColor: '#ccc' }]}
//               onPress={() => {
//                 if (!isAgreed) {
//                   Alert.alert('Terms Required', 'Please agree to the Terms and Conditions.');
//                   return;
//                 }
//                 if (deliveryAddress) {
//                   handlePlaceOrder();
//                 } else {
//                   setAddressModalVisible(true);
//                 }
//               }}
//             >
//               <Text style={styles.placeOrderText}>
//                 {deliveryAddress ? 'Place Order' : 'Select Address'}
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <AddressSelectorModal
//             visible={addressModalVisible}
//             onClose={() => setAddressModalVisible(false)}
//             onSelect={(address) => {
//               setDeliveryAddress(address);
//               setAddressModalVisible(false);
//             }}
//             token={token}
//           />
//         </>
//       )}
//     </View>
//   );
// };

// export default CheckoutScreen;


// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   cartList: { paddingHorizontal: 16 },
//   itemContainer: {
//     flexDirection: 'row',
//     paddingVertical: 12,
//     borderBottomColor: '#eee',
//     borderBottomWidth: 1,
//   },
//   itemImage: {
//     width: 50,
//     height: 50,
//     resizeMode: 'contain',
//     marginRight: 12,
//     borderRadius: 6,
//   },
//   itemInfo: { flex: 1 },
//   itemName: { fontSize: 16, fontWeight: 'bold' },
//   itemDesc: { color: '#666', fontSize: 12 },
//   priceQtyRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   quantityRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   qtyButton: {
//     backgroundColor: '#eee',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 5,
//   },
//   qtyButtonText: { fontSize: 16, fontWeight: 'bold' },
//   qtyValue: { marginHorizontal: 10, fontWeight: 'bold', fontSize: 14 },
//   itemPrice: {
//     fontWeight: 'bold',
//     fontSize: 14,
//     color: '#2e7d32',
//   },
//   checkoutContainer: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     elevation: 10,
//   },
//   checkoutTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 12,
//   },
//   checkoutRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 14,
//   },
//   label: {
//     fontSize: 16,
//     color: '#333',
//   },
//   label1: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 12,
//   },
//   selectText: {
//     color: '#555',
//   },
//   rowRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   priceRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   price: {
//     fontSize: 16,
//   },
//   paymentOptions: {
//     flexDirection: 'row',
//     gap: 10,
//     marginBottom: 16,
//   },
//   paymentOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//   },
//   paymentOptionSelected: {
//     backgroundColor: '#e0f2f1',
//     borderColor: '#4CAF50',
//   },
//   paymentText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   agreeText: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   termsText: {
//     fontWeight: 'bold',
//     color: '#00a859',
//   },
//   placeOrderBtn: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   placeOrderText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   emptyText: {
//     fontSize: 18,
//     color: '#888',
//     marginTop: 10,
//     fontWeight: '600',
//   },
//   continueBtn: {
//     marginTop: 20,
//     backgroundColor: '#4CAF50',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//   },
//   continueBtnText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

/* eslint-disable react-native/no-inline-styles */
// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const cartItems = [
//   {
//     id: '1',
//     name: 'Bell Pepper Red',
//     desc: '1kg, Price',
//     price: '$4.99',
//     image: require('../assets/bell-pepper.png'), // Replace with actual path
//   },
//   {
//     id: '2',
//     name: 'Egg Chicken Red',
//     desc: '4pcs, Price',
//     price: '$1.99',
//     image: require('../assets/egg-red.png'), // Replace with actual path
//   },
// ];

// const CheckoutScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>My Cart</Text>

//       <ScrollView style={styles.cartList}>
//         {cartItems.map((item) => (
//           <View key={item.id} style={styles.itemContainer}>
//             <Image source={item.image} style={styles.itemImage} />
//             <View style={styles.itemInfo}>
//               <Text style={styles.itemName}>{item.name}</Text>
//               <Text style={styles.itemDesc}>{item.desc}</Text>
//               <View style={styles.qtyRow}>
//                 <TouchableOpacity style={styles.qtyBtn}>
//                   <Text style={styles.qtyText}>-</Text>
//                 </TouchableOpacity>
//                 <Text style={styles.qtyNum}>1</Text>
//                 <TouchableOpacity style={styles.qtyBtn}>
//                   <Text style={styles.qtyText}>+</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//             <Text style={styles.itemPrice}>{item.price}</Text>
//             <TouchableOpacity>
//               <Icon name="close" size={20} color="#ccc" />
//             </TouchableOpacity>
//           </View>
//         ))}
//       </ScrollView>

//       {/* Checkout Panel */}
//       <View style={styles.checkoutContainer}>
//         <View style={styles.checkoutHeader}>
//           <Text style={styles.checkoutTitle}>Checkout</Text>
//           <TouchableOpacity>
//             <Icon name="close" size={20} />
//           </TouchableOpacity>
//         </View>

//         <TouchableOpacity style={styles.checkoutRow}>
//           <Text style={styles.label}>Delivery</Text>
//           <View style={styles.rowRight}>
//             <Text style={styles.selectText}>Select Method</Text>
//             <Icon name="chevron-forward" size={18} />
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.checkoutRow}>
//           <Text style={styles.label}>Payment</Text>
//           <Icon name="card" size={20} color="#3366ff" />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.checkoutRow}>
//           <Text style={styles.label}>Promo Code</Text>
//           <View style={styles.rowRight}>
//             <Text style={styles.selectText}>Pick discount</Text>
//             <Icon name="chevron-forward" size={18} />
//           </View>
//         </TouchableOpacity>

//         <View style={styles.checkoutRow}>
//           <Text style={styles.label}>Total Cost</Text>
//           <Text style={styles.price}>$13.97</Text>
//         </View>

//         <Text style={styles.agreeText}>
//           By placing an order you agree to our{' '}
//           <Text style={styles.termsText}>Terms And Conditions</Text>
//         </Text>

//         <TouchableOpacity style={styles.placeOrderBtn}>
//           <Text style={styles.placeOrderText}>Place Order</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default CheckoutScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff' },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     margin: 16,
//     textAlign: 'center',
//   },
//   cartList: { paddingHorizontal: 16 },
//   itemContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomColor: '#eee',
//     borderBottomWidth: 1,
//   },
//   itemImage: { width: 50, height: 50, resizeMode: 'contain', marginRight: 12 },
//   itemInfo: { flex: 1 },
//   itemName: { fontSize: 16, fontWeight: 'bold' },
//   itemDesc: { color: '#666' },
//   qtyRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 6,
//   },
//   qtyBtn: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 2,
//   },
//   qtyText: { fontSize: 16 },
//   qtyNum: { marginHorizontal: 10, fontSize: 16 },
//   itemPrice: { fontWeight: 'bold', marginRight: 10 },

//   checkoutContainer: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     elevation: 10,
//   },
//   checkoutHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   checkoutTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   checkoutRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 14,
//   },
//   label: {
//     fontSize: 16,
//     color: '#333',
//   },
//   selectText: {
//     color: '#555',
//   },
//   rowRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   price: {
//     fontWeight: 'bold',
//   },
//   agreeText: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   termsText: {
//     fontWeight: 'bold',
//     color: '#00a859',
//   },
//   placeOrderBtn: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   placeOrderText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });


import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AddressSelectorModal from './AddressSelectorModal';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';
import RazorpayCheckout from 'react-native-razorpay';
import { SafeAreaView } from 'react-native-safe-area-context';

const DELIVERY_FEE = 10;
const TAX_RATE = 19;

const t = {
  c: {
    bg: '#F6F7FB',
    card: '#FFFFFF',
    text: '#121212',
    sub: '#6A6A6A',
    line: '#E9ECF3',
    pri: '#18A957',
    priSoft: '#EAF8F1',
    dangerSoft: '#FFF1F3',
    danger: '#FF3B30',
  },
  r: { md: 16, lg: 20, pill: 999 },
};

const CheckoutScreen = ({ route, navigation }) => {
  const { cartItems: initialCartItems = [], selectedAddress, token } = route.params || {};
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [deliveryAddress, setDeliveryAddress] = useState(selectedAddress || null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [discount] = useState(0);
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const api_url = 'http://192.168.0.137:5000';

  const subtotal = cartItems.reduce((s, x) => s + Number(x.price || 0) * Number(x.count || 0), 0);
  const tax = cartItems.length > 0 ? TAX_RATE : 0;
  const total = cartItems.length > 0 ? subtotal - discount + DELIVERY_FEE + tax : 0;

  const handleIncrement = (id) => {
    setCartItems((p) => p.map((x) => (x.id === id ? { ...x, count: x.count + 1 } : x)));
  };

  const handleDecrement = (id) => {
    setCartItems((p) =>
      p
        .map((x) => (x.id === id ? { ...x, count: x.count - 1 } : x))
        .filter((x) => x.count > 0)
    );
  };

  const handleRazorpayPayment = async () => {
    try {
      if (total <= 0) {
        Alert.alert('Invalid Amount', 'Order total must be greater than 0.');
        return;
      }

      const orderResponse = await axios.post(`${api_url}/create-order`, {
        amount: Math.round(total * 100),
      });
      const order = orderResponse.data;

      const options = {
        description: 'FreshMart Order Payment',
        image: 'https://your-logo-url.com/logo.png',
        currency: 'INR',
        key: 'rzp_test_9A3QWbqnrOe3ds',
        amount: Math.round(total * 100),
        name: 'FreshMart',
        order_id: order.id,
        prefill: {
          email: 'customer@example.com',
          contact: '9999999999',
          name: deliveryAddress?.full_name || 'Customer',
        },
        theme: { color: t.c.pri },
        modal: { ondismiss: () => {} },
      };

      const data = await RazorpayCheckout.open(options);
      await processOrderAfterPayment(data);
    } catch (error) {
      if (error?.code === 'PAYMENT_CANCELLED') {
        Alert.alert('Payment Cancelled', 'Payment was cancelled by user.');
      } else if (error?.code === 'NETWORK_ERROR') {
        Alert.alert('Network Error', 'Please check your internet connection and try again.');
      } else {
        Alert.alert('Payment Failed', 'Payment failed. Please try again.');
      }
    }
  };

  const processOrderAfterPayment = async (paymentData) => {
    try {
      const vr = await axios.post(`${api_url}/verify-payment`, {
        razorpay_order_id: paymentData.razorpay_order_id,
        razorpay_payment_id: paymentData.razorpay_payment_id,
        razorpay_signature: paymentData.razorpay_signature,
      });

      if (!vr.data?.success) {
        Alert.alert('Payment Verification Failed', 'Please contact support.');
        return;
      }

      try {
        await axios.post(`${api_url}/delivery-addresses`, deliveryAddress, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 5000,
        });
      } catch {}

      Alert.alert('Payment Successful', 'Your order has been placed successfully!');
      navigation.navigate('OrderSuccessScreen');
    } catch {
      Alert.alert('Error', 'Order processing failed. Please contact support.');
    }
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart is Empty', 'Please add items to cart before placing an order.');
      return;
    }
    if (!deliveryAddress) {
      setAddressModalVisible(true);
      return;
    }
    if (!paymentMethod) {
      Alert.alert('Payment Method Required', 'Please select a payment method.');
      return;
    }

    if (paymentMethod === 'Online Payment') {
      await handleRazorpayPayment();
      return;
    }

    try {
      try {
        await axios.post(`${api_url}/delivery-addresses`, deliveryAddress, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 5000,
        });
      } catch {
        Alert.alert('Network Error', 'Could not save address. Please check your connection.');
        return;
      }
      navigation.navigate('OrderSuccessScreen');
    } catch {
      Alert.alert('Error', 'Failed to place order.');
    }
  };

  const Empty = () => (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <Icon name="cart-outline" size={28} color={t.c.pri} />
      </View>
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptySub}>Add items to continue</Text>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.primaryBtn}
        onPress={() => navigation.navigate('MainTabs', { screen: 'Shop' })}
      >
        <Text style={styles.primaryBtnText}>Continue Shopping</Text>
        <Icon name="arrow-forward" size={16} color="#fff" style={{ marginLeft: 8 }} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.85} style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={22} color={t.c.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.iconBtnGhost} />
      </View>

      {cartItems.length === 0 ? (
        <Empty />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 220 }}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Items</Text>

              {cartItems.map((item) => {
                const unit = Number(item.price || 0);
                const cnt = Number(item.count || 0);
                const lineTotal = unit * cnt;

                return (
                  <View key={item.id} style={styles.itemCard}>
                    <View style={styles.itemImgWrap}>
                      <Image
                        source={item.product_image_url ? { uri: item.product_image_url } : require('../assets/logo.png')}
                        style={styles.itemImage}
                      />
                    </View>

                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <Text style={styles.itemName} numberOfLines={1}>
                        {item.product_name}
                      </Text>
                      <Text style={styles.itemDesc} numberOfLines={1}>
                        {item.quantity || '—'}
                      </Text>

                      <View style={styles.itemBottomRow}>
                        <View style={styles.qty}>
                          <TouchableOpacity activeOpacity={0.9} onPress={() => handleDecrement(item.id)} style={styles.qtyBtn}>
                            <Icon name="remove" size={16} color={t.c.text} />
                          </TouchableOpacity>

                          <Text style={styles.qtyVal}>{cnt}</Text>

                          <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => handleIncrement(item.id)}
                            style={[styles.qtyBtn, styles.qtyBtnPri]}
                          >
                            <Icon name="add" size={16} color="#fff" />
                          </TouchableOpacity>
                        </View>

                        <Text style={styles.itemPrice}>₹{lineTotal.toFixed(2)}</Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeadRow}>
                <Text style={styles.sectionTitle}>Delivery Address</Text>
                <TouchableOpacity activeOpacity={0.9} onPress={() => setAddressModalVisible(true)} style={styles.linkBtn}>
                  <Text style={styles.linkText}>{deliveryAddress ? 'Change' : 'Select'}</Text>
                  <Icon name="chevron-forward" size={16} color={t.c.pri} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity activeOpacity={0.9} style={styles.addressCard} onPress={() => setAddressModalVisible(true)}>
                <View style={styles.addressIcon}>
                  <Icon name="location-outline" size={18} color={t.c.pri} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.addrTitle} numberOfLines={1}>
                    {deliveryAddress?.full_name ? deliveryAddress.full_name : 'Select delivery address'}
                  </Text>
                  <Text style={styles.addrSub} numberOfLines={2}>
                    {deliveryAddress?.street_address
                      ? `${deliveryAddress.house_number || ''} ${deliveryAddress.street_address}, ${deliveryAddress.city || ''}, ${deliveryAddress.state || ''}`
                      : 'Tap to choose an address'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Payment</Text>

              <View style={styles.payGrid}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={[styles.payCard, paymentMethod === 'Cash on Delivery' && styles.payCardOn]}
                  onPress={() => setPaymentMethod('Cash on Delivery')}
                >
                  <View style={[styles.payIcon, paymentMethod === 'Cash on Delivery' && styles.payIconOn]}>
                    <Icon name="cash-outline" size={18} color={paymentMethod === 'Cash on Delivery' ? '#fff' : t.c.text} />
                  </View>
                  <Text style={styles.payText}>Cash on Delivery</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  style={[styles.payCard, paymentMethod === 'Online Payment' && styles.payCardOn]}
                  onPress={() => setPaymentMethod('Online Payment')}
                >
                  <View style={[styles.payIcon, paymentMethod === 'Online Payment' && styles.payIconOn]}>
                    <Icon name="card-outline" size={18} color={paymentMethod === 'Online Payment' ? '#fff' : t.c.text} />
                  </View>
                  <Text style={styles.payText}>Online</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.termsRow}>
                <CheckBox value={isAgreed} onValueChange={setIsAgreed} tintColors={{ true: t.c.pri, false: '#aaa' }} />
                <Text style={styles.agreeText}>
                  By placing an order you agree to our <Text style={styles.termsText}>Terms & Conditions</Text>
                </Text>
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <View style={styles.billCard}>
              <Text style={styles.billTitle}>Bill Summary</Text>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Subtotal</Text>
                <Text style={styles.billVal}>₹{subtotal.toFixed(2)}</Text>
              </View>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Discount</Text>
                <Text style={[styles.billVal, { color: t.c.pri }]}>– ₹{discount.toFixed(2)}</Text>
              </View>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Delivery fee</Text>
                <Text style={styles.billVal}>₹{DELIVERY_FEE.toFixed(2)}</Text>
              </View>

              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Platform fee</Text>
                <Text style={styles.billVal}>₹{tax.toFixed(2)}</Text>
              </View>

              <View style={[styles.billRow, { marginTop: 10 }]}>
                <Text style={styles.billTotalLabel}>Total</Text>
                <Text style={styles.billTotalVal}>₹{total.toFixed(2)}</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.cta, (!isAgreed || !deliveryAddress || !paymentMethod) && styles.ctaDis]}
                onPress={() => {
                  if (!isAgreed) {
                    Alert.alert('Terms Required', 'Please agree to the Terms and Conditions.');
                    return;
                  }
                  if (!deliveryAddress) {
                    setAddressModalVisible(true);
                    return;
                  }
                  if (!paymentMethod) {
                    Alert.alert('Payment Method Required', 'Please select a payment method.');
                    return;
                  }
                  handlePlaceOrder();
                }}
              >
                <Text style={styles.ctaText}>{paymentMethod === 'Online Payment' ? 'Pay & Place Order' : 'Place Order'}</Text>
                <Icon name="arrow-forward" size={16} color="#fff" style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            </View>
          </View>

          <AddressSelectorModal
            visible={addressModalVisible}
            onClose={() => setAddressModalVisible(false)}
            onSelect={(address) => {
              setDeliveryAddress(address);
              setAddressModalVisible(false);
            }}
            token={token}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: t.c.bg,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
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
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 2,
  },
  iconBtnGhost: { width: 40, height: 40 },

  section: {
    marginTop: 12,
    marginHorizontal: 16,
    backgroundColor: t.c.card,
    borderRadius: 18,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 2,
  },
  sectionTitle: { fontSize: 14, fontWeight: '900', color: t.c.text, marginBottom: 10 },

  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: t.c.line,
    marginBottom: 10,
  },
  itemImgWrap: {
    width: 74,
    height: 74,
    borderRadius: 16,
    backgroundColor: '#EEF1F6',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  itemImage: { width: 58, height: 58, resizeMode: 'contain' },

  itemName: { fontSize: 14, fontWeight: '900', color: t.c.text },
  itemDesc: { marginTop: 4, fontSize: 12, fontWeight: '800', color: t.c.sub },

  itemBottomRow: { marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },

  qty: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: '#F3F4F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnPri: { backgroundColor: t.c.pri },
  qtyVal: { marginHorizontal: 10, fontSize: 14, fontWeight: '900', color: t.c.text },

  itemPrice: { fontSize: 14, fontWeight: '900', color: t.c.pri },

  sectionHeadRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  linkBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  linkText: { color: t.c.pri, fontWeight: '900' },

  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: t.c.line,
  },
  addressIcon: {
    width: 36,
    height: 36,
    borderRadius: 14,
    backgroundColor: t.c.priSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  addrTitle: { fontSize: 13, fontWeight: '900', color: t.c.text },
  addrSub: { marginTop: 4, fontSize: 12, fontWeight: '800', color: t.c.sub },

  payGrid: { flexDirection: 'row', gap: 10 },
  payCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: t.c.line,
    borderRadius: 16,
    padding: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  payCardOn: { borderColor: t.c.pri, backgroundColor: t.c.priSoft },
  payIcon: {
    width: 38,
    height: 38,
    borderRadius: 14,
    backgroundColor: '#F3F4F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  payIconOn: { backgroundColor: t.c.pri },
  payText: { fontSize: 12, fontWeight: '900', color: t.c.text, textAlign: 'center' },

  termsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  agreeText: { flex: 1, fontSize: 12, fontWeight: '800', color: t.c.sub, marginLeft: 8 },
  termsText: { color: t.c.pri, fontWeight: '900' },

  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 10,
    backgroundColor: 'rgba(246,247,251,0.92)',
  },

  billCard: {
    backgroundColor: t.c.card,
    borderRadius: 18,
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 2,
  },
  billTitle: { fontSize: 14, fontWeight: '900', color: t.c.text, marginBottom: 10 },

  billRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  billLabel: { fontSize: 12, fontWeight: '800', color: t.c.sub },
  billVal: { fontSize: 12, fontWeight: '900', color: t.c.text },

  billTotalLabel: { fontSize: 14, fontWeight: '900', color: t.c.text },
  billTotalVal: { fontSize: 16, fontWeight: '900', color: t.c.text },

  cta: {
    marginTop: 12,
    backgroundColor: t.c.pri,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  ctaDis: { backgroundColor: '#C9CDD6' },
  ctaText: { color: '#fff', fontWeight: '900', fontSize: 14 },

  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 22 },
  emptyIcon: {
    width: 58,
    height: 58,
    borderRadius: 22,
    backgroundColor: t.c.priSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  emptyTitle: { fontSize: 16, fontWeight: '900', color: t.c.text },
  emptySub: { marginTop: 6, fontSize: 12, fontWeight: '800', color: t.c.sub, textAlign: 'center' },

  primaryBtn: {
    marginTop: 14,
    backgroundColor: t.c.pri,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryBtnText: { color: '#fff', fontWeight: '900', fontSize: 14 },
});
