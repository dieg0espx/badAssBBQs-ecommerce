import React, { useEffect, useState } from 'react'
import { useProducts } from "../../context/ProductsContext"
import VariantsDropdowns from '../VaraiantsDropdowns';

function Delta({ product }) {
    // Extracting necessary functions from context
    const { loadProductsByBrand, getDifferentSpecifications, goToVariation } = useProducts();
    
    // State variables
    const [products, setProducts] = useState([]); // Stores all products of the 'alfresco' brand
    const [dropdowns, setDropdowns] = useState(); // Stores dropdown options for variations
    const [allVariations, setAllVariations] = useState([]); // Stores all variations of the current product
    const [currently, setCurrently] = useState([]); // Stores the currently selected specifications

    // Effect to load products of the brand on mount
    useEffect(() => {
        console.log(product);
        getBrandProducts(); // Fetch all products from 'alfresco'
    }, []);

    // Effect to find variations after products are loaded
    useEffect(() => {
        if (products.length > 0) {
            findVariations(); // Runs only when products are available
        }
    }, [products]); 

    // Fetch all products of brand 'alfresco'
    const getBrandProducts = async () => {
        let productList = await loadProductsByBrand(product.brand);
        console.log(productList);
        setProducts(productList); // Store fetched products in state
    }

    // Find product variations based on the current product model
    const findVariations = async () => {
        let allVariations = [];

        if (!product || !product.Model) {
            console.error("Product or Model is undefined");
            return;
        }

        // Extracts the first two parts of the model code to find related models
        const modelParts = product.Model.split("-");
        const baseModel = modelParts[0]

        // Filters products that start with the same base model
        const variations = products
            .filter((item) => item.Model && item.Model.startsWith(baseModel))
            .map((item) => item.Model);
        console.log(variations);
        

        // Get differences in specifications between current product and variations
        for (let i = 0; i < variations.length; i++) {
            if (product.Model === variations[i]) continue; // Skip the same model
            allVariations.push(await getDifferentSpecifications(product.brand, product.Model, variations[i]));
        }

        console.log(allVariations);
        
        setAllVariations(allVariations); // Store variations in state
        organizeDropdownData(allVariations); // Organize dropdown options
    };

    // Organizes variations into dropdown options
    const organizeDropdownData = (variations) => {
        let dropdowns = {};

        // Loops through each variation and extracts unique specification options
        variations.forEach((variation) => {
            Object.keys(variation).forEach((key) => {
                if (key !== "model") {
                    const specName = variation[key].newSpecification;
                    const specValue = variation[key].newValue;

                    if (!dropdowns[specName]) {
                        dropdowns[specName] = new Set(); // Uses Set to store unique values
                    }
                    dropdowns[specName].add(specValue);
                }
            });
        });

        // Convert sets to arrays for dropdown selection
        Object.keys(dropdowns).forEach((key) => {
            dropdowns[key] = Array.from(dropdowns[key]).sort();
        });

        setDropdowns(dropdowns);
        return dropdowns;
    };

    // Handles selection of a variation from dropdown
    const selectedVariation = (spec, value) => {
        let found = false
        setCurrently((prevCurrently) => {
            // Update the currently selected specifications
            const updatedCurrently = prevCurrently.map((item) =>
                item.spec === spec ? { ...item, value } : item
            );

            // Loop through all variations to find a matching product
            for (let a = 0; a < allVariations.length; a++) {
                let checkingModel = allVariations[a].model;

                for (let i = 0; i < products.length; i++) {
                    if (products[i].Model === checkingModel) {
                        // Check if all selected specifications match the product's specifications
                        const allMatch = updatedCurrently.every((currentSpec) => {
                            const productSpecObj = products[i].Specifications.find(
                                (s) => Object.keys(s)[0] === currentSpec.spec
                            );
                            return productSpecObj && Object.values(productSpecObj)[0] === currentSpec.value;
                        });

                        if (allMatch) {
                            console.log("Matching Model:", products[i].Model);
                            found = true
                            goToVariation(product.brand, products[i].Model); // Navigate to new variation
                            break;
                        }
                    }
                }
            }
            if (!found) {
                alert("Configuration Not Available, Try different options.");
                // Instead of reloading the page, reset to the original product specs
                setCurrently(
                    Object.keys(dropdowns).map((specName) => {
                        const currentSpecObj = product.Specifications.find(
                            (spec) => Object.keys(spec)[0] === specName
                        );
                        return {
                            spec: specName,
                            value: currentSpecObj ? Object.values(currentSpecObj)[0] : "N/A",
                        };
                    })
                );
            }
            return updatedCurrently; // Ensure state updates correctly
        });
    };

    // Effect to initialize currently selected specifications based on dropdowns and product specifications
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

    // Logs the currently selected specifications when they change
    useEffect(() => {
        console.log("Current Selections:", currently);
    }, [currently]);

    return (
        <VariantsDropdowns 
         dropdowns={dropdowns}
         product={product}
         selectedVariation={selectedVariation}
        />
    )
}

export default Delta