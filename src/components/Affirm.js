import React, { useEffect } from 'react';
import axios from 'axios';

const Affirm = ({ orderDetails }) => {
  useEffect(() => {
    if (window.affirm) {
      window.affirm.ui.ready(() => {
        console.log('Affirm is ready to use');
      });
    }
  }, []);

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/affirm/create-checkout', orderDetails);
      const { checkout_token } = response.data;

      if (window.affirm && checkout_token) {
        window.affirm.checkout({ checkout_token });
        window.affirm.checkout.open();
      }
    } catch (error) {
      console.error('Failed to initiate Affirm checkout:', error);
      alert('There was an error initiating the Affirm checkout. Please try again.');
    }
  };

  return <button onClick={handleCheckout}>Pay with Affirm</button>;
};

export default Affirm;
