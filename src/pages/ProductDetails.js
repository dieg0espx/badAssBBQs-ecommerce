// src/pages/ProductDetails.js

import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext'; // Import the custom hook
import { formatPrice } from '../Utils/Helpers'; // Assuming this is your formatting function
import ProductImagesContainer from '../components/ProductImagesContainer';
import Footer from '../components/Footer';

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useProducts(); // Get products from context
  const product = products.find((item) => item.Id === parseInt(id)); // Find the product by ID

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Empty dependency array to run only on mount


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

  const specifications = formatSpecifications(product.Specifications);

  return (
    <div className="p-6 max-w-6xl mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10 pl-0">
          {/* Left Side - Product Image */}
          <div className="flex justify-center items-start">
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
              
              <p className="text-lg font-semibold text-green-600 mb-4">
                {formatPrice(product.Price)}
              </p>
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
        
        {/* Specifications - As a Table */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mt-5 mb-5"> Specifications </h2>
          <table className="min-w-full border-collapse border border-gray-300">
            <tbody>
              {specifications.map((spec, index) => {
                // Create a row for every two specifications
                if (index % 4 === 0) {
                  return (
                    <tr key={index}>
                      <td className="border border-gray-300 p-2 font-semibold">{spec.name}</td>
                      <td className="border border-gray-300 p-2">{spec.value}</td>
                      {specifications[index + 1] && (
                        <>
                          <td className="border border-gray-300 p-2 font-semibold">{specifications[index + 1].name}</td>
                          <td className="border border-gray-300 p-2">{specifications[index + 1].value}</td>
                        </>
                      )}
                    </tr>
                  );
                }
                return null; 
              })}
            </tbody>
          </table>
        </div>
    </div>
  );
};

export default ProductDetails;
