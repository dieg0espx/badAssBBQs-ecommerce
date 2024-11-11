import React, { useEffect, useState } from "react";
import AddressAutocomplete from "../components/AddressAutocomplete";
import { toCamelCase, formatCurrency } from '../Utils/Helpers'
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
    streetNumber: "",
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
           "user_confirmation_url": "http://localhost:8080/api/confirm",
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
    <div className="flex justify-center items-center h-full xl:h-[80vh] mt-[10px] xl:mt-0">
      <div className="bg-white p-8 rounded border border-gray-200 w-[90%] ">
        <div className="flex flex-col xl:flex-row justify-between">
          <p className="font-bold text-[45px] xl:text-[30px] mb-[0px] xl:mb-[30px] text-center xl:text-left">CheckOut</p>
          <p className="font-bold text-[30px] mb-[50px] xl:mb-[30px] text-center xl:text-left text-gray-5 00">{formatCurrency(totalCost)}</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-[30px]">
          <div className="basis-[50%]">
            <div className="flex flex-col xl:flex-row gap-[0px] xl:gap-[20px]">
              <div className="mb-4 basis-[50%]">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                  First Name
                </label>
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
                <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">
                  Last Name
                </label>
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
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
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
              <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                Phone Number
              </label>
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
              <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">
                Address
              </label>
              <AddressAutocomplete onAddressSelect={handleAddressSelect} />
              {errors.address && <p className="text-red text-sm">{errors.address}</p>}
            </div>
          </div>

          <div className="basis-[50%] border-0 xl:border border-gray-200 rounded p-0 xl:p-[20px]">
            <div className="flex flex-col gap-[20px] mb-[20px]">
              <button className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                Credit Card
              </button>
              <button className="bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800">
                Google Pay
              </button>
              <button className="bg-black text-white py-2 rounded-lg hover:bg-gray-700">
                Apple Pay
              </button>
              <button className="bg-black text-white py-2 rounded-lg hover:bg-gray-700" onClick={affirm}>
                Affirm 
              </button>
            </div>
            
            <Paypal total={totalCost}/>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handlePlaceOrder}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;