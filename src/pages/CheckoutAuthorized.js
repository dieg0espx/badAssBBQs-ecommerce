import React, { useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { usePurchase } from '../context/PurchaseContext';
import { useOrdersContext } from '../context/OrdersContext';
import gif from '../images/gifEcommerce.gif';
import { generateOrderId } from '../Utils/Helpers';

function CheckoutAuthorized() {
  const { method } = useParams(); // Get the method parameter from the URL
  const serverURL = process.env.REACT_APP_SERVER_URL;
  const { orderData, resetPurchase } = usePurchase();
  const { addOrder } = useOrdersContext();

  // Add a ref to prevent duplicate execution
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return; // Skip if it has already run
    hasRun.current = true;

    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
    saveOrder(); // Add the order to the database
    resetPurchase();
  }, []);

  // Function to send email confirmation
  const sendEmailConfirmation = async (order_id) => {    
    try {
      const response = await fetch(`${serverURL}/newPurchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderData, order_id }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error sending email confirmation:', error);
    }
  };

  // Function to save the order to the database
  const saveOrder = async () => {
    console.log('Saving NEW ORDER ...');
    
    const newOrder = {
      order_id: await generateOrderId(), // Generate a unique order ID
      user: {
        name: orderData.name,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address,
        city: orderData.city,
        state: orderData.state,
        postalCode: orderData.postalCode,
        country: orderData.country,
      },
      products: orderData.products,
      payment_method: method, 
      status: 'Approved', 
    };
    sendEmailConfirmation(newOrder.order_id);
    addOrder(newOrder); // Add the order to the OrdersContext
  };

  return (
    <div className="container text-center mt-5 h-[80vh] ">
      <div className="w-[80%] m-auto mt-[10vh]">
        <img src={gif} className="m-auto scale-[1.5] z-0 relative" alt="Order Complete" />
        <h1 className="text-red mb-3 text-[30px] -mt-[50px] z-20 relative">Thank You for Your Order!</h1>

        <p className="relative">
          <strong>Your payment has been successfully processed, and your order is complete.</strong>
        </p>
        <p className="relative">
          A confirmation has been sent to the email you provided. Please check your inbox for more details.
        </p>
      </div>
    </div>
  );
}

export default CheckoutAuthorized;
