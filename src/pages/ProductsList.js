import React, { useEffect, useState, useMemo } from 'react';
import { useProducts } from '../context/ProductsContext';
import ProductMiniature from '../components/ProductMiniature';

function ProductList() {
  const { loadAllProducts } = useProducts();
  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 200;

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await loadAllProducts(); // Load all products from context
      setProducts(allProducts);
    };
    fetchProducts();
  }, [loadAllProducts]);

  // Filter products based on the selected brand and category
  const filteredProducts = products.filter(product => 
    (selectedBrand ? product.brand === selectedBrand : true) &&
    (selectedCategory ? product.Category.includes(selectedCategory) : true)
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Get products for the current page
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Get unique categories for the selected brand
  const categories = useMemo(() => {
    const brandProducts = products.filter(product => selectedBrand ? product.brand === selectedBrand : true);
    const categorySet = new Set();
    brandProducts.forEach(product => {
      product.Category.forEach(cat => categorySet.add(cat));
    });
    return Array.from(categorySet);
  }, [products, selectedBrand]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex">
      {/* Sidebar for categories */}
      <div className="w-1/4 p-4 border-r">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <ul>
          {categories.map((category, index) => (
            <li key={index}>
              <button 
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1); // Reset to first page when changing category
                }}
                className={`block w-full text-left p-2 mb-2 ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {category}
              </button>
            </li>
          ))}
          <li>
            <button 
              onClick={() => {
                setSelectedCategory('');
                setCurrentPage(1);
              }}
              className={`block w-full text-left p-2 mb-2 ${selectedCategory === '' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              All Categories
            </button>
          </li>
        </ul>
      </div>

      {/* Main content area */}
      <div className="w-3/4 p-4">
        <h2 className="text-xl font-bold mb-4">Product List</h2>
        
        {/* Dropdown to select a brand */}
        <select 
          value={selectedBrand}
          onChange={(e) => {
            setSelectedBrand(e.target.value);
            setSelectedCategory(''); // Reset category when changing brand
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
    </div>
  );
}

export default ProductList;
