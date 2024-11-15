import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://uctubrwiseslmvruhqof.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjdHVicndpc2VzbG12cnVocW9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0NTk2ODIsImV4cCI6MjA0NzAzNTY4Mn0.7MNAuiYNKF8d14LDN91dzr8HSBdsSK4eTHCEHsY8BZA'
);

// Create the context
const OrdersContext = createContext();

// Provider component
export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from Supabase
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('orders').select();
        if (error) throw error;
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const addOrder = async (newOrder) => {
    console.log("Calling addOrder:", newOrder); // Confirm addOrder is called only once
    const { order_id, user, products, payment_method, status } = newOrder;

    try {
      const { data, error } = await supabase.from('orders').insert([
        {
          order_id,                  
          user,                     
          products,                 
          payment_method,            
          status,                   
        },
      ]);

      console.log("Insert response data:", data);
      console.log("Insert response error:", error);

      if (error) throw error;

      if (Array.isArray(data)) {
        setOrders((prevOrders) => [...prevOrders, ...data]);
      } else {
        console.error("Expected data to be an array but got:", data);
      }
    } catch (err) {
      console.error("Error in addOrder:", err.message);
      setError(err.message);
    }
  };

  

  // Context value
  const value = { orders, loading, error, addOrder };

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
};

// Hook to use the OrdersContext
export const useOrdersContext = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrdersContext must be used within an OrdersProvider');
  }
  return context;
};
