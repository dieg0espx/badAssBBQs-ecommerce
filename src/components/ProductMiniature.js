import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { formatCurrency, formatPrice, maxString } from '../Utils/Helpers';

function ProductMiniature({ product, short }) {
  const navigate = useNavigate(); // Initialize useNavigate to navigate

  const handleTitleClick = () => {
    navigate(`/product/${product.brand}-${product.Id}`); // Redirect to product details page
  };

  return (
    <div className="border p-4 min-w-[200px] flex flex-col justify-between h-full hover:border-red" onClick={handleTitleClick} >
      <img
        src={product.Image}
        alt={product.Title}
        className="w-full h-40 xl:h-32 object-contain mb-2"
      /> 
      <p 
        className="text-md font-semibold text-center mb-1 cursor-pointer hover:text-red max-h-[50px] overflow-hidden text-ellipsis " 
        onClick={handleTitleClick} 
      >
        {maxString(product.Title, 50)}
      </p>

      <div className='flex justify-center items-start space-x-1'>
        <p className="text-black text-center text-[20px] mt-auto font-[600]">
         {formatCurrency(product.Price)}
        </p>
        <p className="text-gray-600 text-center mt-[3px] text-decoration-line: line-through text-[12px]">
         {formatCurrency(product.Price*1.12)}
        </p>
      </div>



      <div className='px-2' style={{display: short ? 'none':'block'}}>
        <p className='text-green-800 mt-3 font-medium h-[25px]'> {product.Price > 49 ? 'Free Shipping':''} </p>
        <p className='text-gray-500'> Leaves Warehouse: </p>
        <p className='-mt-1 text-gray-500'> 24 Hrs </p>
      </div>
      <button className="bg-red text-[12px] text-white py-1 mt-4 rounded font-bold border-2 border-transparent hover:bg-white hover:text-red hover:border-red"  style={{display: short ? 'none':'block'}}> ADD TO CART </button>

    </div>
  );
}

export default ProductMiniature;
