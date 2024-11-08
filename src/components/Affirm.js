import React, { useEffect } from 'react';

const Affirm = () => {
  useEffect(() => {
    if (window.affirm) {
      window.affirm.ui.ready(() => {
        // Affirm is ready to use
      });
    }
  }, []);

  const handleCheckout = () => {
    if (window.affirm) {
      const checkoutData = {
        // Populate with your checkout data
      };
      window.affirm.checkout(checkoutData);
      window.affirm.checkout.open();
    }
  };

  return <button onClick={handleCheckout}>Pay with Affirm</button>;
};

export default Affirm;
