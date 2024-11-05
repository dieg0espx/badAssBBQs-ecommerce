import React, { useState } from 'react';

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="flex items-center gap-[10px] w-full xl:w-[80%]">
    {/* Quantity Selector */}
    <div className="flex items-center border border-gray-300 rounded-md h-12 pl-3 pr-2 basis-[30%] justify-between">
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
        className="w-12 text-center outline-none appearance-none px-2 h-full text-[23px]"
        min="1"
      />
      <div className="flex flex-col ">
        <button onClick={increaseQuantity} className="px-1 hover:bg-gray-200 h-full leading-none">
          ▲
        </button>
        <button onClick={decreaseQuantity} className="px-1 hover:bg-gray-200 h-full leading-none">
          ▼
        </button>
      </div>
    </div>
  
    {/* Add to Cart Button */}
    <button className="bg-red text-white px-4 py-2 rounded font-bold hover:bg-white hover:text-red border border-red h-12 basis-[70%]">
      ADD TO CART
    </button>
  </div>
  
  );
};

export default QuantitySelector;
