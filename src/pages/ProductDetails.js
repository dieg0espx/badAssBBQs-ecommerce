import React, {useContext, useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import Slider from 'react-slick'; // Import the Slider component from react-slick
import { useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext'; // Import the custom hook\
import { formatCurrency, formatPrice, toCamelCase } from '../Utils/Helpers'; // Assuming this is your formatting function
import ProductImagesContainer from '../components/ProductImagesContainer';
import Footer from '../components/Footer';
import AddToCartQuantity from '../components/AddToCartQuantity';
import Categories from '../components/Categories';
import AskExpert from '../components/AsxExpert'
import ProductMiniature from '../components/ProductMiniature';
import ProductDescription from '../components/ProductDescription';
import Loader from '../components/Loader';


const ProductDetails = () => {
  const { loadAllProducts } = useProducts();
  const { relatedProducts } = useProducts();
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [listRelated, setListRelated] = useState([])

  const { analyzeProductsByModel } = useProducts();
  const [similarProducts, setSimilarProducts] = useState([]);
  const [specDifferences, setSpecDifferences] = useState([]);

 
  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await loadAllProducts(); // Load all products from context
      setProducts(allProducts);
    };
    fetchProducts();
  }, [loadAllProducts]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, [id]);
  // GETTING RELATED PRODUCTS
  const product = products.find((item) => `${item.brand}-${item.Id}` === id);
  useEffect(()=>{
    if(product){
      const fetchRelatedProducts = async () => {
        const category = product.Category.filter(cat => cat !== "Home").slice(-2);
        const amount = 15;
        const products = await relatedProducts(category, amount);
        setListRelated(products)
      };
      fetchRelatedProducts();
    }   
  },[product])



  useEffect(() => {
    if (product) {
      const fetchSimilarProducts = async () => {
        const similar = await analyzeProductsByModel(product.brand, product.Model);
        setSimilarProducts(similar);
      };
      fetchSimilarProducts();
    }
  }, [product, analyzeProductsByModel]);

  const analyzeSpecifications = (currentSpecs, similarSpecs) => {
    if (!currentSpecs || !similarSpecs) return [];
  
    const differences = [];
    const allKeys = new Set([...Object.keys(currentSpecs), ...Object.keys(similarSpecs)]);
  
    allKeys.forEach((key) => {
      const currentValue = currentSpecs[key] || 'N/A';
      const similarValue = similarSpecs[key] || 'N/A';
  
      // Only include differences where the current and similar values are different
      if (currentValue !== similarValue) {
        differences.push({
          spec: key,
          current: currentValue,
          similar: similarValue,
        });
      }
    });
  
    return differences;
  };
  
  

useEffect(() => {
  if (product && similarProducts.length > 0) {
    const filteredDifferences = similarProducts.map((similarProduct) =>
      analyzeSpecifications(product.Specifications, similarProduct.Specifications)
    );

    // Filter out any empty arrays from the differences
    const nonEmptyDifferences = filteredDifferences.filter((diff) => diff.length > 0);

    setSpecDifferences(nonEmptyDifferences);
    console.log("Filtered Differences:", nonEmptyDifferences);
  }
}, [product, similarProducts]);

useEffect(() => {
  if (specDifferences.length > 0) {
    console.log("Spec Differences:", specDifferences);
    const differenceObject = findDifferenceObject(specDifferences);
    console.log("First Difference Object:", differenceObject);
  }
}, [specDifferences]);


  
const findDifferenceObject = (array) => {
  // Iterate through the array to find the object with a difference
  for (let i = 0; i < array.length; i++) {
    const currentKeys = Object.keys(array[i].current).filter((key) => key.trim());
    const similarKeys = Object.keys(array[i].similar).filter((key) => key.trim());

    // Compare keys in current and similar
    for (let key of currentKeys) {
      if (similarKeys.includes(key) && array[i].current[key] !== array[i].similar[key]) {
        return array[i]; // Return the object containing the first difference
      }
    }
  }
  return null; // Return null if no differences are found
};







  if (!product) {
    return <Loader />;
  }

  // Function to format specifications into a list
  const formatSpecifications = (specString) => {
    return specString.split(';').map((spec) => {
      const [name, value] = spec.split(':').map((s) => s.trim());
      return { name, value };
    }).filter(spec => spec.name && spec.value); // Filter out any empty specifications
  };

  const settings = {
    dots: false, // Show dots for navigation
    infinite: true, // Infinite loop sliding
    speed: 500, // Slide speed
    slidesToShow: 5, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll on each navigation
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 3000, // Duration between slides
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Show 3 slides on medium screens
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Show 2 slides on smaller screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2, // Show 1 slide on extra small screens
          slidesToScroll: 1,
        },
      },
    ],
  };



  


  return (
    <div className="p-6 max-w-6xl mx-auto overflow-x-hidden">
        <Categories categories={product.Category} />
        
        <div className='block sm:hidden'>
          <p className="text-md text-gray-600 mr-2">ID: {product.Id}  <span>|</span> Model: {product.Model}</p> 
          <h1 className="text-[20px] font-bold mb-2 leading-6">{product.Title}</h1>
          <Link to={'/products/'+ product.brand + '/all'} className="block mb-5 hover:underline hover:text-red">{toCamelCase(product.brand)}</Link>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10 pl-0 space-x-5">
          {/* Left Side - Product Image */}
          <div className="block justify-center items-start ">
            <ProductImagesContainer Image={product.Image} Other_image={product.Other_image} />
          </div>    
          {/* Right Side - Product Information */}
          <div className="flex flex-col justify-between mt-10">
            <div>
              <div className="items-center hidden sm:flex">
                <p className="text-md text-gray-600 mr-2">ID: {product.Id}</p> 
                <span>|</span>
                <p className="text-md ml-2">Model: {product.Model}</p>
              </div>
              <h1 className="text-3xl font-bold mb-2 hidden md:flex">{product.Title}</h1>
              
              <Link to={'/products/'+ product.brand + '/all'} className="block mb-5 hover:underline hover:text-red hidden xl:flex">{toCamelCase(product.brand)}</Link>
              
              <p className="text-[15px] font-light text-gray-500 line-through -mb-2">
                {formatCurrency(product.Price*1.02)}
              </p>

              <p className="text-[30px] font-semibold text-black mb-4">
                {formatCurrency(product.Price)}
              </p>

              <p className='font-bold'> In Stock </p>
              <p className='text-gray-500 mb-5'> {product.brand == 'the_outdoor_plus'? "This item leaves our warehouse within 4 - 6 weeks":"This item leaves our warehouse within 24 Hours"}  </p>
              <p className="affirm-as-low-as mb-[20px]" data-page-type="cart" data-amount={product.Price*100}></p>

              <AddToCartQuantity quantity={quantity} setQuantity={setQuantity} product={product}/>
              


            </div>
          </div>
        </div>

        <hr></hr>

        <h2 className='text-left text-[35px] font-bold mt-5 mb-5 ml-2'> Related Products </h2>

        <Slider {...settings} className='mb-10 relative z-0 mx-auto max-w-[100%]'>
        {[...listRelated].sort(() => 0.5 - Math.random()).map((product) => (
          <div key={product.Id} className="px-2 flex"> 
            <ProductMiniature product={product} />
          </div>
        ))}
      </Slider>




        <hr></hr>

         {/* Product Description - Below the Grid */}
        <div className="mt-6 block sm:grid grid-cols-[auto_200px] gap-10">
          <div>
            <h2 className="text-lg font-semibold mb-5">Description</h2>
            <ProductDescription product={product}/>
          </div>
          <div> 
            <AskExpert />
          </div>
        </div>

        
       
        <div className="mt-6" style={{display: product.Specifications.length > 0 ? 'block' : 'none'}}>
          <h2 className="text-lg font-semibold mt-5 mb-5">Specifications</h2>
          <table className="min-w-full border-collapse border border-gray-300">
            <tbody>
              {product.Specifications
                // Filter out empty or "Details" specifications
                .filter(spec => {
                  const [name] = Object.entries(spec)[0];
                  return name && name !== "Details";
                })
                // Group every 2 specifications into a single row
                .reduce((rows, spec, index, filteredSpecs) => {
                  if (index % 2 === 0) {
                    rows.push(filteredSpecs.slice(index, index + 2));
                  }
                  return rows;
                }, [])
                // Map each row to a table row
                .map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="grid grid-cols-4 md:table-row" // Display as grid with 4 columns on larger screens
                  >
                    {row.map((spec, cellIndex) => {
                      const [name, value] = Object.entries(spec)[0];
                      return (
                        <React.Fragment key={cellIndex}>
                          <td className="border border-gray-300 p-2 font-semibold col-span-2 md:table-cell">
                            {name}
                          </td>
                          <td className="border border-gray-300 p-2 col-span-2 md:table-cell">
                            {value}
                          </td>
                        </React.Fragment>
                      );
                    })}
                    {/* If the last row has only 1 key-value pair, add empty cells to fill the row */}
                    {row.length < 2 && (
                      <React.Fragment>
                        <td className="border border-gray-300 p-2 col-span-2 md:table-cell"></td>
                        <td className="border border-gray-300 p-2 col-span-2 md:table-cell"></td>
                      </React.Fragment>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>

        </div>



    </div>
  );
};

export default ProductDetails;
