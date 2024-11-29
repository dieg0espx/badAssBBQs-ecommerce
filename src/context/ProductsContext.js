// import React, { createContext, useContext, useState } from 'react';

// // Create context
// const ProductsContext = createContext();

// // Custom hook to use the ProductsContext
// export const useProducts = () => {
//   return useContext(ProductsContext);
// };

// // ProductsProvider component
// export const ProductsProvider = ({ children }) => {
//   const listOfBrands = [
//     'alfresco',
//     'american_made_grills',
//     'aog',
//     'artisan',
//     'blackstone',
//     'blaze',
//     'bromic_heating',
//     'coyote',
//     'delta',
//     'fire_magic',
//     'fontana',
//     'green_mountain',
//     'napoleon',
//     'american_fyre_design', 
//     'the_outdoor_plus',
//     'twin_eagles', 
//     'primo',
//     'summerset',
//     'ledge_lounger',
//     'mont_alpi'
//   ];

//   const [products, setProducts] = useState([]);

//   // Function to load products for a specific brand
//   const loadProductsByBrand = async (brandName) => {
//     try {
//       const uniqueIds = new Set(); // Set to track unique product IDs
//       const productsData = await import(`../data/${brandName}.json`);
  
//       const uniqueProducts = productsData.default.filter((product) => {
//         if (!uniqueIds.has(product.Id)) {
//           uniqueIds.add(product.Id); // Add ID to the set
//           return true; // Keep the product
//         }
//         return false; // Skip duplicate product
//       });
  
//       const sortedProducts = uniqueProducts.sort((a, b) => a.Id - b.Id);
//       setProducts(sortedProducts);
//     } catch (error) {
//       console.error(`Could not load products for brand ${brandName}:`, error);
//     }
//   };
  

//   const loadAllProducts = async () => {
//     const allProducts = [];
//     const uniqueIds = new Set(); // Set to track unique product IDs
  
//     for (const brand of listOfBrands) {
//       try {
//         const productsData = await import(`../data/${brand}.json`);
//         for (const product of productsData.default) {
//           if (!uniqueIds.has(product.Id)) {
//             uniqueIds.add(product.Id); // Add ID to the set
//             allProducts.push(product); // Add product to the array
//           }
//         }
//       } catch (error) {
//         console.error(`Could not load products for brand ${brand}:`, error);
//       }
//     }
  
//     // Sort the products by ID
//     return allProducts.sort((a, b) => a.Id - b.Id);
//   };
  
  


//   const getRandomProducts = async (num) => {
//     const allProducts = await loadAllProducts(); // Get all products directly
  
//     // Group products by brand
//     const productsByBrand = allProducts.reduce((acc, product) => {
//       if (!acc[product.brand]) {
//         acc[product.brand] = [];
//       }
//       acc[product.brand].push(product);
//       return acc;
//     }, {});
  
//     // Select one random product per brand
//     const oneProductPerBrand = Object.values(productsByBrand).map(products => {
//       return products[Math.floor(Math.random() * products.length)];
//     });
  
//     // Limit the selection to the desired number of products
//     const limit = Math.min(num, oneProductPerBrand.length);
//     const selectedProducts = oneProductPerBrand.sort(() => 0.5 - Math.random()).slice(0, limit);
  
//     return selectedProducts;
//   };
  

  

//    // Function to get related products based on categories
//    const relatedProducts = async (category, amount) => {
//     const allProducts = await loadAllProducts(); // Load all products
//     const filteredCategory = category.filter(cat => cat !== "Home"); // Exclude "Home" from categories

//     const related = allProducts.filter(product =>
//       product.Category.some(cat => filteredCategory.includes(cat) && cat !== "Home")
//     );

//     // Shuffle and limit the results
//     const limit = Math.min(amount, related.length);
//     const shuffledRelated = [...related].sort(() => 0.5 - Math.random());

//     return shuffledRelated.slice(0, limit);
//   };

//   const getBrands = () => {
//     return listOfBrands;
//   };

  
//   return (
//     <ProductsContext.Provider value={{ products, loadProductsByBrand, loadAllProducts, getRandomProducts, relatedProducts, getBrands }}>
//       {children}
//     </ProductsContext.Provider>
//   );
// };


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
    'the_outdoor_plus',
    'twin_eagles',
    'primo',
    'summerset',
    'ledge_lounger',
    'mont_alpi',
  ];

  const [products, setProducts] = useState([]);

  // Function to load products for a specific brand
  const loadProductsByBrand = async (brandName) => {
    try {
      const uniqueIds = new Set();
      const productsData = await import(`../data/${brandName}.json`);

      const uniqueProducts = productsData.default.filter((product) => {
        if (!uniqueIds.has(product.Id)) {
          uniqueIds.add(product.Id);
          return true;
        }
        return false;
      });

      const sortedProducts = uniqueProducts.sort((a, b) => a.Id - b.Id);
      setProducts(sortedProducts);
    } catch (error) {
      console.error(`Could not load products for brand ${brandName}:`, error);
    }
  };

  const loadAllProducts = async () => {
    const allProducts = [];
    const uniqueIds = new Set();

    for (const brand of listOfBrands) {
      try {
        const productsData = await import(`../data/${brand}.json`);
        for (const product of productsData.default) {
          if (!uniqueIds.has(product.Id)) {
            uniqueIds.add(product.Id);
            allProducts.push(product);
          }
        }
      } catch (error) {
        console.error(`Could not load products for brand ${brand}:`, error);
      }
    }

    return allProducts.sort((a, b) => a.Id - b.Id);
  };

  // Function to analyze and group products by their base model
  const analyzeProductsByModel = async (brandName, currentModel) => {
    try {
      const productsData = await import(`../data/${brandName}.json`);
      const baseModel = currentModel.split('-')[0]; // Extract base model from the current model
  
      // Group products by base model
      const groupedByModel = productsData.default.reduce((acc, product) => {
        const productBaseModel = product.Model?.split('-')[0];
        if (productBaseModel) {
          if (!acc[productBaseModel]) {
            acc[productBaseModel] = [];
          }
          acc[productBaseModel].push(product);
        }
        return acc;
      }, {});
  
      // Get similar products for the base model
      const similarProducts = groupedByModel[baseModel] || [];
  
      console.log(`Similar Products for model ${currentModel} in brand ${brandName}:`, similarProducts);
  
      return similarProducts; // Return similar products for the base model
    } catch (error) {
      console.error(`Could not analyze products for brand ${brandName}:`, error);
      return [];
    }
  };
  
  

  const getRandomProducts = async (num) => {
    const allProducts = await loadAllProducts();

    const productsByBrand = allProducts.reduce((acc, product) => {
      if (!acc[product.brand]) {
        acc[product.brand] = [];
      }
      acc[product.brand].push(product);
      return acc;
    }, {});

    const oneProductPerBrand = Object.values(productsByBrand).map((products) =>
      products[Math.floor(Math.random() * products.length)]
    );

    const limit = Math.min(num, oneProductPerBrand.length);
    return oneProductPerBrand.sort(() => 0.5 - Math.random()).slice(0, limit);
  };

  const relatedProducts = async (category, amount) => {
    const allProducts = await loadAllProducts();
    const filteredCategory = category.filter((cat) => cat !== 'Home');

    const related = allProducts.filter((product) =>
      product.Category.some((cat) => filteredCategory.includes(cat) && cat !== 'Home')
    );

    const limit = Math.min(amount, related.length);
    return [...related].sort(() => 0.5 - Math.random()).slice(0, limit);
  };

  const getBrands = () => {
    return listOfBrands;
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProductsByBrand,
        loadAllProducts,
        getRandomProducts,
        relatedProducts,
        getBrands,
        analyzeProductsByModel, // Add this function to the context
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
