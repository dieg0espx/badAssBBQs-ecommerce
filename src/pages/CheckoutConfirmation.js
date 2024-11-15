import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import gif from '../images/gifEcommerce.gif'

const CheckoutConfirmation = () => {
  const [transactionId, setTransactionId] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Retrieve checkout_token from URL
    const searchParams = new URLSearchParams(location.search);
    const checkoutToken = searchParams.get("checkout_token");

    if (checkoutToken) {
      // Send checkoutToken to the backend for authorization
      axios.post("http://localhost:8080/api/authorize-charge", { checkoutToken })
        .then(response => {
          setTransactionId(response.data.transactionId);
        })
        .catch(error => {
          console.error("Error authorizing charge:", error);
          setError("Failed to authorize payment. Please contact support.");
        });
    } else {
      setError("Checkout token not found in URL.");
    }
  }, [location]);

  return (
    <div className="container text-center mt-5 h-[80vh] ">
      <div className='w-[80%] m-auto mt-[10vh]'>
          <img src={gif} className='m-auto scale-[1.5] z-0  relative'/>
          <h1 className="text-red mb-3 text-[30px] -mt-[50px] z-20 relative">Thank You for Your Order!</h1>

          <p className="relative">
            <strong>Your payment has been successfully processed, and your order is complete.</strong>
          </p>
          <p className="relative">
            A confirmation has been sent to the email you provided.Please check your inbox for more details.
          </p>
      </div>
    </div>
  );
};

export default CheckoutConfirmation;
