import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo_header from "../images/logo_header.png";

function Header() {
  const [category, setCategory] = useState('')
  const [showMenu, setShowMenu] = useState(false)


  useEffect(() => {
    if (showMenu) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [showMenu]);

  const goHome =()=> {
    window.location.href='/'
  }


  return (
  <div>

    {/* DESKTOP VERSION */}
    <div className="fixed l-0 t-0 w-full bg-white shadow-md z-10 hidden xl:block">
      <div className="max-w-[1500px] mx-auto grid grid-cols-[2fr_5fr] px-5">
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
      <div className="max-w-[1500px] mx-auto flex items-center justify-between space-x-2 mt-0 h-12 px-5">
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
          <Link to='/cart'> <i class="bi bi-cart text-[25px] text-red mr-5"></i> </Link>
        </div>
      </div>
    <div onMouseLeave={()=>setCategory('')} >
      <div className=" max-w-[1500px] mx-auto flex items-center justify-between space-x-2 -mt-2 h-12 px-5" >
        <button onMouseOver={()=>setCategory('Grills & Outdoor Cooking')} className="text-[12px] font-medium hover:text-red">
            Grills & Outdoor Cooking <i class="bi bi-chevron-down"></i>
        </button>
        <button onMouseOver={()=>setCategory('Outdoor Kitchens')} className="text-[12px] font-medium hover:text-red">
           Outdoor Kitchens <i class="bi bi-chevron-down"></i>
        </button>
        <button onMouseOver={()=>setCategory(' Outdoor Forniture')} className="text-[12px] font-medium hover:text-red">
            Outdoor Forniture <i class="bi bi-chevron-down"></i>
        </button>
        <button onMouseOver={()=>setCategory('Outdoor Heating & Mor')} className="text-[12px] font-medium hover:text-red">
            Outdoor Heating & More <i class="bi bi-chevron-down"></i>
        </button>
        <button onMouseOver={()=>setCategory('BBQ Accessories')} className="text-[12px] font-medium hover:text-red">
            BBQ Accessories <i class="bi bi-chevron-down"></i>
        </button>
        <button onMouseOver={()=>setCategory('Brands')} className="text-[12px] font-medium hover:text-red">
            Brands <i class="bi bi-chevron-down"></i>
        </button>
        <button onMouseOver={()=>setCategory('Sales & Offer')} className="text-[12px] font-medium hover:text-red">
            Sales & Offers <i class="bi bi-chevron-down"></i>
        </button>
      </div>

      <div className="fixed w-full h-[280px] flex justify-center items-center bg-white -mt-[8px] px-5 z-50" style={{display: category !== '' ? 'block':'none'}}>

      </div>
    </div>
    <div className="fixed b-0 l-0 w-full h-full bg-[rgba(0,0,0,0.3)] z-10" style={{display: category !== '' ? 'block':'none'}} />


      <div className="bg-red text-center flex items-center justify-center -mt-2  py-0.5">
        <Link to="/contact" className="text-[15px] text-white  font-medium">
            Save Up to $450 on Blaze LTE + Grills & Much More <i class="bi bi-chevron-right"></i>
        </Link>
      </div>
    </div>
    
    {/* MOBILE VERSION */}
    <div className=" w-[100vw] bg-white z-10 block xl:hidden flex flex-col justify-center align-center items-center relative z-999">
      <h2 className=" text-gray-500 font-semibold text-[15px] py-[3px] text-center w-full border-b border-gray-300 underline"> 1-877-743-2269 </h2>
      <div className="flex  w-full items-center my-[6px]">
        <div className="basis-[20%] flex justify-center">
          <i className={!showMenu ? "bi bi-list":"bi bi-x-lg"} onClick={()=>setShowMenu(!showMenu)}></i>
        </div>
        <div className="basis-[80%] flex justify-center">
          <img src={logo_header} className="w-[100%] max-w-[300px]" onClick={goHome}/>
        </div>
        <div className="basis-[20%] flex justify-center">
          <Link to='/cart' className="block"><i className="bi bi-cart "></i>  </Link>
        </div>
      </div>
      <input className="border border-lightgray-500 px-5 rounded w-[90%] outline-0 text-[15px] py-[16px] my-[3px3" type="text" placeholder="Search in BadAssBBQS" />
      <div className="bg-red text-center flex items-center justify-center py-[7px] mt-3 w-full">
        <Link to="/contact" className="text-[12px] text-white  font-medium">
            Save Up to $450 on Blaze LTE + Grills & Much More <i class="bi bi-chevron-right"></i>
        </Link>
      </div>

      {/* MOBILE MENU */}
      <div className="fixed top-[85px] left-0 h-[100vh] bg-[rgba(0,0,0,0.5)] w-[100vw]" style={{display: showMenu? 'flex':'none'}}>
        <div className="bg-white basis-[80%] h-full max-w-[400px] overflow-y-scroll pb-[200px]"> 

            <div className="flex border boder-b-gray-500  py-[10px] px-[8px] gap-5">
              <div className="basis-[50%] text-[15px] flex flex-row gap-3 justify-center">
                <i class="bi bi-telephone-fill"></i> <p> 1-877-743-2269 </p>
              </div>
              <div className="basis-[50%] text-[15px] flex flex-row gap-3 justify-center">
                <i class="bi bi-chat-left-text"></i>  <p> Live Chat </p>
              </div>
            </div>

            <div className="border boder-b-gray-500">
              <div className="flex px-5 py-3">
                <div className="basis-[95%] text-gray-500 text-[18px] ">
                  <p> Grills & Outdoor Cooking </p>
                </div>
                <div className="bassis-[5%] flex items-center">
                  <i class="bi bi-chevron-compact-right text-red"></i>
                </div>
              </div>
              <div className="flex px-5 py-3">
                <div className="basis-[95%] text-gray-500 text-[18px] ">
                  <p> Outdoor Kitchens </p>
                </div>
                <div className="bassis-[5%] flex items-center">
                  <i class="bi bi-chevron-compact-right text-red"></i>
                </div>
              </div>
              <div className="flex px-5 py-3">
                <div className="basis-[95%] text-gray-500 text-[18px] ">
                  <p> Outdoor Forniture </p>
                </div>
                <div className="bassis-[5%] flex items-center">
                  <i class="bi bi-chevron-compact-right text-red"></i>
                </div>
              </div>
              <div className="flex px-5 py-3">
                <div className="basis-[95%] text-gray-500 text-[18px] ">
                  <p> Outdoor Heating & More </p>
                </div>
                <div className="bassis-[5%] flex items-center">
                  <i class="bi bi-chevron-compact-right text-red"></i>
                </div>
              </div>
              <div className="flex px-5 py-3">
                <div className="basis-[95%] text-gray-500 text-[18px] ">
                  <p> BBQ Accesories </p>
                </div>
                <div className="bassis-[5%] flex items-center">
                  <i class="bi bi-chevron-compact-right text-red"></i>
                </div>
              </div>
              <div className="flex px-5 py-3">
                <div className="basis-[95%] text-gray-500 text-[18px] ">
                  <p> Brands </p>
                </div>
                <div className="bassis-[5%] flex items-center">
                  <i class="bi bi-chevron-compact-right text-red"></i>
                </div>
              </div>
              <div className="flex px-5 py-3">
                <div className="basis-[95%] text-gray-500 text-[18px] ">
                  <p> Sales & Offers </p>
                </div>
                <div className="bassis-[5%] flex items-center">
                  <i class="bi bi-chevron-compact-right text-red"></i>
                </div>
              </div>
            </div>

            <div className="border boder-b-gray-500 ">
              <p className="px-5 py-3 font-bold"> GET [PRO] PRICING </p>
            </div>

            <div className="border boder-b-gray-500 ">
              <p className="px-5 py-3"> My Account </p>
            </div>

            <div className="border boder-b-gray-500 ">
              <p className="px-5 py-3"> As Low as 0% APR Financing Available ** </p>
              <p className="px-5 py-3"> Free Design Services </p>
              <p className="px-5 py-3"> Pro Services </p>
              <p className="px-5 py-3"> Design Center Locations </p>
              <p className="px-5 py-3"> Gift Cards </p>
              <p className="px-5 py-3"> Check Order Status </p>
              <p className="px-5 py-3"> Help Center </p>
            </div>

            <h2 className="px-5 py-3 font-bold"> Customer Service Hours: </h2>
            <p className="px-5 py-3 underline"> <i class="bi bi-telephone mr-3"></i>1-877-743-2269 </p>
            <p className="px-5 py-3 underline"> <i class="bi bi-chat-left-text mr-3"></i>Live Chat </p>
            <p className="px-5 py-3 underline"> <i class="bi bi-envelope mr-3"></i>Email Us </p>


        </div>
        <div className="flex-grow" onClick={()=>setShowMenu(false)}> </div>
      </div>
    </div>    
  </div>
  );
}

export default Header;
