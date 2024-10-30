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
    setProducts(productsData);
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};
