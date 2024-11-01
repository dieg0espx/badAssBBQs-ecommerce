// src/pages/ProductDetails.js

import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext'; // Import the custom hook
import { formatCurrency, formatPrice, toCamelCase } from '../Utils/Helpers'; // Assuming this is your formatting function
import ProductImagesContainer from '../components/ProductImagesContainer';
import Footer from '../components/Footer';
import AddToCartQuantity from '../components/AddToCartQuantity';
import Categories from '../components/Categories';

const ProductDetails = () => {
  const { loadAllProducts } = useProducts();
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
 

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await loadAllProducts(); // Load all products from context
      setProducts(allProducts);
    };
    fetchProducts();
  }, [loadAllProducts]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Empty dependency array to run only on mount

  const product = products.find((item) => `${item.brand}-${item.Id}` === id);
  console.log(product);
  


  if (!product) {
    return <p className="text-red-500">Product not found.</p>;
  }

  // Function to format specifications into a list
  const formatSpecifications = (specString) => {
    return specString.split(';').map((spec) => {
      const [name, value] = spec.split(':').map((s) => s.trim());
      return { name, value };
    }).filter(spec => spec.name && spec.value); // Filter out any empty specifications
  };


  return (
    <div className="p-6 max-w-6xl mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10 pl-0 space-x-5">
          {/* Left Side - Product Image */}
          <div className="block justify-center items-start ">
            <Categories categories={product.Category} />
            <ProductImagesContainer Image={product.Image} Other_image={product.Other_image} />
          </div>    
          {/* Right Side - Product Information */}
          <div className="flex flex-col justify-between mt-10">
            <div>
              <div className="flex items-center">
                <p className="text-md text-gray-600 mr-2">ID: {product.Id}</p> 
                <span>|</span>
                <p className="text-md ml-2">Model: {product.Model}</p>
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.Title}</h1>
              <p className='mb-5 underline'> {toCamelCase(product.brand)} </p>
              
              <p className="text-[15px] font-light text-gray-500 line-through -mb-2">
                {formatCurrency(product.Price*1.02)}
              </p>

              <p className="text-[30px] font-semibold text-black mb-4">
                {formatCurrency(product.Price)}
              </p>

              <p className='font-bold'> In Stock </p>
              <p className='text-gray-500 mb-5'> This item leaves our warehouse within 24 Hours </p>
              <AddToCartQuantity quantity={quantity} setQuantity={setQuantity} />

            </div>
          </div>
        </div>

        <hr></hr>

     {/* Product Description - Below the Grid */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-5">Description</h2>
          <p className="text-gray-700 mt-0">
            {product.Description.split('Legal disclaimers and warnings').map((part, index) => (
              <React.Fragment key={index}>
                {part}
                {index < product.Description.split('Legal disclaimers and warnings').length - 1 && (
                  <>
                    <h2 className="text-lg font-semibold mt-5 mb-5">Legal disclaimers and warnings</h2>
                  </>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>
        
       
        <div className="mt-6">
          <h2 className="text-lg font-semibold mt-5 mb-5">Specifications</h2>
          <table className="min-w-full border-collapse border border-gray-300">
            <tbody>
              {product.Specifications
                // Filter out empty or "Details" specifications
                .filter(spec => {
                  const [name] = Object.entries(spec)[0];
                  return name && name !== "Details";
                })
                // Group every 2 specifications into a single row
                .reduce((rows, spec, index, filteredSpecs) => {
                  if (index % 2 === 0) {
                    rows.push(filteredSpecs.slice(index, index + 2));
                  }
                  return rows;
                }, [])
                // Map each row to a table row
                .map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((spec, cellIndex) => {
                      const [name, value] = Object.entries(spec)[0];
                      return (
                        <React.Fragment key={cellIndex}>
                          <td className="border border-gray-300 p-2 font-semibold">{name}</td>
                          <td className="border border-gray-300 p-2">{value}</td>
                        </React.Fragment>
                      );
                    })}
                    {/* If the last row has only 1 key-value pair, add empty cells to fill the row */}
                    {row.length < 2 && (
                      <React.Fragment>
                        <td className="border border-gray-300 p-2"></td>
                        <td className="border border-gray-300 p-2"></td>
                      </React.Fragment>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>



    </div>
  );
};

export default ProductDetails;
