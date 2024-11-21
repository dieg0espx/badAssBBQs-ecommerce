import React, { useState } from 'react';
import { useAcceptJs } from 'react-acceptjs';
import axios from 'axios';


const PaymentForm = () => {
  const authData = {
    apiLoginID: process.env.REACT_APP_AUTHORIZE_API_LOGIN_ID,
    clientKey: process.env.REACT_APP_AUTHORIZE_CLIENT_KEY,
  };

  const { dispatchData, loading, error } = useAcceptJs({ authData });
  const [cardData, setCardData] = useState({
    cardNumber: '',
    month: '',
    year: '',
    cardCode: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Processing payment...');
  
    try {
      // Validate card data before dispatching
      if (!cardData.cardNumber || !cardData.month || !cardData.year || !cardData.cardCode) {
        setStatus('Please fill in all required fields.');
        return;
      }
  
      // Dispatch the card data to Accept.js
      const response = await dispatchData({ cardData });
  
      // Check if the response is successful
      if (response.messages.resultCode === 'Ok') {
        const { opaqueData } = response;
  
        try {
          // Send opaqueData to your backend server for further processing
          const backendResponse = await axios.post(
            'https://server-badassbbqs.vercel.app/api/payment', // Replace with your backend endpoint
            {
              opaqueData,
              amount: '100.00', // Replace with the actual amount
            }
          );
  
          if (backendResponse.status === 200) {
            setStatus(
              `Payment successful! Transaction ID: ${backendResponse.data.transactionId}`
            );
          } else {
            throw new Error('Unexpected backend response.');
          }
        } catch (backendError) {
          const errorMessage =
            backendError.response?.data?.error || 'Failed to process payment on the server.';
          setStatus(`Payment failed: ${errorMessage}`);
        }
      } else {
        // Handle errors returned by Accept.js
        setStatus(`Payment failed: ${response.messages.message[0].text}`);
      }
    } catch (err) {
      // Handle unexpected errors during dispatch
      setStatus(`Payment error: ${err.message}`);
    }
  };
  

  return (
    <div>
      <h2>Authorize.net Payment</h2>
      {status && <p>{status}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={cardData.cardNumber}
            onChange={handleChange}
            placeholder="Card Number"
            required
          />
        </div>
        <div>
          <label>Expiration Month (MM)</label>
          <input
            type="text"
            name="month"
            value={cardData.month}
            onChange={handleChange}
            placeholder="MM"
            required
          />
        </div>
        <div>
          <label>Expiration Year (YYYY)</label>
          <input
            type="text"
            name="year"
            value={cardData.year}
            onChange={handleChange}
            placeholder="YYYY"
            required
          />
        </div>
        <div>
          <label>CVV</label>
          <input
            type="text"
            name="cardCode"
            value={cardData.cardCode}
            onChange={handleChange}
            placeholder="CVV"
            required
          />
        </div>
        <button type="submit" disabled={loading || error}>
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
