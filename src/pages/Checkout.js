import React, { useEffect, useState } from "react";
import AddressAutocomplete from "../components/AddressAutocomplete";
import { toCamelCase, formatCurrency, formatName, formatPhoneNumber } from '../Utils/Helpers'
import { useCart } from '../context/CartContext'; // Import the custom hook
import Paypal from '../components/Paypal'
import Affirm from "../components/Affirm";



const Checkout = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [userInfo, setUserInfo] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [errors, setErrors] = useState({});

  const totalCost = cartItems.reduce((accumulator, item) => {
    return accumulator + item.Price * item.quantity;
  }, 0);


  const handleAddressSelect = (addressObject) => {
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      address: addressObject.formatted_address,
      streetNumber: addressObject.streetNumber,
      city: addressObject.city,
      state: addressObject.state,
      postalCode: addressObject.postalCode,
      country: addressObject.country,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10,15}$/; // Adjust as needed for international formats
    return phoneRegex.test(phone);
  };

  const handlePlaceOrder = () => {
    let validationErrors = {};
  
    if (!userInfo.name) {
      validationErrors.name = "Please enter your first name.";
    }
  
    if (!userInfo.lastName) {
      validationErrors.lastName = "Please enter your last name.";
    }
  
    if (!userInfo.address) {
      validationErrors.address = "Please enter your address.";
    }
  
    if (!validateEmail(userInfo.email)) {
      validationErrors.email = "Please enter a valid email address.";
    }
  
    if (!validatePhone(userInfo.phone)) {
      validationErrors.phone = "Please enter a valid phone number (10-15 digits).";
    }
  
    setErrors(validationErrors);
  
    // Proceed with order placement if there are no errors
    if (Object.keys(validationErrors).length === 0) {
      console.log("User Information:", userInfo);
      // Additional order placement logic here
    }
  };
  
  const affirm = () => {
    if (window.affirm) {

     window.affirm.checkout({
      
         "merchant": {
           "user_confirmation_url": "https://server-badassbbqs.vercel.app/api/confirm",
           "user_cancel_url": "http://localhost:8080/cancel",
           "user_confirmation_url_action": "POST",
           "name": "Your Customer-Facing Merchant Name"
         },
         "shipping":{
           "name":{
             "first":"Joe",
             "last":"Doe"
           },
           "address":{
             "line1":"633 Folsom St",
             "line2":"Floor 7",
             "city":"San Francisco",
             "state":"CA",
             "zipcode":"94107",
             "country":"USA"
           },
           "phone_number": "4153334567",
           "email": "joedoe@123fakestreet.com"
         },
         "billing":{
           "name":{
             "first":"Joe",
             "last":"Doe"
           },
           "address":{
             "line1":"633 Folsom St",
             "line2":"Floor 7",
             "city":"San Francisco",
             "state":"CA",
             "zipcode":"94107",
             "country":"USA"
           },
           "phone_number": "4153334567",
           "email": "joedoe@123fakestreet.com"
         },
         "items": [{
           "display_name":         "Awesome Pants",
           "sku":                  "ABC-123",
           "unit_price":           1999,
           "qty":                  3,
           "item_image_url":       "http://merchantsite.com/images/awesome-pants.jpg",
           "item_url":             "http://merchantsite.com/products/awesome-pants.html",
           "categories": [
               ["Home", "Bedroom"],
               ["Home", "Furniture", "Bed"]
           ]
         }
      ],
         "discounts":{
            "RETURN5":{
               "discount_amount":500,
               "discount_display_name":"Returning customer 5% discount"
           },
           "PRESDAY10":{
               "discount_amount":1000,
               "discount_display_name":"President's Day 10% off"
         }
      },
      "metadata":{
         "shipping_type":"UPS Ground",
         "mode":"modal"
      },
      "order_id":"JKLMO4321",
      "currency":"USD",  
      "financing_program":"flyus_3z6r12r",
      "shipping_amount":1000,
      "tax_amount":500,
      "total":100000
     })

     window.affirm.checkout.open()
    } else {
      console.error("Affirm.js has not loaded.");
    }
  };

  useEffect(() => {
    const checkAffirm = () => {
      if (!window.affirm) {
        console.error("Affirm.js has not loaded. Please check the script URL.");
      }
    };
    checkAffirm();
  }, []);

  useEffect(() => {
    if (!window.affirm) {
      const affirmScript = document.createElement("script");
      affirmScript.src = "https://cdn1-sandbox.affirm.com/js/v2/affirm.js";
      affirmScript.async = true;
      affirmScript.onload = () => {
        console.log("Affirm.js loaded");
      };
      document.head.appendChild(affirmScript);
    }
  }, []);

  return (
    <div className="flex justify-center items-center mt-[10px] xl:mt-0 pt-[50px] mb-[80px]">
      
      {/* CONTAINER */}
      <div className="bg-white p-8 rounded border border-gray-200 w-[90%]">
        {/* TITLE */}
        <div className="flex flex-col sm:flex-row justify-between mb-[30px]">
          <p className="font-bold text-[30px] text-center sm:text-auto">CheckOut</p> 
          <p className="font-bold text-[30px] text-center sm:text-auto">{formatCurrency(totalCost)}</p> 
        </div>
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
          {/* LEFT COLUMN */}
          <div className="border border-gray-200 rounded p-[20px]">
            <div className="flex flex-col">
              <p className="font-semibold text-[20px] mb-[10px] mb-[25px]"> Contact Information: </p>
              <div className="mb-4 basis-[50%]">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userInfo.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded outline-none"
                  placeholder="First Name"
                />
                {errors.name && <p className="text-red text-sm">{errors.name}</p>}
              </div>
              <div className="mb-4 basis-[50%]">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded outline-none"
                  placeholder="Last Name"
                />
                {errors.lastName && <p className="text-red text-sm">{errors.lastName}</p>}
              </div>
            </div>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded outline-none"
                placeholder="Email Address"
              />
              {errors.email && <p className="text-red text-sm">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={userInfo.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded outline-none"
                placeholder="Phone Number"
              />
              {errors.phone && <p className="text-red text-sm">{errors.phone}</p>}
            </div>
            <div className="mb-6">
              <AddressAutocomplete onAddressSelect={handleAddressSelect} />
              {errors.address && <p className="text-red text-sm">{errors.address}</p>}
            </div>
            {/* PAYMENT METHODS */}
            <p className="font-semibold text-[20px] mb-[10px] mb-[25px]"> Payment Method: </p>
            <div className="grid grid-cols-1 lg:grid-cols-3  gap-[10px] ">
              <button className="bg-blue-500 text-white h-[25px] text-[13px] font-semibold rounded hover:bg-blue-600">
                Credit Card
              </button>
              <button className="bg-black text-white h-[25px] text-[13px] font-semibold rounded hover:bg-gray-700" onClick={affirm}>
                Affirm 
              </button>
              <Paypal total={totalCost}/>
            </div>
          </div>
          {/* RIGHT COLUMN */}
          <div className="rounded ">
            <div className="border border-gray-200 rounded px-[30px] py-[10px] mb-[10px]">
              <p className="font-semibold text-[20px] mb-[10px]"> Shipping Information: </p>
              <p className="text-[15px]"> <b>Full Name</b>:  {formatName(userInfo.name, userInfo.lastName)}</p>
              <p className="text-[15px]"> <b>Email Address</b> :  {userInfo.email} </p>
              <p className="text-[15px]"> <b>Phone Number</b> :  {formatPhoneNumber(userInfo.phone)} </p>
              <p className="text-[15px]"> <b>Address</b> :  {userInfo.address} </p>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <p className="text-[15px]"> <b>City</b> :  {userInfo.city} </p>
                <p className="text-[15px]"> <b>State</b> :  {userInfo.state} </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <p className="text-[15px]"> <b>Country</b> :  {userInfo.country} </p>
                <p className="text-[15px]"> <b>Postal Code</b> :  {userInfo.postalCode} </p>
              </div>
            </div> 
            <div className="h-[340px] overflow-y-scroll">
            {cartItems.map((item, index) => (
              <div key={index} className="border border-gray-200 grid grid-cols-1 lg:grid-cols-[1fr_8fr] gap-10 items-center px-[30px] py-[10px] rounded mb-[10px]">
               <img src={item.Image} className="w-full w-[35px] object-cover m-auto" alt="Product Image"/>
               <div>
                 <p className="text-[15px]">{item.Title}</p>
                 <p className="text-[15px] font-semibold">{formatCurrency(item.Price)}</p>
               </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
