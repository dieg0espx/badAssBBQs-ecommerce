import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { useProducts } from "../context/ProductsContext";
import ProductImagesContainer from "../components/ProductImagesContainer";
import AddToCartQuantity from "../components/AddToCartQuantity";
import Categories from "../components/Categories";
import AskExpert from "../components/AsxExpert";
import ProductMiniature from "../components/ProductMiniature";
import ProductDescription from "../components/ProductDescription";
import Loader from "../components/Loader";
import { toCamelCase, formatCurrency, getAlfrescoVariantDefinition } from "../Utils/Helpers";
import Alfresco from "../components/Variants/Alfresco";
import AmericanFyreDesign from "../components/Variants/AmericanFyreDesign";
import AmericanMadeGrills from "../components/Variants/AmericanMadeGrills";
import Aog from "../components/Variants/Aog";
import Artisan from "../components/Variants/Artisan";
import Blaze from "../components/Variants/Blaze";
import Breeo from "../components/Variants/Breeo";
import Delta from "../components/Variants/Delta";
import FireMagic from "../components/Variants/FireMagic";
import Fontana from "../components/Variants/Fontana";
import GreenMountain from "../components/Variants/GreenMountain";
import LedgeLounger from "../components/Variants/LedgeLounger";
import Napoleon from "../components/Variants/Napoleon";
import TheOutdoorPlus from "../components/Variants/TheOutdoorPlus";
import TwinEagles from "../components/Variants/TwinEagles";


const ProductDetails = () => {
  const { loadAllProducts, relatedProducts, analyzeProductsByModel, getProductUrl, getDifferentSpecifications, goToVariation } = useProducts();
  const [products, setProducts] = useState([]);
  const [listRelated, setListRelated] = useState([]);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const onLoad = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await loadAllProducts();
        setProducts(allProducts);

        const currentProduct = allProducts.find((item) => `${item.brand}-${item.Id}` === id);
        // console.log(currentProduct);
        
        if (currentProduct) {
          const category = currentProduct.Category.filter((cat) => cat !== "Home").slice(-2);
          const related = await relatedProducts(category, 15);
          setListRelated(related);
      
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchData();
  }, [id, loadAllProducts, relatedProducts, analyzeProductsByModel]);

  const product = products.find((item) => `${item.brand}-${item.Id}` === id);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1, dots: true } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  if (!product) return <Loader />;

  return (
    <div className="p-6 max-w-6xl mx-auto overflow-x-hidden">
        <Categories categories={product.Category} />
      
        
        <div className='block sm:hidden'>
          <p className="text-md text-gray-600 mr-2">ID: {product.Id}  <span>|</span> Model: {product.Model}</p> 
          <h1 className="text-[20px] font-bold mb-2 leading-6">{product.Title}</h1>
          <Link to={'/products/'+ product.brand + '/all'} className="block mb-5 hover:underline hover:text-red">{toCamelCase(product.brand)}</Link>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10 pl-0 space-x-5 items-center">
          {/* Left Side - Product Image */}
          <div className="block justify-center items-start ">
            <ProductImagesContainer Image={product.Image} Other_image={product.Other_image} />
          </div>    
          {/* Right Side - Product Information */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="items-center hidden sm:flex">
                <p className="text-md text-gray-600 mr-2">ID: {product.Id}</p> 
                <span>|</span>
                <p className="text-md ml-2">Model: {product.Model}</p>
              </div>
              <h1 className="text-3xl font-bold mb-2 hidden md:flex">{product.Title}</h1>
              
              <Link to={'/products/'+ product.brand + '/all'} className="block mb-5 hover:underline hover:text-red hidden xl:flex">{toCamelCase(product.brand)}</Link>
      
              <p className="text-[15px] font-light text-gray-500 line-through -mb-2 mt-[40px] md:mt-0">
                {formatCurrency(product.Price*1.02)}
              </p>

              <p className="text-[30px] font-semibold text-black mb-4 ">
                {formatCurrency(product.Price)}
              </p>

              {product.brand == 'alfresco' && ( <Alfresco product={product}/> )}
              {product.brand == 'american_fyre_design' && ( <AmericanFyreDesign product={product}/> )}
              {product.brand == 'american_made_grills' && ( <AmericanMadeGrills product={product}/> )}
              {product.brand == 'aog' && ( <Aog product={product}/> )}
              {product.brand == 'artisan' && ( <Artisan product={product}/> )}
              {/* HERE GOES BLACKSTONE */}
              {product.brand == 'blaze' && ( <Blaze product={product}/> )}
              {product.brand == 'breeo' && ( <Breeo product={product}/> )}
              {product.brand == 'delta' && ( <Delta product={product}/> )}
              {product.brand == 'fire_magic' && ( <FireMagic product={product}/> )}
              {product.brand == 'fontana' && ( <Fontana product={product}/> )}
              {product.brand == 'green_mountain' && ( <GreenMountain product={product}/> )}
              {product.brand == 'napoleon' && ( <Napoleon product={product}/> )}
              {product.brand == 'the_outdoor_plus' && ( <TheOutdoorPlus product={product}/> )}
              {product.brand == 'twin_eagles' && ( <TwinEagles product={product}/> )}
              
              

              <p className='font-bold'> In Stock </p>
              <p className='text-gray-500'> {product.brand == 'the_outdoor_plus'? "This item leaves our warehouse within 4 - 6 weeks":"This item leaves our warehouse within 24 Hours"}  </p>
              <p className="affirm-as-low-as text-[15px] my-[20px]" data-page-type="product" data-amount={product.Price*100}></p>

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
