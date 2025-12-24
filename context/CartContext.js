import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [...prev, { ...product, count: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const incrementItem = (product) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === product.id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const decrementItem = (product) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === product.id ? { ...item, count: item.count - 1 } : item
        )
        .filter(item => item.count > 0) // ✅ Remove if count drops to 0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((sum, item) => sum + item.count, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.count, 0).toFixed(2);
  };

  const getItemCount = (id) => {
    const item = cartItems.find(p => p.id === id);
    return item ? item.count : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementItem,
        decrementItem,
        getCartCount,
        getTotalPrice,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
