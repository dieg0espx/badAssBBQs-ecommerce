import React, { useState } from 'react';

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center border border-gray-300 rounded-md h-12 pl-3 pr-2">
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-12 text-center outline-none appearance-none px-2 h-full text-[23px]"
          min="1"
        />
        <div className="flex flex-col">
          <button onClick={increaseQuantity} className="px-1 hover:bg-gray-200 h-[50%] leading-none">
            ▲
          </button>
          <button onClick={decreaseQuantity} className="px-1 hover:bg-gray-200 h-[50%] leading-none">
            ▼
          </button>
        </div>
      </div>

      <button className="bg-red text-white px-4 py-2 rounded font-bold hover:bg-white hover:text-red border border-red h-12">
        ADD TO CART
      </button>
    </div>
  );
};

export default QuantitySelector;
