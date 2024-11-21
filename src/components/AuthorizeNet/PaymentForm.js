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
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Authorize.net Payment</h2>
    {status && (
      <p
        className={`mb-4 ${
          status.includes("Failed") ? "text-red-500" : "text-green-500"
        }`}
      >
        {status}
      </p>
    )}
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={cardData.cardNumber}
          onChange={handleChange}
          placeholder="Card Number"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expiration Month (MM)
          </label>
          <input
            type="text"
            name="month"
            value={cardData.month}
            onChange={handleChange}
            placeholder="MM"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expiration Year (YYYY)
          </label>
          <input
            type="text"
            name="year"
            value={cardData.year}
            onChange={handleChange}
            placeholder="YYYY"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">CVV</label>
        <input
          type="text"
          name="cardCode"
          value={cardData.cardCode}
          onChange={handleChange}
          placeholder="CVV"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading || error}
        className={`w-full py-2 px-4 text-white font-semibold rounded-lg shadow-md ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  </div>
  
  );
};

export default PaymentForm;
