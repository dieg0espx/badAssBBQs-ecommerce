import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Paypal = ({total}) => {
    const initialOptions = {
        "client-id": "Ad8JrQFTg3gZny0Ez2P-xd0ZCDYFWbSXjXAr95-z0P_LABYuauneCkiakhtJvAyVMTQSQDJy-RVZ9A0s",
        currency: "USD",
        intent: "capture"
    };

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: total 
                    }
                }
            ]
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            actions.close && actions.close();
            alert("Transaction completed by " + details.payer.name.given_name);
        });
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
                fundingSource="paypal"
                style={{
                    layout: "horizontal",
                    color: "silver",
                    shape: "rect",
                    label: "paypal"
                }}
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
            />
        </PayPalScriptProvider>
    );
};

export default Paypal;