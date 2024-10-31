import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { formatPrice, maxString } from '../Utils/Helpers';

function ProductMiniature({ product }) {
  const navigate = useNavigate(); // Initialize useNavigate to navigate

  const handleTitleClick = () => {
    navigate(`/product/${product.Id}`); // Redirect to product details page
  };

  return (
    <div className="border p-4 min-w-[200px] flex flex-col justify-between h-full">
      <img
        src={product.Image}
        alt={product.Title}
        className="w-full h-32 object-contain mb-2"
      /> 
      <p 
        className="text-md font-semibold text-center mb-1 cursor-pointer hover:text-red" 
        onClick={handleTitleClick} // Add onClick handler
      >
        {maxString(product.Title, 50)}
      </p>
      <p className="text-gray-600 text-center text-2xl mt-auto">
        {formatPrice(product.Price)}
      </p>
    </div>
  );
}

export default ProductMiniature;
