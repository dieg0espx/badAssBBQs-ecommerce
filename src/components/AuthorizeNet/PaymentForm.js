import React, { useState, useEffect } from "react";
import axios from "axios";

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    zipCode: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Dynamically load Accept.js
    const script = document.createElement("script");
    script.src = "https://js.authorize.net/v1/Accept.js";
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => console.log("Accept.js loaded");
    script.onerror = () => console.error("Error loading Accept.js");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Processing payment...");

    const { cardNumber, expirationDate, cvv, zipCode } = formData;

    if (!window.Accept) {
      setStatus("Payment processor not loaded. Please try again.");
      return;
    }

    const [month, year] = expirationDate.split("/");
    if (!month || !year) {
      setStatus("Invalid expiration date format. Use MM/YYYY.");
      return;
    }

    const secureData = {
      authData: {
        clientKey: process.env.REACT_APP_AUTHORIZE_CLIENT_KEY, // Replace with your Client Key
        apiLoginID: process.env.REACT_APP_AUTHORIZE_API_LOGIN_ID, // Replace with your API Login ID
      },
      cardData: {
        cardNumber,
        month,
        year,
        cardCode: cvv,
        zip: zipCode,
      },
    };

    if (!process.env.REACT_APP_AUTHORIZE_CLIENT_KEY || !process.env.REACT_APP_AUTHORIZE_API_LOGIN_ID) {
        setStatus("Payment processor keys are missing. Check your environment variables.");
        return;
    }

    window.Accept.dispatchData(secureData, responseHandler);
  };

  const responseHandler = async (response) => {
    if (response.messages.resultCode === "Error") {
      setStatus(`Payment Failed: ${response.messages.message[0].text}`);
    } else {
      const { opaqueData } = response;

      try {
        const backendResponse = await axios.post(
          "https://server-badassbbqs.vercel.app/api/payment", // Replace with your backend endpoint
          {
            opaqueData,
            amount: "10.00", // Replace with dynamic amount if needed
          }
        );

        setStatus(
          `Payment successful! Transaction ID: ${backendResponse.data.transactionId}`
        );
      } catch (error) {
        const errorMessage =
          error.response?.data?.error || "Failed to process payment.";
        setStatus(`Payment failed: ${errorMessage}`);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Authorize.net Payment</h2>
      {status && <p className={`mb-4 ${status.includes("Failed") ? "text-red-500" : "text-green-500"}`}>{status}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="Card Number"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Expiration Date (MM/YYYY)</label>
          <input
            type="text"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            placeholder="MM/YYYY"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">CVV</label>
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            placeholder="CVV"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">ZIP Code</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="ZIP Code"
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
