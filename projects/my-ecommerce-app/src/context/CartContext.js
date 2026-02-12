import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Load cart from LocalStorage on start
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to LocalStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + quantity } : item
        );
      }
      return [...prevCart, { ...product, qty: quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart(prevCart => 
      prevCart.map(item => {
        if (item.id === id) {
          return { ...item, qty: Math.max(1, item.qty + amount) };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const totalParams = cart.reduce((acc, item) => {
    return {
      count: acc.count + item.qty,
      total: acc.total + (item.price * item.qty)
    };
  }, { count: 0, total: 0 });

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      cartCount: totalParams.count,
      cartTotal: totalParams.total
    }}>
      {children}
    </CartContext.Provider>
  );
};
