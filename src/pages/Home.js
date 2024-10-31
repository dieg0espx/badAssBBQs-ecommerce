import React, { useEffect, useState } from 'react';
import Slider from 'react-slick'; // Import the Slider component from react-slick
import banner2 from '../images/banner2.png';
import banner3 from '../images/banner3.png';
import banner4 from '../images/banner4.png';
import banner5 from '../images/banner5.png';
import banner6 from '../images/banner6.png';
import banner7 from '../images/banner7.png';

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
import brand0 from '../images/Image [brand-logo-img] (0).png'
import brand1 from '../images/Image [brand-logo-img] (1).png'
import brand2 from '../images/Image [brand-logo-img] (2).png'
import brand3 from '../images/Image [brand-logo-img] (3).png'
import brand4 from '../images/Image [brand-logo-img] (4).png'
import statement0 from '../images/Div [statement-icon] (0).png'
import statement1 from '../images/Div [statement-icon] (1).png'
import statement2 from '../images/Div [statement-icon] (2).png'
import statement3 from '../images/Div [statement-icon] (3).png'
import statement4 from '../images/Div [statement-icon] (4).png'
import statement5 from '../images/Div [statement-icon] (5).png'

import { useProducts } from '../context/ProductsContext';
import ProductMiniature from '../components/ProductMiniature';
import Footer from '../components/Footer';

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
      <Slider {...settings} className='my-2 relative z-0 mx-auto max-w-[95%]'>
        {randomProducts.map((product) => (
          <div key={product.Id} className="px-2 flex"> 
            <ProductMiniature product={product} />
          </div>
        ))}
      </Slider>
      <Slider {...settings2} className='my-2 relative z-0  mx-auto max-w-[95%]'>
        {randomProducts.map((product) => (
          <div key={product.Id} className="px-2 flex"> 
            <ProductMiniature product={product} />
          </div>
        ))}
      </Slider>

      <img src={banner3} className='w-full mx-auto mt-10' alt="Promotional Banner3"/>

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

      <img src={banner4} className='w-full mx-auto mt-10' alt="Promotional Banner4"/>

      <img src={banner5} className='w-full mx-auto mt-5' alt="Promotional Banner5"/>

      <h2 className='text-center text-[35px] font-bold my-10'> Popular Brands </h2>

      <div className='grid grid-cols-[1fr_1fr_1fr_1fr_1fr] mx-auto mb-[30px] align-center'>
        <img src={brand0} className='mx-auto -mt-3'/>
        <img src={brand1} className='mx-auto'/>
        <img src={brand2} className='mx-auto'/>
        <img src={brand3} className='mx-auto'/>
        <img src={brand4} className='mx-auto'/>
      </div>

      <img src={banner6} className='w-full mx-auto mt-5' alt="Promotional Banner6"/>

      <h2 className='text-center text-[35px] font-bold my-10'> Get More at BadAssBBQs </h2>

      <div className='flex space-x-10 max-w-[90%] mx-auto mb-20'>
        <div>
            <img src={statement5} className='mx-auto'/>
            <p className='text-center font-bold'> Ask an Expert </p>
            <p className='text-center'> Shop with our experts and buy with confidence </p>
        </div>
        <div>
            <img src={statement4} className='mx-auto'/>
            <p className='text-center font-bold'> Free Design Sevices </p>
            <p className='text-center'> Envision your outdoor space through free expert renderings </p>
        </div>
        <div>
            <img src={statement3} className='mx-auto'/>
            <p className='text-center font-bold'> Financing Available </p>
            <p className='text-center'> Pay over time with financing as low as 0% APR available </p>
        </div>
        <div>
            <img src={statement2} className='mx-auto'/>
            <p className='text-center font-bold'> Honest Expert Reviews </p>
            <p className='text-center'> Shop smarter with objective, in-depth product assessments </p>
        </div>
        <div>
            <img src={statement1} className='mx-auto'/>
            <p className='text-center font-bold'> Fast, Free Shipping </p>
            <p className='text-center'> Receive orders in no time - at no additional cost over $49 </p>
        </div>
      </div>

      <img src={banner7} className='w-full mx-auto mt-5' alt="Promotional Banner7"/>
    </div>
  );
}

export default Home;
