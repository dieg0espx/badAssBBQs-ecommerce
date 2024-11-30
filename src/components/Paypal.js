// import React from 'react';
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { useNavigate } from 'react-router-dom';


// const Paypal = ({total}) => {
//     const paypalClient = process.env.REACT_APP_PAYPAL_CLIENT
//     const navigate = useNavigate(); // Initialize navigate for redirection

//     const initialOptions = {
//         "client-id": paypalClient,
//         currency: "USD",
//         intent: "capture"
//     };

//     const createOrder = (data, actions) => {
//         return actions.order.create({
//             purchase_units: [
//                 {
//                     amount: {
//                         currency_code: "USD",
//                         value: total 
//                     }
//                 }
//             ]
//         });
//     };

//     const onApprove = (data, actions) => {
//         return actions.order.capture().then(function (details) {
//             actions.close && actions.close();
//             navigate('/checkout-authorized/paypal');
//         });
//     };

//     return (
//         <PayPalScriptProvider options={initialOptions}>
//             <PayPalButtons
//                 fundingSource="paypal"
//                 style={{
//                     layout: "horizontal",
//                     color: "white",
//                     shape: "rect",
//                     label: "pay",
//                     height: 43
//                 }}
//                 createOrder={(data, actions) => createOrder(data, actions)}
//                 onApprove={(data, actions) => onApprove(data, actions)}
//             />
//         </PayPalScriptProvider>
//     );
// };

// export default Paypal;


import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from 'react-router-dom';

const Paypal = ({ total }) => {
  const paypalClient = process.env.REACT_APP_PAYPAL_CLIENT;
  const navigate = useNavigate();

  const initialOptions = {
    "client-id": paypalClient,
    currency: "USD",
    intent: "capture",
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(() => {
      navigate('/checkout-authorized/paypal');
    });
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "pay",
            height: 50,
          }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={(err) => console.error("PayPal Button Error:", err)}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default Paypal;
