import React, { useEffect, useState } from 'react'
import { toCamelCase, formatCurrency, getAlfrescoVariantDefinition } from "../../Utils/Helpers";
import { useProducts } from "../../context/ProductsContext"


function Alfresco({product}) {
    const { loadAllProducts, relatedProducts, analyzeProductsByModel, loadProductsByBrand, getDifferentSpecifications, goToVariation } = useProducts();
    const [products, setProducts] = useState([])
    const [dropdowns, setDropdowns] = useState()
    const [allVariations, setAllVariations] = useState([])
    const [currently, setCurrently] = useState([]);


    useEffect(() => {
        console.log(product);
        getBrandProducts();
      }, []);
      
      useEffect(() => {
        if (products.length > 0) {
          findVariations();
        }
      }, [products]); // Now findVariations runs only after products are loaded
      

    const getBrandProducts = async() => {
        let productList = await loadProductsByBrand('alfresco')
        console.log('ALFRESCO PRODUCTS:');
        console.log(productList);
        setProducts(productList)
    }

    const findVariations = async() => {
      console.log('FINDING VARIATIONS .... ');
      
      let allVariations = [];

      if (!product || !product.Model ) {
        console.error("Product or Model is undefined");
        return;
      }
    
      // Extract the part of Model up to and including the second '-'
      const modelParts = product.Model.split("-");
      const baseModel = modelParts.length > 2 ? modelParts.slice(0, 2).join("-") + "-" : product.Model;
    
      const variations = products
        .filter((item) => item.Model && item.Model.startsWith(baseModel))
        .map((item) => item.Model);

      for(let i = 0 ; i < variations.length; i++){
        if(product.Model == variations[i]) {continue}
        allVariations.push(await getDifferentSpecifications(product.brand, product.Model, variations[i]))
      }

      
      console.log(allVariations);
      setAllVariations(allVariations)
      organizeDropdownData((allVariations))
    };

    const organizeDropdownData = (variations) => {
      let dropdowns = {};
    
      variations.forEach((variation) => {
        Object.keys(variation).forEach((key) => {
          if (key !== "model") {
            // Extract specification name and value
            const specName = variation[key].newSpecification;
            const specValue = variation[key].newValue;
    
            if (!dropdowns[specName]) {
              dropdowns[specName] = new Set(); // Use Set to store unique values
            }
            dropdowns[specName].add(specValue);
          }
        });
      });
    
      // Convert sets to arrays for dropdown options
      Object.keys(dropdowns).forEach((key) => {
        dropdowns[key] = Array.from(dropdowns[key]).sort();
      });
      setDropdowns(dropdowns)
      return dropdowns;
    };

    const selectedVariation = (spec, value) => {
      // Step 1: Update `currently` state and immediately use updated value
      setCurrently((prevCurrently) => {
        const updatedCurrently = prevCurrently.map((item) =>
          item.spec === spec ? { ...item, value } : item
        );
    
        // Step 2: Loop through all variations to find the matching product
        for (let a = 0; a < allVariations.length; a++) {
          let checkingModel = allVariations[a].model;
    
          for (let i = 0; i < products.length; i++) {
            if (products[i].Model === checkingModel) {
              
              // Check if ALL currently selected specifications match the product
              const allMatch = updatedCurrently.every((currentSpec) => {
                // Find the specification in the product
                const productSpecObj = products[i].Specifications.find(
                  (s) => Object.keys(s)[0] === currentSpec.spec
                );
                
                // Check if the product specification value matches the selected value
                return productSpecObj && Object.values(productSpecObj)[0] === currentSpec.value;
              });
    
              if (allMatch) {
                console.log("Matching Model:", products[i].Model);
                goToVariation(product.brand, products[i].Model)
                break; // Stop searching once a match is found
              }
            }
          }
        }
    
        return updatedCurrently; // Ensure state is correctly updated
      });
    };
      
    useEffect(() => {
      if (dropdowns && product?.Specifications) {
        const newCurrently = Object.keys(dropdowns).map((specName) => {
          const currentSpecObj = product.Specifications.find(spec => Object.keys(spec)[0] === specName);
          return {
            spec: specName,
            value: currentSpecObj ? Object.values(currentSpecObj)[0] : "N/A",
          };
        });

        setCurrently(newCurrently);
      }
    }, [dropdowns, product]);
    
    useEffect(() => {
      console.log("Current Selections:", currently);
    }, [currently]);

  return (
        <div className="mb-[30px] flex flex-col gap-[10px]">
            {dropdowns && Object.keys(dropdowns).map((specName) => {
              // Find the current value from product.Specifications array
              const currentSpecObj = product.Specifications.find(spec => Object.keys(spec)[0] === specName);
              const currentValue = currentSpecObj ? Object.values(currentSpecObj)[0] : "N/A"    
              return (
                <div key={specName}>
                  <p className="text-[12px] font-semibold ml-[5px] text-red">{specName}</p>
                  <select 
                    onChange={(e)=>selectedVariation(specName, e.target.value)}
                    className="border border-gray-100 w-[300px] p-[5px] rounded"
                  >
                    <option value={currentValue}>{currentValue}</option> {/* Current value as first option */}
                    {dropdowns[specName].map((value) => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                </div>
              );
            })}
        </div>
  )
}

export default Alfresco