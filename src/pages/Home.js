import React, { useEffect, useState } from 'react';
import Slider from 'react-slick'; // Import the Slider component from react-slick
import banner2 from '../images/banner2.png';
import banner3 from '../images/banner3.png';
import department0 from '../images/Span [dept-thumbnail] (0).png'
import department1 from '../images/Span [dept-thumbnail] (1).png'
import department2 from '../images/Span [dept-thumbnail] (2).png'
import department3 from '../images/Span [dept-thumbnail] (3).png'
import department4 from '../images/Span [dept-thumbnail] (4).png'
import department5 from '../images/Span [dept-thumbnail] (5).png'
import department6 from '../images/Span [dept-thumbnail] (6).png'
import department7 from '../images/Span [dept-thumbnail] (7).png'
import department8 from '../images/Span [dept-thumbnail] (8).png'
import department9 from '../images/Span [dept-thumbnail] (9).png'


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
  const settings2 = {
    dots: false, // Show dots for navigation
    infinite: true, // Infinite loop sliding
    speed: 500, // Slide speed
    slidesToShow: 5, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll on each navigation
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 3000, // Duration between slides
    rtl: true,
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
        <img src={banner2} className='w-full mx-auto' alt="Promotional Banner" />
      </div>
      <h2 className='text-center text-[35px] font-bold my-10'> Promotions & Special Offers </h2>
      <Slider {...settings} className='my-2 relative z-0'>
        {randomProducts.map((product) => (
          <div key={product.Id} className="px-2 flex"> 
            <ProductMiniature product={product} />
          </div>
        ))}
      </Slider>
      <Slider {...settings2} className='my-2 relative z-0'>
        {randomProducts.map((product) => (
          <div key={product.Id} className="px-2 flex"> 
            <ProductMiniature product={product} />
          </div>
        ))}
      </Slider>
      <img src={banner3} className='w-full mx-auto mt-10' alt="Promotional Banner2"/>

      <h2 className='text-center text-[35px] font-bold my-10'> Popular Departments </h2>

      <div className='grid grid-cols-[1fr_1fr_1fr_1fr_1fr] w-[80%] mx-auto'>
        <div className='group mb-10'>
            <img src={department0} className='mx-auto mb-2 w-[50%]'/>
            <p className='text-center group-hover:text-red'> Freestanding Gas Grills </p>
        </div>
        <div className='group mb-10'>
            <img src={department1} className='mx-auto mb-2 w-[50%]'/>
            <p className='text-center group-hover:text-red'> Gas Griddles </p>
        </div>
        <div className='group mb-10'>
            <img src={department2} className='mx-auto mb-2 w-[50%]'/>
            <p className='text-center group-hover:text-red'> Pallet Grills </p>
        </div>
        <div className='group mb-10'>
            <img src={department3} className='mx-auto mb-2 w-[50%]'/>
            <p className='text-center group-hover:text-red'> Kamado Grills </p>
        </div>
        <div className='group mb-10'>
            <img src={department4} className='mx-auto mb-2 w-[50%]'/>
            <p className='text-center group-hover:text-red'> Grill Accessories </p>
        </div>
        <div className='group mb-10'>
            <img src={department5} className='mx-auto mb-2 w-[50%]'/>
            <p className='text-center group-hover:text-red'> Built-In Gas Grills </p>
        </div>
        <div className='group mb-10'>
            <img src={department6} className='mx-auto mb-2 w-[50%]'/>
            <p className='text-center group-hover:text-red'> Outdoor Kitchen Storage </p>
        </div>
        <div className='group mb-10'>
            <img src={department7} className='mx-auto mb-2 w-[50%]'/>
            <p className='text-center group-hover:text-red'> Outdoor Compact Refrigerator </p>
        </div>
        <div className='group mb-10'>
            <img src={department8} className='mx-auto mb-2 w-[50%]'/>
            <p className='text-center group-hover:text-red'> Outdoor TVs </p>
        </div>
        <div className='group mb-10'>
            <img src={department9} className='mx-auto mb-2 w-[50%]'/>
            <p className='text-center group-hover:text-red'> Sales & Offers </p>
        </div>
      </div>
       

    </div>
  );
}

export default Home;
