import React from 'react'
import banner8 from '../images/banner8.png';
import stars from '../images/stars.png';
import facebook from '../images/facebook.png'
import twitter from '../images/twitter.png'
import youtube from '../images/youtube.png'
import instagram from '../images/instagram.png'
import spotify from '../images/spotify.png'
import logoNegative from '../images/logo-negative.png'
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
     
      <div className='bg-[rgba(152,15,15,0.5)] pt-5 pb-[30px]'>
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

      <div className='bg-red  w-full pb-10'>
        <div className='flex justify-between py-10 w-[90%] mx-auto'>
            <div>
                <p className='text-white font-bold mb-5'> Customer Support </p>
                <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Contact Us</Link>
                <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Order Status</Link>
                <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Shipping & Delivery </Link>
                <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Returns </Link>
                <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Policies </Link>
                <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Terms of Use</Link>
            </div>
            <div>
                <p className='text-white font-bold mb-5'> Services </p>
                <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Financing</Link>
                <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Price Match</Link>
                <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> 3D Design Services </Link>
                <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Protection Plans </Link>
            </div>
            <div>
                <p className='text-white font-bold mb-5'> Company Info </p>
                <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> About Us</Link>
                <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Design Center Location</Link>
                <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Careers </Link>
                <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Affiliates </Link>
            </div>
            <div>
                <p className='text-white font-bold mb-5'> Articles & Videos </p>
                <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Best of BadAssBBQs </Link>
                <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Experts Reviews </Link>
                <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Buying Guides </Link>
                <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Outdoor Kitchen Ideas </Link>                
            </div>
            <div>
                <p className='text-white font-bold mb-5'> Deals </p>
                <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Sales & Offers</Link>
                <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Clearance</Link>
                <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Warehouse Deals </Link>
                <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Coupons </Link>                
            </div>
        </div>
        <img src={logoNegative} className='block mx-auto -mt-10'/>
        <h2 className='text-center text-[20px] text-white font-bold mt-5'> Talk to an expert now </h2>
        <p className='text-white text-center'> <i class="bi bi-telephone mr-5"></i> 1-855-908-2377  </p>
        <p className='text-white text-center'> <i class="bi bi-chat-left-text mr-3"></i> Chat with an Expert  </p>
        <div className='flex w-[80%] mx-auto justify-center mt-10 space-x-10'>
            <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Privacy Policy </Link>
            <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Accessibility Statement </Link>
            <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Your Privacy Choises </Link>
            <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Manage My Cookies </Link>
            <Link to='/contact' className='block text-white font-light mb-5 hover:underline'> Contact Us </Link>
        </div>
        
        <p className="text-center text-white text-sm mt-5">
            &copy; {new Date().getFullYear()} BadassBBQs. All rights reserved.
        </p>
      </div>



    </div>
  )
}

export default Footer
