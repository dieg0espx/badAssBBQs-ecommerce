import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import { useOrdersContext } from '../context/OrdersContext'; // Assuming OrdersContext is set up
import { toCamelCase, formatCurrency, formatName, formatPhoneNumber } from '../Utils/Helpers';
import { createClient } from '@supabase/supabase-js';
import OrderTimeline from '../components/OrderTimeline';

const supabase = createClient(
  'https://uctubrwiseslmvruhqof.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjdHVicndpc2VzbG12cnVocW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0NTk2ODIsImV4cCI6MjA0NzAzNTY4Mn0.7MNAuiYNKF8d14LDN91dzr8HSBdsSK4eTHCEHsY8BZA'
);

const OrderStatus = () => {
  const { id } = useParams(); // Get the method parameter from the URL
  const [orderId, setOrderId] = useState(id || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null); // State to store the order details
  const { setOrders } = useOrdersContext(); // Assuming your OrdersContext provides a setter for orders

  const handleCheckStatus = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Fetch the order from Supabase
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_id', orderId)
        .single();

      if (error) {
        throw new Error('Order not found. Please check your Order ID.');
      }

      setOrder(data); // Set the fetched order in the state
    } catch (err) {
      setError(err.message);
      setOrder(null); // Clear any previous order if there's an error
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div>
      {/* Show the form if no order is found, otherwise show order details */}
      {!order ? (
        <div className="h-[80vh] flex justify-center items-center border-b border-gray-200 gap-[10%] max-w-[85%] m-auto">
          <img
            src="https://cdn.shocho.co/sc-image/2/8/f/b/28fb80c3291655d0be6c9d237d6ab9f0.jpg"
            className="w-[40%] hidden md:block"
            alt="BBQ Image"
          />
          <div>
            <h1 className="text-[40px] font-bold text-left text-gray-800 mb-4 -mt-[100px] leading-[40px]">
              Check Order Status
            </h1>
            <p className="text-left">
              To keep you in the loop, we’ve made it easy to track the status of your order.
            </p>
            <p className="text-left">
              Just enter your Order ID below, and we'll pull up the latest info for you.
            </p>

            <div className="mt-[30px] w-full md:w-[80%] m-auto md:ml-0">
              <form onSubmit={handleCheckStatus} className="space-y-4">
                <div>
                  <label htmlFor="order_id" className="block text-sm font-medium text-gray-700">
                    Order ID
                  </label>
                  <input
                    type="text"
                    id="order_id"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Enter your Order ID"
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
                {error && <p className="text-sm text-red">{error}</p>}
                <button type="submit" disabled={loading} className="w-full py-2 px-4 bg-red text-white rounded border border-red hover:bg-white hover:text-red disabled:opacity-50">
                    {loading ? 'Checking...' : 'Check Status'}
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="border border-gray-200 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-12 min-h-[70vh] m-4 sm:m-6 lg:m-10">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h2 className="text-[30px] sm:text-xl lg:text-2xl text-center sm:text-left font-bold text-gray-800 mb-2 sm:mb-4">
              Order Details
            </h2>
            <h2 className="text-lg sm:text-xl lg:text-2xl text-center sm:text-right font-bold text-gray-800 mb-2 sm:mb-4">
              {order.order_id}
            </h2>
          </div>
          <OrderTimeline currentStep={order.status} />
          <div className="grid grid-cols-1 gap-4 lg:gap-6">
            <div className="border border-gray-200 rounded p-4 sm:p-6 lg:p-8 mb-4">
              <p className="font-semibold text-base sm:text-lg lg:text-xl mb-2 sm:mb-4">
                Shipping Information:
              </p>
              <p className="text-sm sm:text-base"><b>Full Name</b>: {order.user.name}</p>
              <p className="text-sm sm:text-base"><b>Email Address</b>: {order.user.email}</p>
              <p className="text-sm sm:text-base"><b>Phone Number</b>: {formatPhoneNumber(order.user.phone)}</p>
              <p className="text-sm sm:text-base"><b>Address</b>: {order.user.address}</p>
              <p className="text-sm sm:text-base"><b>City</b>: {order.user.city}</p>
              <p className="text-sm sm:text-base"><b>State</b>: {order.user.state}</p>
              <p className="text-sm sm:text-base"><b>Country</b>: {'USA'}</p>
              <p className="text-sm sm:text-base"><b>Postal Code</b>: {order.user.postalCode}</p>
            </div>
            <div>
              {order.products.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 grid grid-cols-1 sm:grid-cols-[1fr_3fr] lg:grid-cols-[1fr_8fr] gap-4 items-center p-4 sm:p-6 lg:p-8 rounded mb-4"
                >
                  <img
                    src={item.imageUrl}
                    className="w-full sm:w-[100px] object-cover mx-auto"
                    alt="Product Image"
                  />
                  <div>
                    <p className="text-sm sm:text-base">{item.title}</p>
                    <p className="text-sm sm:text-base font-semibold">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
