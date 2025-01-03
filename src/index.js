import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

// Import Stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your Publishable Key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY); 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <BrowserRouter>
      <ScrollToTop />
      {/* Wrap your app in the Stripe Elements provider */}
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </BrowserRouter>
  
);

// For performance measurement (optional)
reportWebVitals();
