import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { formatCurrency, formatName, formatPhoneNumber } from '../Utils/Helpers';

// Create a new context
const PurchaseContext = createContext();

// Custom hook to use the PurchaseContext
export const usePurchase = () => {
  return useContext(PurchaseContext);
};

export const PurchaseProvider = ({ children }) => {
  const { cartItems, clearCart } = useCart();

  // State to store user information, initialize from localStorage if available
  const [userInfo, setUserInfo] = useState(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    return savedUserInfo
      ? JSON.parse(savedUserInfo)
      : {
          name: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
        };
  });

  // Combine user info and cart items into orderData
  const orderData = {
    name: formatName(userInfo.name, userInfo.lastName),
    address: userInfo.address,
    city: userInfo.city,
    state: userInfo.state,
    postalCode: userInfo.postalCode,
    country: userInfo.country,
    phone: formatPhoneNumber(userInfo.phone),
    email: userInfo.email,
    total: formatCurrency(
      cartItems.reduce((acc, item) => acc + item.Price * item.quantity, 0)
    ),
    products: cartItems.map((item) => ({
      imageUrl: item.Image,
      title: item.Title,
      price: formatCurrency(item.Price),
    })),
  };

  // Persist userInfo in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  // Method to reset cart and user info
  const resetPurchase = () => {
    setUserInfo({
      name: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    });
    clearCart(); // Clear cart items
    localStorage.removeItem('userInfo'); // Remove userInfo from localStorage
  };

  return (
    <PurchaseContext.Provider
      value={{ cartItems, userInfo, setUserInfo, orderData, resetPurchase }}
    >
      {children}
    </PurchaseContext.Provider>
  );
};

export default PurchaseContext;
