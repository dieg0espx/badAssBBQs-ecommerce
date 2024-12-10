import React, { useState } from 'react';
import { useProducts } from '../context/ProductsContext';

function ProductSearch() {
  const { searchProductsByName } = useProducts();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const searchResults = await searchProductsByName(query);
    setResults(searchResults);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        className="border p-2 rounded"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded ml-2">
        Search
      </button>

      <ul className="mt-4">
        {results.map((product) => (
          <li key={product.Id} className="border-b py-2">
            {product.Title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductSearch;
