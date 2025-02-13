import React, { createContext, useContext, useEffect, useState } from 'react';

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
    'breeo',
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

      return sortedProducts
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

  // Function to search for products by keywords in their names
  const searchProductsByName = async (query, maxResults = 5) => {
    const allProducts = await loadAllProducts();
    const keywords = query.toLowerCase().split(' ');

    return allProducts
      .map((product) => {
        const name = product.Title.toLowerCase();

        // Calculate score based on keyword matches
        let score = 0;
        keywords.forEach((keyword) => {
          if (name === keyword) {
            score += 5; // Exact match
          } else if (name.includes(keyword)) {
            score += 3; // Partial match
          }
        });

        return { ...product, score };
      })
      .filter((product) => product.score > 0) // Only include products with a score > 0
      .sort((a, b) => b.score - a.score) // Sort by highest score
      .slice(0, maxResults); // Limit results
  };

  const getProductUrl = async (brand, model) => {
    console.log('Getting Product URL...');
  
    let productList = products;
  
    if (!productList.length) {
      console.warn('Products array is empty. Loading all products...');
      productList = await loadAllProducts();
    }

    const product = productList.find(
      (p) => p.Model?.toLowerCase() === model.toLowerCase() && p.brand?.toLowerCase() === brand.toLowerCase()
    );
  
    if (product) {
      return `/product/${brand}-${product.Id}`;
    } else {
      console.warn(`Product with model "${model}" not found for brand "${brand}"`);
      return null;
    }
  };

  const getDifferentSpecifications = async (brand, currentModel, newModel) => {
    let productList = await loadProductsByBrand(brand);
  
    // Find products by Model
    const currentProduct = productList.find((item) => item.Model === currentModel);
    const newProduct = productList.find((item) => item.Model === newModel);
  
    if (!currentProduct || !newProduct) {
      console.error("One or both products not found.");
      return null;
    }
  
    let data = { model: newModel };
  
    // Convert Specifications array into an object for easier lookup
    const convertSpecsArrayToObject = (specArray) => {
      return specArray.reduce((acc, spec) => {
        const key = Object.keys(spec)[0]; // Get the first key in each object
        const value = spec[key];
        if (key) acc[key] = value;
        return acc;
      }, {});
    };
  
    const currentSpecs = convertSpecsArrayToObject(currentProduct.Specifications || []);
    const newSpecs = convertSpecsArrayToObject(newProduct.Specifications || []);
  
    // Compare Specifications
    Object.keys(currentSpecs).forEach((specKey) => {
      if (currentSpecs[specKey] !== newSpecs[specKey]) {
        
        // Skip specific specs that should not be compared
        const excludedSpecs = [
          "Hose Included",
           "Main Grilling Area",
           "Made In USA",
           "Collection",
           "Height",
           "Depth",
           "Weight",
           "Width", 
           "Includes Paper Towel Holder",
           "BTU",
           "Cooking Grate Material",
           "Rotisserie Burner BTUs",
           "Side Burner",
           "Pizza Count",
           "Cooking Grid Dimensions",
           "Opening Width",
           "Total Grilling Area",
           "Exterior Material",
           "Grill Model",
           "Grill Type",
           
        ];
        if (excludedSpecs.includes(specKey)) return;
        
        if(!newSpecs[specKey]) return
        
        data[specKey] = { 
          newSpecification: specKey, 
          newValue: newSpecs[specKey] || "N/A" 
        };
      }
    });
    
    return data;
  };
  
  const goToVariation = async(brand, model) => {
    const productUrl = await getProductUrl(brand, model);
    window.location.href = productUrl
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
        analyzeProductsByModel, 
        searchProductsByName, 
        getProductUrl, 
        getDifferentSpecifications,
        goToVariation, 
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
