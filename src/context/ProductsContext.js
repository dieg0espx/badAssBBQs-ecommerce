import React, { createContext, useContext, useState, useEffect } from 'react';
import productsData from '../data/products.json';

const ProductsContext = createContext();

export const useProducts = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load products data (you can also fetch from an API)
    const sortedProducts = productsData.sort((a, b) => a.Id - b.Id);
    setProducts(sortedProducts); // Set sorted products
  }, []);

  // Function to get random products
  const getRandomProducts = (num) => {
    // Check if num is greater than available products
    const limit = Math.min(num, products.length);

    // Create a copy of the products array and shuffle it
    const shuffledProducts = [...products].sort(() => 0.5 - Math.random());

    // Return the first 'limit' products from the shuffled array
    return shuffledProducts.slice(0, limit);
  };

  return (
    <ProductsContext.Provider value={{ products, getRandomProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
