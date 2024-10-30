import React, { useEffect, useState } from 'react';
import productsData from '../data/products.json';
import ProductMiniature from '../components/ProductMiniature';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Set the products state with the imported data
    setProducts(productsData);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Product List</h2>
      <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"> {/* Set to 1, 2, or 3 columns based on screen size */}
        {products.map((product, index) => (
          <ProductMiniature key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
