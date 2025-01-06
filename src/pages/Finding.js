import React, { useEffect, useState } from 'react';
import { useProducts } from '../context/ProductsContext';
import placeholderImage from '../images/placeholder_image.jpg'
import { useParams } from 'react-router-dom';
import ProductMiniature from '../components/ProductMiniature';

function Finding() {
  const { search } = useParams(); // Extract the route parameter
  const [products, setProducts] = useState([]);
  const [showList, setShowList] = useState(false);
  const [results, setResults] = useState([]);
  const { loadAllProducts } = useProducts();


  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await loadAllProducts();
      setProducts(allProducts);
    };
    fetchProducts();
  }, []); 

  useEffect(() => {
    if (search !== '') {
      setShowList(true);
      const filteredProducts = products.filter(product => {
        const keywords = search.toLowerCase().split(' ').filter(word => word); // Split the search input into words
        return keywords.every(keyword => product.Title.toLowerCase().includes(keyword)); // Check if all keywords are present
      });
      
      setResults(filteredProducts)
      console.log("Filtered Products:", filteredProducts); // Print filtered products in the console
    } else {
      setShowList(false);
    }
  }, [search, products]);



  return (
    <div className='p-4'>
        <h2 className='text-[30px] my-[30px]'> <b>Showing Results:</b> {search}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"> 
          {results.map((product, index) => (
            <ProductMiniature key={index} product={product} />
          ))}
        </div>
    </div>
  );
}

export default Finding;
