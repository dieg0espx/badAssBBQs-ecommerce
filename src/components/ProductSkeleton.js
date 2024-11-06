// ProductSkeleton.js
import React from 'react';

function ProductSkeleton() {
  return (
    <div className="border px-4 py-6 min-w-[180px] h-full animate-pulse flex flex-col items-center">
      <div className="w-full h-32 bg-gray-300 mb-2 rounded"></div>
      <div className="w-3/4 h-4 bg-gray-300 mb-2 rounded"></div>
      <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
    </div>
  );
}

export default ProductSkeleton;
