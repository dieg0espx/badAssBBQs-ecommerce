import React, { useEffect, useState } from 'react';
import { useProducts } from '../context/ProductsContext';
import placeholderImage from '../images/placeholder_image.jpg'
import { Link, useNavigate } from 'react-router-dom';


function SearchBar() {
  const { loadAllProducts } = useProducts();
  const [products, setProducts] = useState([]);
  const [showList, setShowList] = useState(false);
  const [finding, setFinding] = useState('')
  const [results, setResults] = useState([])
  const navigate = useNavigate(); // React Router hook for navigation


  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await loadAllProducts();
      setProducts(allProducts);
    };
    fetchProducts();
  }, []); 

  useEffect(() => {
    if (finding !== '') {
      setShowList(true);
      // const filteredProducts = products.filter(product =>
      //   product.Title.toLowerCase().includes(finding.toLowerCase())
      // );
      const filteredProducts = products.filter(product => {
        const keywords = finding.toLowerCase().split(' ').filter(word => word); // Split the search input into words
        return keywords.every(keyword => product.Title.toLowerCase().includes(keyword)); // Check if all keywords are present
      });
      
      setResults(filteredProducts)
      // console.log("Filtered Products:", filteredProducts); // Print filtered products in the console
    } else {
      setShowList(false);
    }
  }, [finding, products]);

  const handleClick = (brand, id) => {
    window.location.href = `/product/${brand}-${id}`
  }

  useEffect(() => {
    const handleScroll = () => {
      if (showList) {
        setShowList(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showList]);


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      navigate(`/finding/${finding}`); // Navigate to the finding page
      setShowList(false); // Close the dropdown
    }
  }



  return (
    <div className='w-[90%] xl:min-w-full'>
      <input
        className={`border border-gray-200 w-full px-[10px] py-[8px] rounded outline-none ${showList ? 'border-b-0 rounded-b-none' : ''}`}
        type="text"
        placeholder="Search in BadAssBBQS"
        onChange={(e)=>setFinding(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Link to={`/finding/${finding}`} >
        <i className="bi bi-search -ml-10" onClick={()=>setShowList(false)}></i>
      </Link>
      {showList && (
        <div className='fixed bg-white w-[90%] xl:max-w-[485px] border border-gray-200 max-h-[300px] rounded-b border-t-0 overflow-y-scroll'>
         {results.map((result, index) => (
            <div key={index} className='grid grid-cols-[50px_auto_10px] gap-[20px] p-[10px] border-t border-gray-200 items-center align-center text-gray-500 hover:text-red' onClick={()=>handleClick(result.brand, result.Id)}>
                <img 
                  src={result.Image}  
                  loading="lazy" 
                  className='w-[50px] h-[50px]' 
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop in case placeholder also fails
                    e.target.src = placeholderImage
                  }}
                />
                <p> {result.Title} </p>
                <i class="bi bi-chevron-compact-right"></i> 
            </div>
         ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
