import React, { useEffect, useState } from "react";
import AddressAutocomplete from "../components/AddressAutocomplete";
import { toCamelCase, formatCurrency, formatName, formatPhoneNumber } from '../Utils/Helpers';
import { useCart } from '../context/CartContext';
import Paypal from '../components/Paypal';
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
  const [enablePayment, setEnablePayments] = useState(false);
  const [alertForm, setAlertForm] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false); // Track if the form has been interacted with

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
    setIsFormDirty(true); // Set form as dirty after address selection
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
    setIsFormDirty(true); // Set form as dirty on any field change
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
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

    // Check if there are no errors
    return Object.keys(validationErrors).length === 0;
  };

  useEffect(() => {
    if (isFormDirty && validateForm()) {
      console.log("correct");
    }
  }, [userInfo]);

  return (
    <div className="flex justify-center items-center mt-[10px] xl:mt-0 pt-[50px] mb-[80px]">
      <div className="bg-white p-[10px] md:p-[20px] rounded border border-gray-200 w-[90%]">
        <div className="flex flex-col sm:flex-row justify-between mb-[30px]">
          <p className="font-bold text-[30px] text-center sm:text-auto">CheckOut</p> 
          <p className="font-bold text-[30px] text-center sm:text-auto">{formatCurrency(totalCost)}</p> 
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
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
            <p className="font-semibold text-[20px] mb-[10px] mb-[25px]"> Payment Method: </p>
            <div className="grid grid-cols-1 lg:grid-cols-3  gap-[10px] ">
              <button className="bg-blue-500 text-white h-[25px] text-[13px] font-semibold rounded hover:bg-blue-600">
                Credit Card
              </button>
              <button className="bg-black text-white h-[25px] text-[13px] font-semibold rounded hover:bg-gray-700">
                Affirm 
              </button>
              <div className="z-0">
                <Paypal total={totalCost}/>
              </div>
            </div>
            <div className="bg-transparent w-full h-[120px] lg:h-[30px] relative -top-[130px]  lg:-top-[30px] z-20" onClick={()=>setAlertForm(true)} style={{display: enablePayment ? 'none':'block'}}/>
            <p className="-mt-[120px] lg:-mt-[32px] text-red" style={{display: !enablePayment && alertForm ? 'block':'none'}}> Please fill the form</p>
          </div>
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
               <img src={item.Image} className="w-[35px] object-cover m-auto" alt="Product Image"/>
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
