import React, { createContext, useContext, useState } from 'react';

// Create context
const ProductsContext = createContext();

// Custom hook to use the ProductsContext
export const useProducts = () => {
  return useContext(ProductsContext);
};

// ProductsProvider component
export const ProductsProvider = ({ children }) => {
  const listOfBrands = [
    'alfresco',
    'american_made_grills',
    'aog',
    'artisan',
    'blackstone',
    'blaze',
    'bromic_heating',
    'coyote',
    'delta',
    'fire_magic',
    'fontana',
    'green_mountain',
    'napoleon',
  ];

  const [products, setProducts] = useState([]);

  // Function to load products for a specific brand
  const loadProductsByBrand = async (brandName) => {
    try {
      const productsData = await import(`../data/${brandName}.json`);
      const sortedProducts = productsData.default.sort((a, b) => a.Id - b.Id);
      setProducts(sortedProducts);
    } catch (error) {
      console.error(`Could not load products for brand ${brandName}:`, error);
    }
  };

  const loadAllProducts = async () => {
    const allProducts = [];
  
    for (const brand of listOfBrands) {
      try {
        const productsData = await import(`../data/${brand}.json`);
        allProducts.push(...productsData.default);
      } catch (error) {
        console.error(`Could not load products for brand ${brand}:`, error);
      }
    }
    console.log("TOT PRODUCTS: " + allProducts.length);
    
    return allProducts.sort((a, b) => a.Id - b.Id);
  };
  
  const getRandomProducts = async (num) => {
    const allProducts = await loadAllProducts(); // Get all products directly
    const limit = Math.min(num, allProducts.length);
    const shuffledProducts = [...allProducts].sort(() => 0.5 - Math.random());
    return shuffledProducts.slice(0, limit);
  };
  
  

  return (
    <ProductsContext.Provider value={{ products, loadProductsByBrand, loadAllProducts, getRandomProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
