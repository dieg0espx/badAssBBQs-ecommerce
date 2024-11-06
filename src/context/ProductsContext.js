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
    'american_fyre_design', 
    'breeo',
    'the_outdoor_plus',
    'twin_eagles'
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
  
    // Group products by brand
    const productsByBrand = allProducts.reduce((acc, product) => {
      if (!acc[product.brand]) {
        acc[product.brand] = [];
      }
      acc[product.brand].push(product);
      return acc;
    }, {});
  
    // Select one random product per brand
    const oneProductPerBrand = Object.values(productsByBrand).map(products => {
      return products[Math.floor(Math.random() * products.length)];
    });
  
    // Limit the selection to the desired number of products
    const limit = Math.min(num, oneProductPerBrand.length);
    const selectedProducts = oneProductPerBrand.sort(() => 0.5 - Math.random()).slice(0, limit);
  
    return selectedProducts;
  };
  

  

   // Function to get related products based on categories
   const relatedProducts = async (category, amount) => {
    const allProducts = await loadAllProducts(); // Load all products
    const filteredCategory = category.filter(cat => cat !== "Home"); // Exclude "Home" from categories

    const related = allProducts.filter(product =>
      product.Category.some(cat => filteredCategory.includes(cat) && cat !== "Home")
    );

    // Shuffle and limit the results
    const limit = Math.min(amount, related.length);
    const shuffledRelated = [...related].sort(() => 0.5 - Math.random());

    return shuffledRelated.slice(0, limit);
  };

  
  return (
    <ProductsContext.Provider value={{ products, loadProductsByBrand, loadAllProducts, getRandomProducts, relatedProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};