import React, { useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import logo from '../images/stripe_logo.png';
import { toUppercase } from '../Utils/Helpers';
import { useNavigate } from 'react-router-dom';


const PaymentForm = (props) => {
  const navigate = useNavigate(); // Initialize navigate for redirection
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPaymentStatus('Processing payment...');

    if (!stripe || !elements) {
      return; // Stripe.js has not loaded yet
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    try {
      // Call your backend to create a PaymentIntent
      const { data: clientSecret } = await axios.post(
        'https://server-badassbbqs.vercel.app/api/stripe',
        { amount: props.total*100 } // Amount in cents (e.g., $10.00)
      );

      // Confirm the card payment using the clientSecret
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: props.customerName,
          },
        },
      });

      if (error) {
        setPaymentStatus(`Payment failed: ${error.message}`);
      } else if (paymentIntent.status === 'succeeded') {
        setPaymentStatus('Payment successful!');
        navigate('/checkout-authorized/stripe');
      }
    } catch (err) {
      console.error('Error during payment:', err);
      setPaymentStatus('Payment failed: An unexpected error occurred.');
    }
  };


  const handleCardChange = (event, type) => {
    if (event.complete) {
      console.log(`${type} entered:`, event.value);
    } else {
      console.log(`${type} input is incomplete.`);
    }
  };



  const cardStyle = {
    style: {
      base: {
        fontSize: '16px',
        color: '#32325d',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
      },
    },
  };



  return (
    <div className="py-[50px] px-[20px]">
      <img src={logo} className="w-[150px] mb-[30px]" alt="Stripe Logo" />
      <form onSubmit={handleSubmit}>

      <div className="mb-4">
          <label htmlFor="card-number" className="block mb-2 text-sm font-medium text-gray-700">
            Customer Name
          </label>
            <p className='text-gray-400 border border-gray-300 p-[5px] rounded-md'> {toUppercase(props.customerName)}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="card-number" className="block mb-2 text-sm font-medium text-gray-700">
            Card Number
          </label>
          <CardNumberElement
            id="card-number"
            options={cardStyle}
            onChange={(e) => setError(e.error?.message || null)}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="card-expiry" className="block mb-2 text-sm font-medium text-gray-700">
            Expiration Date
          </label>
          <CardExpiryElement
            id="card-expiry"
            options={cardStyle}
            onChange={(e) => setError(e.error?.message || null)}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="card-cvc" className="block mb-2 text-sm font-medium text-gray-700">
            CVC
          </label>
          <CardCvcElement
            id="card-cvc"
            options={cardStyle}
            onChange={(e) => setError(e.error?.message || null)}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <button
          type="submit"
          disabled={!stripe}
          style={{
            backgroundColor: !stripe ? '#e0e0e0' : '#635bff',
            color: !stripe ? '#a0a0a0' : '#ffffff',
            fontSize: '16px',
            padding: '10px 24px',
            borderRadius: '5px',
            border: 'none',
            cursor: !stripe ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s ease',
            width: '80%',
            display: 'block',
            margin: '40px auto 0 auto',
          }}
          onMouseEnter={(e) => {
            if (stripe) {
              e.target.style.backgroundColor = '#7a70ff';
            }
          }}
          onMouseLeave={(e) => {
            if (stripe) {
              e.target.style.backgroundColor = '#635bff';
            }
          }}
        >
          Pay Now
        </button>
      </form>
      <p className="mt-4">{paymentStatus}</p>
    </div>
  );
};

export default PaymentForm;
