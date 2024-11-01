import React, { useEffect, useState } from 'react';
import { useProducts } from '../context/ProductsContext';
import ProductMiniature from '../components/ProductMiniature';

function ProductList() {
  const { loadAllProducts } = useProducts();
  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 200;

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await loadAllProducts(); // Load all products from context
      console.log("Total products loaded:", allProducts.length); // Debug: Check total products loaded
      setProducts(allProducts);
    };
    fetchProducts();
  }, [loadAllProducts]);

  
  // Filter products based on the selected brand
  const filteredProducts = selectedBrand
    ? products.filter(product => product.brand === selectedBrand)
    : products;

  console.log("Total filtered products:", filteredProducts.length); // Debug: Check filtered products

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  console.log("Total pages:", totalPages); // Debug: Check total pages calculation

  // Get products for the current page
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    window.scrollTo({
      top: 0,
      behavior: 'auto', // Adds a smooth scroll effect
    });
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Product List</h2>
      
      {/* Dropdown to select a brand */}
      <select 
        value={selectedBrand}
        onChange={(e) => {
          setSelectedBrand(e.target.value);
          setCurrentPage(1); // Reset to first page when changing brand
        }}
        className="mb-4 p-2 border"
      >
        <option value="">All Brands</option>
        <option value="alfresco">Alfresco</option>
        <option value="american_made_grills">American Made Grills</option>
        <option value="aog">AOG</option>
        <option value="artisan">Artisan</option>
        <option value="blackstone">Blackstone</option>
        <option value="blaze">Blaze</option>
        <option value="bromic_heating">Bromic Heating</option>
        <option value="coyote">Coyote</option>
        <option value="delta">Delta</option>
        <option value="fire_magic">Fire Magic</option>
        <option value="fontana">Fontana</option>
        <option value="green_mountain">Green Mountain</option>
        <option value="napoleon">Napoleon</option>
      </select>

      {/* Display products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"> 
        {currentProducts.map((product, index) => (
          <ProductMiniature key={index} product={product} />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
