// AffirmConfirmation.js
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AffirmConfirmation = () => {
  const [transactionId, setTransactionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const checkoutToken = searchParams.get("checkout_token");
    console.log(checkoutToken);
    

    if (checkoutToken) {
      // Send checkoutToken to the backend for authorization
      axios.post("https://server-badassbbqs.vercel.app/api/authorize-charge", { checkoutToken })
        .then(response => {
          setTransactionId(response.data.transactionId);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error authorizing charge:", error);
          setError("Failed to authorize payment. Please contact support.");
          setLoading(false);
        });
    } else {
      setError("No checkout token provided.");
      setLoading(false);
    }
  }, [location]);

  return (
    <div className="confirmation-page">
      {loading ? (
        <p>Loading your order confirmation...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div>
          <h2>Thank you for your purchase!</h2>
          <p>Your transaction was successful.</p>
          <p><strong>Transaction ID:</strong> {transactionId}</p>
        </div>
      )}
    </div>
  );
};

export default AffirmConfirmation;
