import React, { useState, useEffect } from 'react';
import { useAcceptJs } from 'react-acceptjs';
import axios from 'axios';
import logo from "../images/authorizeLogo.png";
import { toUppercase } from "../Utils/Helpers";



const PaymentForm = (props) => {
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


  useEffect(() => {
    // Load the Accept.js script when the component mounts
    loadAcceptJsScript();

    // Cleanup: Remove the script when the component unmounts (optional)
    return () => {
      const script = document.querySelector('script[src="https://js.authorize.net/v1/Accept.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const loadAcceptJsScript = () => {
    const script = document.createElement("script");
    script.src = "https://js.authorize.net/v1/Accept.js";
    script.type = "text/javascript";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);
  };


//   const handleSubmit = async (e) => {
//     // console.log('API LOGIN ID');
//     // console.log(authData.apiLoginID);
//     // console.log('CLIENT KEY');
//     // console.log(authData.clientKey);
    
  
//     console.log('Handle Submit');
//     e.preventDefault();
//     setStatus('Processing payment...');

//     try {
//         // Validate card data before dispatching
//         if (!cardData.cardNumber || !cardData.month || !cardData.year || !cardData.cardCode) {
//             setStatus('Please fill in all required fields.');
//             return;
//         } else {
//             console.log('Card Data:', cardData);
//         }

//         // Dispatch the card data to Accept.js
//         const response = await dispatchData({ cardData });
//         console.log('Dispatch Data Response:', response);

//         if (response && response.messages && response.messages.resultCode === 'Ok') {
//             const { opaqueData } = response;
//             console.log('Opaque Data:', opaqueData);

//             try {
//                 const backendResponse = await axios.post(
//                     'https://server-badassbbqs.vercel.app/api/payment',
//                     {
//                         opaqueData,
//                         amount: props.totalCost,
//                     }
//                 );
//                 console.log('Backend Response:', backendResponse);

//                 if (backendResponse.status === 200) {
//                     setStatus(
//                         `Payment successful! Transaction ID: ${backendResponse.data.transactionId}`
//                     );
//                     window.location.href = '/checkout-authorized/authorize';
//                 } else {
//                     throw new Error('Unexpected backend response.');
//                 }
//             } catch (backendError) {
//                 console.error('Backend Error:', backendError);
//                 const errorMessage =
//                     backendError.response?.data?.error || 'Failed to process payment on the server.';
//                 setStatus(`Payment failed: ${errorMessage}`);
//             }
//         } else {
//             const errorMessage = response?.messages?.message?.[0]?.text || 'Unexpected error during dispatch.';
//             setStatus(`Payment failed: ${errorMessage}`);
//         }
//     } catch (err) {
//         console.error('Error during dispatch:', err); // Log the full error
//         const errorMessage = err.message || 'An unexpected error occurred.';
//         setStatus(`Payment error: ${errorMessage}`);
//     }
// };


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
          { opaqueData, amount: '10.00' }
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
    number.replace(/\s/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");

  return (
    <div>
      <img src={logo} alt="Authorize Logo" className="max-w-[200px] ml-auto" />
       {/* Credit Card Preview */}
       <div className="w-full flex items-center justify-center mb-[15px]">
          <div className="w-full h-[230px] bg-red text-white rounded-lg p-6 shadow-2xl relative">
            <div className="flex justify-between items-center">
              <div className="text-sm uppercase tracking-wide font-semibold">Credit Card</div>
              <div className="w-10 h-6 bg-yellow-300 rounded-sm"></div>
            </div>
            <div className="text-xl font-semibold tracking-widest mt-6">
              {cardData.cardNumber
                ? formatCardNumber(cardData.cardNumber)
                : "•••• •••• •••• ••••"}
            </div>
            <div className="flex justify-between items-center mt-6">
              <div>
                <div className="text-xs uppercase tracking-wide">Expires</div>
                <div className="text-sm font-medium">
                  {cardData.month && cardData.year
                    ? `${cardData.month}/${cardData.year.slice(-2)}`
                    : "MM/YY"}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wide">CVV</div>
                <div className="text-sm font-medium">{cardData.cardCode || "•••"}</div>
              </div>
            </div>
            <div className="absolute bottom-4 left-6">
              <div className="text-xs uppercase tracking-wide">Cardholder</div>
              <div className="text-sm font-medium">
                {toUppercase(props.name || "YOUR NAME")}
              </div>
            </div>
          </div>
       </div>
       {status && <p>{status}</p>}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="w-full px-5 py-6 border border-gray-200 rounded-md mb-5 mt-5">
          <div className="flex space-x-4 mb-6">
            <div className="w-full">
                <label className='block text-center text-[12px] text-gray-400 mb-[5px]'>Card Number</label>
                <input
                  type="tel"
                  name="cardNumber"
                  value={cardData.cardNumber}
                  onChange={handleChange}
                  placeholder="Card Number"
                  required
                  maxLength={16}
                  className='w-full border border-gray-300 rounded px-4 py-2 text-center'
                />
            </div>
          </div>
          <div className="flex space-x-4 w-full">
            <div className="w-1/3">
              <label className='block text-center text-[12px] text-gray-400 mb-[5px]'>Exp Month</label>
              <input
                type="tel"
                name="month"
                value={cardData.month}
                onChange={handleChange}
                placeholder="MM"
                required
                maxLength={2}
                className='w-full border border-gray-300 rounded px-4 py-2 text-center'
              />
            </div>
            <div className="w-1/3">
              <label className='block text-center text-[12px] text-gray-400 mb-[5px]'>Exp Year</label>
              <input
                type="tel"
                name="year"
                value={cardData.year.slice(2)} // Display only the last two digits
                onChange={(e) => {
                  const { value } = e.target;
                  if (/^\d{0,2}$/.test(value)) { // Ensure input is only up to two digits
                    setCardData((prev) => ({
                      ...prev,
                      year: value ? `20${value}` : "", // Prepend "20" to the input value
                    }));
                  }
                }}

                placeholder="YYYY"
                required
                maxLength={4}
                className='w-full border border-gray-300 rounded px-4 py-2 text-center'
              />
            </div>
            <div className="w-1/3">
               <label className='block text-center text-[12px] text-gray-400 mb-[5px]'>CVV</label>
                <input
                  type="tel"
                  name="cardCode"
                  value={cardData.cardCode}
                  onChange={handleChange}
                  placeholder="CVV"
                  required
                  className='w-full border border-gray-300 rounded px-4 py-2 text-center'
                />
            </div>
          </div>
        </div>
        <button type="submit" className={`w-full py-3 text-white font-semibold rounded-lg border ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-red hover:bg-white hover:text-red"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`} disabled={loading || error}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;