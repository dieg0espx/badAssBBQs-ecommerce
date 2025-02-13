import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { formatCurrency, maxString } from '../Utils/Helpers';
import { useCart } from '../context/CartContext'; // Import useCart for cart functions
import placeholderImage from '../images/placeholder_image.jpg'

function ProductMiniature({ product, short }) {
  const navigate = useNavigate(); // Initialize useNavigate to navigate
  const { addToCart } = useCart(); // Access addToCart from CartContext

  const handleTitleClick = () => {
    navigate(`/product/${product.brand}-${product.Id}`); // Redirect to product details page
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 }); // Add product with a default quantity of 1
  };


  return (
    <div
      className="border px-[3px] py-[8px] xl:px-[5px] xl:py-[10px] min-w-[173px] flex flex-col justify-between h-[390px] hover:border-red"
      onClick={handleTitleClick}
    >
      <img
        src={product.Image}
        alt={product.Title}
        loading="lazy"
        className="w-[80%] md:w-full mx-auto h-40 xl:h-32 object-contain mb-2 "
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop in case placeholder also fails
          e.target.src = placeholderImage
        }}
      />
      <p
        className="text-[13px] xl:text-[15px] font-semibold text-center mb-1 cursor-pointer hover:text-red w-[90%] md:w-[95%] mx-auto 
                  overflow-hidden text-ellipsis line-clamp-2"
        onClick={handleTitleClick}
      >
        {product.Title}
      </p>


      <div className="flex flex-col-reverse xl:flex-row justify-center items-center xl:items-start w-[90%] mx-auto">
        <p className="text-black text-center text-[20px] mt-auto font-[600] mx-auto ">
          {formatCurrency(product.Price)}
        </p>
        <p className="text-gray-600 text-center mt-[3px] line-through mx-auto text-[12px]">
          {formatCurrency(product.Price * 1.12)}
        </p>
      </div>

      <p className="affirm-as-low-as text-[12px] w-[90%] mx-auto text-center" data-page-type="product" data-amount={product.Price*100}></p>
    
      <div className="px-2" style={{ display: short ? 'none' : 'block' }}>
        <p className="text-[15px] text-green-800  font-medium">
          {product.Price > 49 ? 'Free Shipping' : ''}
        </p>
        <p className="text-[12px] text-gray-500"> Leaves Warehouse: </p>
        <p className="text-[12px] -mt-1 text-gray-500"> 24 Hrs </p>
      </div>
      <button
        className="bg-red text-[12px] text-white py-1 mt-4 rounded font-bold border-2 border-transparent hover:bg-white hover:text-red hover:border-red w-[90%] mx-auto xl:w-full"
        style={{ display: short ? 'none' : 'block' }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the handleTitleClick when clicking the button
          handleAddToCart();
        }}
      >
        ADD TO CART
      </button>
    </div>
  );
}

export default ProductMiniature;
