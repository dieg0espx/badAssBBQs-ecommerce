// import React, { createContext, useState, useEffect, useContext } from 'react';

// const CartContext = createContext();

// // Custom hook to use the ProductsContext
// export const useCart = () => {
//     return useContext(CartContext);
//   };

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   // Load cart items from localStorage on mount
//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem('cartItems'));
//     if (savedCart) setCartItems(savedCart);
//   }, []);

//   // Update localStorage whenever cartItems change
//   useEffect(() => {
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
//   }, [cartItems]);

//   // Function to add product to cart
//   const addToCart = (product) => {
//     setCartItems((prevItems) => [...prevItems, product]);
//   };

//   // Function to remove product from cart
//   const removeFromCart = (index) => {
//     setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
//   };
  

//   const updateQuantity = (index, quantity) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item, i) =>
//         i === index ? { ...item, quantity: Math.max(1, quantity) } : item
//       )
//     );
//   };

//   const getTotalQuantity = () => {
//     return cartItems.reduce((total, item) => total + item.quantity, 0);
//   };

//     // Function to clear all items from the cart
//     const clearCart = () => {
//       setCartItems([]);
//     };
  
  
  

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, getTotalQuantity, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };



import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from localStorage during initialization
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Update localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to add product to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  // Function to remove product from cart
  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  // Function to update the quantity of a specific product
  const updateQuantity = (index, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Get the total quantity of items in the cart
  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Function to clear all items from the cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems'); // Clear cart items from localStorage
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
