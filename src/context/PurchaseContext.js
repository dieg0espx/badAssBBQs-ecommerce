import React, { createContext, useContext, useState } from 'react';
import { useCart } from './CartContext';
import { toCamelCase, formatCurrency, formatName, formatPhoneNumber } from '../Utils/Helpers';

// Create a new context
const PurchaseContext = createContext();

// Create a provider component
export const PurchaseProvider = ({ children }) => {
  // Import cart functionality from useCart
  const { cartItems } = useCart();

  // State to store user information
  const [userInfo, setUserInfo] = useState({
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

  // Order data object combining userInfo and cartItems
  const orderData = {
    name: formatName(userInfo.name, userInfo.lastName),
    address: userInfo.address,
    city: userInfo.city,
    state: userInfo.state,
    postalCode: userInfo.postalCode,
    country: userInfo.country,
    phone: formatPhoneNumber(userInfo.phone),
    email: userInfo.email,
    total: formatCurrency(cartItems.reduce((acc, item) => acc + item.Price * item.quantity, 0)),
    products: cartItems.map((item) => ({
      imageUrl: item.Image,
      title: item.Title,
      price: formatCurrency(item.Price),
    })),
  };

  return (
    <PurchaseContext.Provider value={{ cartItems, userInfo, setUserInfo, orderData }}>
      {children}
    </PurchaseContext.Provider>
  );
};

// Custom hook to use the PurchaseContext
export const usePurchase = () => {
  return useContext(PurchaseContext);
};

export default PurchaseContext;
