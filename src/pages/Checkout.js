import React, { useState } from "react";
import AddressAutocomplete from "../components/AddressAutocomplete";

const Checkout = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleAddressSelect = (addressObject) => {
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      address: addressObject.formatted_address,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePlaceOrder = () => {
    console.log("User Information:", userInfo);
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%]">
        <div className="flex justify-between">
          <p className="font-bold text-[30px] mb-[30px]">CheckOut</p>
          <p className="font-bold text-[30px] mb-[30px]">$123,45.00</p>
        </div>

        <div className="flex gap-[30px]">
          <div className="basis-[50%]">
            <div className="flex gap-[20px]">
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
            </div>

            <div className="mb-6">
              <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">
                Address
              </label>
              <AddressAutocomplete onAddressSelect={handleAddressSelect} />
            </div>
          </div>

          <div className="basis-[50%] border border-gray-200 rounded p-[20px]">
            <div className="flex flex-col gap-[20px]">
              <button className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                Credit Card
              </button>
              <button className="bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600">
                PayPal
              </button>
              <button className="bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800">
                Google Pay
              </button>
              <button className="bg-black text-white py-2 rounded-lg hover:bg-gray-700">
                Apple Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
