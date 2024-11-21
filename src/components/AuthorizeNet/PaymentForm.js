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
      if (!cardData.cardNumber || !cardData.month || !cardData.year || !cardData.cardCode) {
        setStatus('Please fill in all required fields.');
        return;
      }

      const response = await dispatchData({ cardData });
      if (response.messages.resultCode === 'Ok') {
        const { opaqueData } = response;

        try {
          const backendResponse = await axios.post(
            'https://server-badassbbqs.vercel.app/api/payment',
            { opaqueData, amount: '100.00' }
          );

          if (backendResponse.status === 200) {
            setStatus(`Payment successful! Transaction ID: ${backendResponse.data.transactionId}`);
          } else {
            throw new Error('Unexpected backend response.');
          }
        } catch (backendError) {
          setStatus(`Payment failed: ${backendError.response?.data?.error || 'Server error.'}`);
        }
      } else {
        setStatus(`Payment failed: ${response.messages.message[0].text}`);
      }
    } catch (err) {
      setStatus(`Payment error: ${err.message}`);
    }
  };

  const formatCardNumber = (number) =>
    number.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();

  return (
    <div className="flex items-center justify-center px-4">
      <div className="flex gap-[40px] flex-col w-[400px] ">
      <h2> Authorize.Net</h2>
        {/* Credit Card Preview */}
        <div className="w-full flex items-center justify-center">
          <div className="w-full h-[250px] bg-red text-white rounded-lg p-6 shadow-md relative">
            {/* Card Header */}
            <div className="flex justify-between items-center">
              <div className="text-sm uppercase tracking-wide font-semibold">Credit Card</div>
              <div className="w-10 h-6 bg-yellow-300 rounded-sm"></div> {/* Simulates a chip */}
            </div>

            {/* Card Number */}
            <div className="text-xl font-semibold tracking-widest mt-6">
              {cardData.cardNumber
                ? formatCardNumber(cardData.cardNumber)
                : '•••• •••• •••• ••••'}
            </div>
              
            {/* Expiration and CVV */}
            <div className="flex justify-between items-center mt-6">
              <div>
                <div className="text-xs uppercase tracking-wide">Expires</div>
                <div className="text-sm font-medium">
                  {cardData.month && cardData.year
                    ? `${cardData.month}/${cardData.year.slice(-2)}`
                    : 'MM/YY'}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide">CVV</div>
                <div className="text-sm font-medium">
                  {cardData.cardCode || '•••'}
                </div>
              </div>
            </div>
                  
            {/* Cardholder Name */}
            <div className="absolute bottom-4 left-6">
              <div className="text-xs uppercase tracking-wide">Cardholder</div>
              <div className="text-sm font-medium">
                {cardData.cardHolder || 'John Doe'}
              </div>
            </div>
          </div>
        </div>
        {/* Payment Form */}
        <div className="w-full p-8 border border-gray-200 ">
          {status && (
            <p
              className={`text-center mb-4 ${
                status.toLowerCase().includes('failed') ? 'text-red-500' : 'text-green-500'
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
                placeholder="1234 5678 9123 0000"
                className="w-full border-gray-300 rounded-lg shadow-sm px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                maxLength={19}
                required
              />
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Expiry Month (MM)</label>
                <select
                  name="month"
                  value={cardData.month}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-lg shadow-sm px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="" disabled>Select Month</option>
                  {[...Array(12)].map((_, index) => {
                    const month = (index + 1).toString().padStart(2, '0');
                    return (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">Expiry Year (YYYY)</label>
                <select
                  name="year"
                  value={cardData.year}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-lg shadow-sm px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="" disabled>Select Year</option>
                  {Array.from({ length: 10 }, (_, index) => {
                    const year = new Date().getFullYear() + index;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CVV</label>
              <input
                type="text"
                name="cardCode"
                value={cardData.cardCode}
                onChange={handleChange}
                placeholder="123"
                className="w-full border-gray-300 rounded-lg shadow-sm px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                maxLength={3}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full py-3 text-white font-semibold rounded-lg border border-red ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red hover:bg-white hover:text-red'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              disabled={loading || error}
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
