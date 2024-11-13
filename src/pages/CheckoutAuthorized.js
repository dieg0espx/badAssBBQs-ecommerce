import React, { useEffect } from 'react';
import { usePurchase } from '../context/PurchaseContext'; // Make sure to adjust the path accordingly
import gif from '../images/gifEcommerce.gif'

function CheckoutAuthorized() {
  const { orderData } = usePurchase();

  useEffect(()=>{
    if(orderData){
      console.log(orderData);
      sentEmailConfirmation()
    }
  },[orderData])


  const sentEmailConfirmation = async () => {
    try {
      const response = await fetch('http://localhost:8080/newPurchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderData }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error sending email confirmation:', error);
    }
  };
  
  

  return (
    <div className="container text-center mt-5 h-[80vh] ">
      <div className='w-[80%] m-auto mt-[10vh]'>
          {/* <i className="bi bi-check-circle-fill text-red display-3 mb-3 text-[50px] "></i> */}
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
}

export default CheckoutAuthorized;


