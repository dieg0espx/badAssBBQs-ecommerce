import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo_header from "../images/logo_header.png";
import { useCart } from "../context/CartContext";
import { useProducts } from '../context/ProductsContext';
import { formatBrandName } from "../Utils/Helpers";
import SubCategoryHeader from "./SubCategoryHeader";

function Header() {
  const { getTotalQuantity } = useCart();
  const { getBrands } = useProducts();
  const [category, setCategory] = useState(0)
  const [showMenu, setShowMenu] = useState(false)
  const [cartQuantity, setCartQuantity] = useState(0)
  const location = useLocation(); // Track location changes


  useEffect(() => {
    if (showMenu) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [showMenu]);

  useEffect(()=> {
    setCartQuantity(getTotalQuantity())
  },[getTotalQuantity])

  const goHome =()=> {
    window.location.href='/'
  }

  const brands = getBrands();

  const variableMenu = () => {
    switch (category) {
      case 1: 
        return (
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-x-[20px] p-[30px] align-center items-center"> 
            <SubCategoryHeader 
              title="Gas Grills" 
              to='/products/all/Gas%20Grills' 
              imgURL='https://cdn.shocho.co/sc-image/c/e/f/f/ceff467a3607b0ffbdd6d459b7e2d780.jpg?i10c=img.resize(width:1200,height:1200)' 
            />
            <SubCategoryHeader 
              title="Kamado Grills" 
              to='/products/all/Kamado%20Grills%20&%20Smokers' 
              imgURL='https://cdn.shocho.co/sc-image/5/4/e/d/54edfd0aad549ca9f2e909458fde7f5d.jpg?i10c=img.resize(width:1200,height:1200)'
            /> 
            <SubCategoryHeader
              title="Charcoal BBQ Grills"
              to='/products/all/Charcoal%20BBQ%20Grills'
              imgURL='https://cdn.shocho.co/sc-image/4/3/6/2/4362c6fea236f88648ffbda2ab95b1fe.jpg?i10c=img.resize(width:1200,height:1200)'
            />
            <SubCategoryHeader
              title="Gas Griddles"
              to="/products/all/Outdoor%20Flat%20Top%20Grills%20&%20Gas%20Griddles"
              imgURL="https://cdn.shocho.co/sc-image/e/6/f/0/e6f05e038c22a8426662a2880c30b537.jpg"
            />
            <SubCategoryHeader
              title="Outdoor Pizza Ovens"
              to="/products/all/Outdoor%20Pizza%20Ovens"
              imgURL="https://cdn.shocho.co/sc-image/e/b/9/d/eb9d8075deff9a694ea353b4720c6bed.jpg?i10c=img.resize(width:1200,height:1200)"
            />

          </div>
        )
      case 2: 
        return (
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-x-[20px] p-[30px] align-center items-center"> 
            <SubCategoryHeader
              title="Built-In Grills"
              to="/products/all/Built-In%20Grills"
              imgURL="https://cdn.shocho.co/sc-image/a/b/6/f/ab6f84b7179b7f74f1246bb2e4815e2b.jpg?i10c=img.resize(width:1200,height:1200)"
            />
            <SubCategoryHeader
              title="Outdoor Kitchen Storage"
              to="/products/all/Outdoor%20Kitchen%20Cabinets%20&%20Storage"
              imgURL="https://cdn.shocho.co/sc-image/b/0/5/9/b0597acb7c03fedece4f56b8ae8e49e7.jpg?i10c=img.resize(width:1200,height:1200)"
            />
            <SubCategoryHeader
              title="Outdoor Refrigeration"
              to="/products/all/Outdoor%20Refrigeration"
              imgURL="https://cdn.shocho.co/sc-image/9/2/9/b/929bcf51ea5c628a0a1bfacd2762f7b9.jpg?i10c=img.resize(width:1200,height:1200)"
            />
            <SubCategoryHeader
              title="Side Burners"
              to="/products/all/Side%20Burners%20for%20Grills%20and%20Outdoor%20Kitchens"
              imgURL="https://cdn.shocho.co/sc-image/2/6/7/4/2674d692529adc8ea700d1a5a81eca0a.jpg?i10c=img.resize(width:1200,height:1200)"
            />
            <SubCategoryHeader
              title="Outdoor Vent Hoods"
              to="products/all/Outdoor%20Kitchen%20&%20Grill%20Ventilation"
              imgURL="https://cdn.shocho.co/sc-image/9/7/f/0/97f0b74a5b3347aa02ae9fc7a27cefd7.jpg?i10c=img.resize(width:1200,height:1200)"
            />
          </div>
        )
      case 3: 
        return (
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-x-[20px] p-[30px] align-center items-center"> 
            <SubCategoryHeader
              title="Patio Heaters"
              to="/products/all/Patio%20Heaters"
              imgURL="https://cdn.shocho.co/sc-image/2/0/f/f/20fff4d7a7844c876d05574f4d4d2aa0.jpg?i10c=img.resize(width:1200,height:1200)"
            /> 
            <SubCategoryHeader
              title="Fire Pits"
              to="/products/all/Outdoor%20Fire%20Pits"
              imgURL="https://cdn.shocho.co/sc-image/2/8/8/a/288a20be2033d6efad482b6497e9a09c.jpg?i10c=img.resize(width:1200,height:1200)"
            /> 
            <SubCategoryHeader
              title="DIY Fire Pit Kits "
              to="/products/all/DIY%20Fire%20Pit%20Kits%20&%20Components"
              imgURL="https://cdn.shocho.co/sc-image/0/0/b/7/00b7968391177f35c3d6208f341dbb48.jpg"
            /> 
            <SubCategoryHeader
              title="Outdoor Fireplaces"
              to="/products/all/Outdoor%20Fireplaces"
              imgURL="https://cdn.shocho.co/sc-image/b/9/1/0/b91028ac1de99509bf63930331e097f2.jpg"
            /> 
            <SubCategoryHeader
              title=""
              to=""
              imgURL=""
            /> 
          </div>
        )
      case 5: 
        return (
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-x-[20px] p-[30px] align-center items-center"> 
            <SubCategoryHeader
              title="BBQ & Grill Covers"
              to="/products/all/BBQ%20&%20Grill%20Covers"
              imgURL="https://cdn.shocho.co/sc-image/4/3/e/6/43e6c2dc5e9efb69c8471f65bd6cb31c.jpg?i10c=img.resize(width:1200,height:1200)"
            /> 
            <SubCategoryHeader
              title="Grill Attachments"
              to="/products/all/Grill%20Attachments"
              imgURL="https://cdn.shocho.co/sc-image/4/0/7/a/407aebbf6ac2bf3fbd24737ea3085fab.jpg?i10c=img.resize(width:1200,height:1200)"
            /> 
            <SubCategoryHeader
              title="Charcoal, Pellets & Starters"
              to="/products/all/Charcoal,%20Pellets%20&%20Starters"
              imgURL="https://cdn.shocho.co/sc-image/7/a/8/5/7a85716ffb1e2d8a30a4a1d5e6d3b35a.jpg?i10c=img.resize(width:1200,height:1200)"
            /> 
            <SubCategoryHeader
              title="Grill Thermometers"
              to="/products/all/Grill%20Thermometers"
              imgURL="https://cdn.shocho.co/sc-image/2/9/c/6/29c67ac2a5b7f722366ba0d931e4ef9d.jpg?i10c=img.resize(width:1200,height:1200)"
            /> 
            <SubCategoryHeader
              title="BBQ Grilling Tools & Accessories"
              to="/products/all/BBQ%20Grilling%20Tools%20&%20Accessories"
              imgURL="https://cdn.shocho.co/sc-image/2/6/9/c/269c39f57c27a616e1169a26b9f949d2.jpg?i10c=img.resize(width:1200,height:1200)"
            /> 
          </div>
        )
      case 5: 
        return (
          <div>             
            <SubCategoryHeader
              title=""
              to=""
              imgURL=""
            /> 
          </div>
        )
      case 6:
        return (
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-y-[20px] p-[30px] align-center items-center"> 
            <Link to={`/products/all/all`} className="flex justify-between w-[80%] m-auto text-gray-500 hover:text-red font-[600]">
                  <p> All Brands  </p>
                  <i class="bi bi-chevron-right"></i>
            </Link>
            {brands.map((brand) => (
              <div key={brand}>
                <Link to={`/products/${brand}/all`} className="flex justify-between w-[80%] m-auto text-gray-500 hover:text-red font-[600]">
                  <p> {formatBrandName(brand.replace('_', ' '))} </p>
                  <i class="bi bi-chevron-right"></i>
                </Link>
              </div>
            ))}
          </div>
        )
      default:
        return <div>Unknown status</div>;
    }
  };

  useEffect(() => {
    // Close the menu whenever the location (URL) changes
    setShowMenu(false);
  }, [location]);

  const mobileMenu = (link) => {
    window.location.href = link
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
          <Link to="/cart" className="flex relative">
            <i className="bi bi-cart text-[25px] text-red"></i>
            {cartQuantity > 0 && (
              <span className="absolute top-0 right-0 bg-red text-white rounded-full h-[15px] w-[15px] flex items-center justify-center text-[10px] font-bold transform translate-x-1/2 -translate-y-1/2">
                {cartQuantity}
              </span>
            )}
          </Link>

        </div>
      </div>
      <div onMouseLeave={()=>setCategory(0)} >
        <div className=" max-w-[1500px] mx-auto flex items-center justify-between space-x-2 -mt-2 h-12 px-5" >
          <button onMouseOver={()=>setCategory(1)} className="text-[12px] font-medium hover:text-red">
              Grills & Outdoor Cooking <i class="bi bi-chevron-down"></i>
          </button>
          <button onMouseOver={()=>setCategory(2)} className="text-[12px] font-medium hover:text-red">
             Outdoor Kitchens <i class="bi bi-chevron-down"></i>
          </button>
          {/* <button onMouseOver={()=>setCategory(3)} className="text-[12px] font-medium hover:text-red">
              Outdoor Forniture <i class="bi bi-chevron-down"></i>
          </button> */}
          <button onMouseOver={()=>setCategory(3)} className="text-[12px] font-medium hover:text-red">
              Outdoor Heating & More <i class="bi bi-chevron-down"></i>
          </button>
          <button onMouseOver={()=>setCategory(5)} className="text-[12px] font-medium hover:text-red">
              BBQ Accessories <i class="bi bi-chevron-down"></i>
          </button>
          <button onMouseOver={()=>setCategory(6)} className="text-[12px] font-medium hover:text-red">
              Brands <i class="bi bi-chevron-down"></i>
          </button>
          {/* <button onMouseOver={()=>setCategory(7)} className="text-[12px] font-medium hover:text-red">
              Sales & Offers <i class="bi bi-chevron-down"></i>
          </button> */}
        </div>
        <div className="fixed w-full h-[250px] flex justify-center items-center bg-white -mt-[8px] px-5 z-50 shadow-md" style={{display: category !== 0 ? 'block':'none'}}>
          {variableMenu()}
        </div>
      </div>
      <div className="fixed b-0 l-0 w-full h-full bg-[rgba(0,0,0,0.3)] z-10" style={{display: category !== 0 ? 'block':'none'}}/>
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
        <Link to="/cart" className="block relative">
          <i className="bi bi-cart text-[25px] text-red"></i>
          {cartQuantity > 0 && (
            <span className="absolute top-0 right-0 bg-red text-white rounded-full h-[15px] w-[15px] flex items-center justify-center text-[10px] font-bold transform translate-x-1/2 -translate-y-1/3">
              {cartQuantity}
            </span>
          )}
        </Link>
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
              <div className="basis-[50%] text-[15px] flex flex-row gap-3 justify-center items-center">
                <i class="bi bi-telephone-fill"></i> <p className="text-[13px]"> 1-877-743-2269 </p>
              </div>
              <div className="basis-[50%] text-[15px] flex flex-row gap-3 justify-center items-center">
                <i class="bi bi-chat-left-text"></i>  <p className="text-[13px]"> Live Chat </p>
              </div>
            </div>

            <div className="border boder-b-gray-500">
              <div className="flex px-5 py-3" onClick={()=>mobileMenu('/products/all/BBQ%20Grills%20&%20Smokers')}>
                <div className="basis-[95%] text-gray-500 text-[18px] ">
                  <p> Grills & Outdoor Cooking </p>
                </div>
                <div className="bassis-[5%] flex items-center">
                  <i class="bi bi-chevron-compact-right text-red"></i>
                </div>
              </div>
              <div className="flex px-5 py-3" onClick={()=>mobileMenu('/products/all/Outdoor%20Kitchens')}>
                <div className="basis-[95%] text-gray-500 text-[18px] ">
                  <p> Outdoor Kitchens </p>
                </div>
                <div className="bassis-[5%] flex items-center">
                  <i class="bi bi-chevron-compact-right text-red"></i>
                </div>
              </div>
              <div className="flex px-5 py-3" onClick={()=>mobileMenu('/products/all/Outdoor%20Heating%20&%20Accessories')}>
                <div className="basis-[95%] text-gray-500 text-[18px] ">
                  <p> Outdoor Heating & More </p>
                </div>
                <div className="bassis-[5%] flex items-center">
                  <i class="bi bi-chevron-compact-right text-red"></i>
                </div>
              </div>
              <div className="flex px-5 py-3" onClick={()=>mobileMenu('/products/all/BBQ%20Grilling%20Tools%20&%20Accessories')}>
                <div className="basis-[95%] text-gray-500 text-[18px] ">
                  <p> BBQ Accesories </p>
                </div>
                <div className="bassis-[5%] flex items-center">
                  <i class="bi bi-chevron-compact-right text-red"></i>
                </div>
              </div>
            </div>

            <div className="border boder-b-gray-500 ">
              <p className="px-5 py-3"> Brands </p>
              <div className="flex flex-col px-5 py-3 gap-y-[20px]">
                {brands.map((brand) => (
                  <div key={brand}>
                    <Link to={`/products/${brand}/all`} className="flex justify-between w-[100%] m-auto text-gray-500 hover:text-red text-[18px]">
                      <p> {formatBrandName(brand.replace('_', ' '))} </p>
                      <i class="bi bi-chevron-compact-right"></i>
                    </Link>
                  </div>
                ))}
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
        <div className="flex-grow" onClick={()=>setShowMenu(false)}> 
        </div>
      </div>
    </div>    


  </div>
  );
}

export default Header;
