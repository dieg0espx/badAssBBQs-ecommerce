import React, { useEffect, useState } from 'react';
import { useOrdersContext } from '../context/OrdersContext'; // Assuming OrdersContext is set up

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://uctubrwiseslmvruhqof.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjdHVicndpc2VzbG12cnVocW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0NTk2ODIsImV4cCI6MjA0NzAzNTY4Mn0.7MNAuiYNKF8d14LDN91dzr8HSBdsSK4eTHCEHsY8BZA'
);


const OrderStatus = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
      console.log(data);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="h-[80vh] flex justify-center items-center border-b border-gray-200  gap-[10%]">
      <img src='https://cdn.shocho.co/sc-image/2/8/f/b/28fb80c3291655d0be6c9d237d6ab9f0.jpg' className='w-[40%] hidden md:block' />
      <div>
        <h1 className="text-[40px] font-bold text-left text-gray-800 mb-4 text-center md:text-left"> Check Order Status </h1>
        <p className='text-center md:text-left'>To keep you in the loop, we’ve made it easy to track the status of your order. </p>
        <p className='text-center md:text-left'>Just enter your Order ID below, and we'll pull up the latest info for you.</p>

        <div className="mt-[30px] w-[80%] mx-auto md:ml-[0]"> 
            <form onSubmit={handleCheckStatus} className="space-y-4">
              <div>
                <label htmlFor="order_id" className="block text-sm font-medium text-gray-700"> Order ID </label>
                <input
                  type="text"
                  id="order_id"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter your Order ID"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              {error && ( <p className="text-sm text-red">{error}</p> )}
              <button type="submit" disabled={loading} className="w-full py-2 px-4 bg-red text-white rounded border border-red hover:bg-white hover:text-red disabled:opacity-50">
                {loading ? 'Checking...' : 'Check Status'}
              </button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
