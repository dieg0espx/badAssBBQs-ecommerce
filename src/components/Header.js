import React from "react";
import { Link } from "react-router-dom";
import logo_header from "../images/logo_header.png";

function Header() {

  const goHome =()=> {
    window.location.href='/'
  }

  return (
    <div className="">
      <div className="grid grid-cols-[2fr_5fr] px-5">
        <div className="text-[12px] font-bold text-red">
          FREE SHIPPING OVER $49 *
        </div>
        <div className="flex items-center justify-end space-x-2">
          <Link
            to="/contact"
            className="text-[10px] font-medium border-r border-black pr-2 hover:text-red"
          >
            As Low as 0% APR Financing Available**
          </Link>
          <Link
            to="/contact"
            className="text-[10px] font-medium border-r border-black pr-2 hover:text-red"
          >
            Free Design Service
          </Link>
          <Link
            to="/contact"
            className="text-[10px] font-medium border-r border-black pr-2 hover:text-red"
          >
            Pro Services
          </Link>
          <Link
            to="/contact"
            className="text-[10px] font-medium border-r border-black pr-2 hover:text-red"
          >
            Design Center Locations
          </Link>
          <Link
            to="/contact"
            className="text-[10px] font-medium border-r border-black pr-2 hover:text-red"
          >
            Gift Cards
          </Link>
          <Link
            to="/contact"
            className="text-[10px] font-medium border-r border-black pr-2 hover:text-red"
          >
            Check Order Status
          </Link>
          <Link
            to="/contact"
            className="text-[10px] font-medium pr-2 hover:text-red"
          >
            Help Center
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-between space-x-2 mt-0 h-12 px-5">
        <div className="flex items-center justify-between h-full">
          <img src={logo_header} className="h-full" onClick={goHome}/>
          <input
            className="border border-lightgray-500 px-5 rounded h-full min-w-full outline-0"
            type="text"
            placeholder="Search in BadAssBBQS"
          />
          <i class="bi bi-search -ml-10"></i>
        </div>
        <div className="flex items-center justify-between h-full space-x-10">
          <div>
            <p className="text-[12px] text-gray-500 font-medium"> Ask an Expert </p>
            <p className="text-[12px] text-red font-bold -mt-1"> 1-855-908-2373 </p>
          </div>
          <div>
            <p className="text-[12px] text-gray-500 font-medium"> Are you a pro ? </p>
            <p className="text-[12px] text-red font-bold -mt-1"> Get (PRO) pricing </p>
          </div>
          <div>
            <p className="text-[12px] text-gray-500 font-medium"> Sign In </p>
            <p className="text-[12px] text-red font-bold -mt-1"> My Account </p>
          </div>
          <div>
            <i class="bi bi-cart text-[25px] text-red mr-5"></i>
          </div>

        </div>
      </div>
      <div className="flex items-center justify-between space-x-2 -mt-2 h-12 px-5">
        <Link to="/contact" className="text-[12px] font-medium hover:text-red">
            Grills & Outdoor Cooking <i class="bi bi-chevron-down"></i>
        </Link>
        <Link to="/contact" className="text-[12px] font-medium hover:text-red">
           Outdoor Kitchens <i class="bi bi-chevron-down"></i>
        </Link>
        <Link to="/contact" className="text-[12px] font-medium hover:text-red">
            Outdoor Forniture <i class="bi bi-chevron-down"></i>
        </Link>
        <Link to="/contact" className="text-[12px] font-medium hover:text-red">
            Outdoor Heating & More <i class="bi bi-chevron-down"></i>
        </Link>
        <Link to="/contact" className="text-[12px] font-medium hover:text-red">
            BBQ Accessories <i class="bi bi-chevron-down"></i>
        </Link>
        <Link to="/contact" className="text-[12px] font-medium hover:text-red">
            Brands <i class="bi bi-chevron-down"></i>
        </Link>
        <Link to="/contact" className="text-[12px] font-medium hover:text-red">
            Articles & Videos <i class="bi bi-chevron-down"></i>
        </Link>
        <Link to="/contact" className="text-[12px] font-medium hover:text-red">
            Sales & Offers <i class="bi bi-chevron-down"></i>
        </Link>
      </div>
      <div className="bg-red text-center flex items-center justify-center -mt-2  py-0.5">
        <Link to="/contact" className="text-[15px] text-white  font-medium">
            Save Up to $450 on Blaze LTE + Grills & Much More <i class="bi bi-chevron-right"></i>
        </Link>
      </div>
    </div>
  );
}

export default Header;
