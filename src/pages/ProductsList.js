import React, { useEffect, useState, useMemo } from 'react';
import { useProducts } from '../context/ProductsContext';
import ProductMiniature from '../components/ProductMiniature';
import AskExpert from '../components/AsxExpert';
import { useParams, useNavigate } from 'react-router-dom';

function ProductList() {
  const { brand, category } = useParams(); // Retrieve brand and category from URL
  const navigate = useNavigate();
  const { loadAllProducts } = useProducts();
  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(brand === 'all' ? '' : brand || '');
  const [selectedCategory, setSelectedCategory] = useState(category === 'all' ? '' : category || '');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 100;

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await loadAllProducts();
      setProducts(allProducts);
    };
    fetchProducts();
  }, [brand, category]); // Add `category` as a dependency

  useEffect(() => {
    setSelectedBrand(brand === 'all' ? '' : brand || '');
    setSelectedCategory(category === 'all' ? '' : category || '');
    setCurrentPage(1); // Reset to the first page on brand or category change
  }, [brand, category]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, [selectedCategory, selectedBrand, currentPage]);

  // Filter products based on the selected brand and category
  const filteredProducts = products.filter(product => 
    (!selectedBrand || product.brand === selectedBrand) &&
    (!selectedCategory || selectedCategory === 'All Categories' || product.Category.includes(selectedCategory))
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
    
    const categoriesArray = Array.from(categorySet).map(cat => cat === 'Home' ? 'All Categories' : cat);
    return categoriesArray;
  }, [products, selectedBrand]);
  
  // Handle brand and category selection with URL update
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    navigate(`/products/${selectedBrand || 'all'}/${category === 'All Categories' ? 'all' : category}`);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    setSelectedCategory(''); // Reset category
    setCurrentPage(1);
    navigate(`/products/${brand || 'all'}/${selectedCategory || 'all'}`);
  };

  // Define handlePageChange function
  const handlePageChange = (pageNumber) => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
    setCurrentPage(pageNumber);
  };
  return (
    <div className="block xl:flex">
      {/* Sidebar for categories */}
      <div className="w-[250px] p-4 border-r hidden xl:block">
        <h3 className="text-md font-semibold mb-4">Categories</h3>
        <ul>
          {categories.sort((a, b) => a.localeCompare(b)).map((category, index) => (
            <li key={index}>
              <button 
                onClick={() => handleCategoryChange(category)}
                className={`block w-full text-left p-1 px-3 mb-2 text-[12px] ${selectedCategory === category ? 'bg-red text-white' : 'bg-gray-200'}`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
        <AskExpert />
      </div>

      {/* Main content area */}
      <div className="xl:w-3/4 p-4">
        <h2 className="text-xl font-bold mb-4">Product List</h2>
        

        <div className='flex'>
        {/* Dropdown to select a brand */}
        <select 
          value={selectedBrand}
          onChange={(e) => handleBrandChange(e.target.value)}
          className="mb-4 p-2 border w-[50%] md:w-auto bg-white rounded-none h-[40px]"
        >
          <option value="all">All Brands</option>
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
          <option value="american_fyre_design">American Fyre Design</option>
          <option value="breeo">Breeo</option>
          <option value="the_outdoor_plus">The Outdoor Plus</option>
          <option value="twin_eagles">Twin Eagles</option>

          <option value="primo">Primo</option>
          <option value="summerset">Summerset</option>
          <option value="ledge_lounger">Ledge Lounger</option>

        </select>

        {/* Dropdown to select a category */}
        <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)} className="mb-4 p-2 border block md:hidden w-[50%] bg-white rounded-none h-[40px]">
          {categories.sort((a, b) => a.localeCompare(b)).map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>


        </div>


        {/* Display products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"> 
          {currentProducts.map((product, index) => (
            <ProductMiniature key={index} product={product} />
          ))}
        </div>

        {/* Pagination controls */}
        <div className="w-full mt-10 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2 px-4 min-w-max justify-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 ${currentPage === index + 1 ? 'bg-red text-white' : 'bg-gray-200'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
