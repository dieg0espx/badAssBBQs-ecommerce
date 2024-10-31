import React from 'react'
import banner8 from '../images/banner8.png';
import stars from '../images/stars.png';
import facebook from '../images/facebook.png'
import twitter from '../images/twitter.png'
import youtube from '../images/youtube.png'
import instagram from '../images/instagram.png'
import spotify from '../images/spotify.png'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='w-full mt-5'>
      <h2 className='text-center text-[35px] font-bold mt-10'> Why Choose BadAssBBQs </h2>
      <Link to='/contact' className='block text-center text-[20px] hover:text-red mb-10'> Learn more about us <i class="bi bi-chevron-right"></i> </Link>
      <img src={banner8} className='w-full mx-auto mt-5' alt="Promotional Banner8"/>
      <img src={stars} className='block mt-10 mx-auto'/>
      <h2 className='text-center text-[35px] font-bold mt-5'> What Are Our Customers Saying ? </h2>
      <Link to='/contact' className='block text-center text-[20px] hover:text-red mb-10'> Read Customers Reviews <i class="bi bi-chevron-right"></i> </Link>
     
      <div className='bg-[rgba(152,15,15,0.5)] py-5'>
        <h2 className='text-center text-[20px] font-bold mt-5'>  Join Our Email List for Sales, Recipes, Buying Guides, and More </h2>
        
        <div className='flex w-[40%] mx-auto justify-center align-center my-5 border border-black border-2'>
         <input
            className="block outline-0  w-full mx-auto  py-5 px-3 bg-transparent rounded-none placeholder-black"
            type="text"
            placeholder="Enter Your Email Address"
          />
          <button className='bg-red px-10 text-[20px] text-white font-bold'> Join </button>
        </div>

        <div className='flex w-auto mx-auto justify-center align-center space-x-5'>
            <img src={facebook} />
            <img src={twitter} />
            <img src={youtube} />
            <img src={instagram} />
            <img src={spotify} />
        </div>

      </div>


    </div>
  )
}

export default Footer
