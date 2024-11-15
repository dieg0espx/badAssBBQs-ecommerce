import React, { useEffect, useState } from 'react';
import { useOrdersContext } from '../context/OrdersContext'; // Assuming OrdersContext is set up
import { toCamelCase, formatCurrency, formatName, formatPhoneNumber } from '../Utils/Helpers';
import { createClient } from '@supabase/supabase-js';
import OrderTimeline from '../components/OrderTimeline';

const supabase = createClient(
  'https://uctubrwiseslmvruhqof.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjdHVicndpc2VzbG12cnVocW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0NTk2ODIsImV4cCI6MjA0NzAzNTY4Mn0.7MNAuiYNKF8d14LDN91dzr8HSBdsSK4eTHCEHsY8BZA'
);

const OrderStatus = () => {
  const [orderId, setOrderId] = useState('');
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
        <div className="h-[80vh] flex justify-center items-center border-b border-gray-200 gap-[10%]">
          <img
            src="https://cdn.shocho.co/sc-image/2/8/f/b/28fb80c3291655d0be6c9d237d6ab9f0.jpg"
            className="w-[40%] hidden md:block"
            alt="BBQ Image"
          />
          <div>
            <h1 className="text-[40px] font-bold text-center md:text-left text-gray-800 mb-4">
              Check Order Status
            </h1>
            <p className="text-center md:text-left">
              To keep you in the loop, we’ve made it easy to track the status of your order.
            </p>
            <p className="text-center md:text-left">
              Just enter your Order ID below, and we'll pull up the latest info for you.
            </p>

            <div className="mt-[30px] w-[80%] mx-auto md:ml-0">
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
        <div className="border border-gray-200 px-[30px] py-[50px] min-h-[70vh] m-[50px]">
            <div className='flex flex-col  sm:flex-row justify-between align-center '>
                <h2 className="text-2xl text-center sm:text-left font-bold text-gray-800 mb-4">Order Details</h2>
                <h2 className="text-2xl text-center sm:text-right font-bold text-gray-800 mb-4">{order.order_id}</h2>
            </div>
            <OrderTimeline currentStep={order.status} />
            <div className='grid grid-cols-1 gap-[20px]'>
                <div className="border border-gray-200 rounded px-[30px] py-[30px] mb-[10px]">
                    <p className="font-semibold text-[20px] mb-[10px]"> Shipping Information: </p>
                    <p className="text-[15px]"> <b>Full Name</b>:  {order.user.name}</p>
                    <p className="text-[15px]"> <b>Email Address</b> :  {order.user.email} </p>
                    <p className="text-[15px]"> <b>Phone Number</b> :  {formatPhoneNumber(order.user.phone)} </p>
                    <p className="text-[15px]"> <b>Address</b> :  {order.user.address} </p>
                    <p className="text-[15px]"> <b>City</b> :  {order.user.city} </p>
                    <p className="text-[15px]"> <b>State</b> :  {order.user.state} </p>
                    <p className="text-[15px]"> <b>Country</b> :  {'USA'} </p>
                    <p className="text-[15px]"> <b>Postal Code</b> :  {order.user.postalCode} </p>
                </div> 
                <div>
                    {order.products.map((item, index) => (
                      <div key={index} className="border border-gray-200 grid grid-cols-[1fr_8fr] gap-10 items-center px-[30px] py-[10px] rounded mb-[10px]">
                       <img src={item.imageUrl} className="w-[100px] object-cover m-auto" alt="Product Image"/>
                       <div>
                         <p className="text-[15px]">{item.title}</p>
                         <p className="text-[15px] font-semibold">{item.price}</p>
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
