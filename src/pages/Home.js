import React, { useEffect, useState } from 'react';
import Slider from 'react-slick'; // Import the Slider component from react-slick
import banner2 from '../images/banner2.png';
import { useProducts } from '../context/ProductsContext';
import ProductMiniature from '../components/ProductMiniature';

function Home() {
  const { getRandomProducts } = useProducts();
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    const products = getRandomProducts(15);
    setRandomProducts(products);
  }, [getRandomProducts]);

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
          slidesToShow: 1, // Show 1 slide on extra small screens
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className='w-full mt-5'>
      <div className='w-full mx-auto'>
        <img src={banner2} className='mx-auto' alt="Promotional Banner" />
      </div>
      <h2 className='text-center text-[35px] font-bold my-10'> Promotions & Special Offers </h2>
      <Slider {...settings}>
        {randomProducts.map((product) => (
          <div key={product.Id} className="px-2 flex"> 
            <ProductMiniature product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Home;
