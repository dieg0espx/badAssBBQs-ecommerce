import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from 'react-router-dom';


const Paypal = ({total}) => {
    const navigate = useNavigate(); // Initialize navigate for redirection

    const initialOptions = {
        "client-id": "AbKKJ_keuxt7l-0XAeeZqW3rqhcfFOeb50Sy8AlpG17Hwp3IcbqXrFuGEQ1kQLn4w3zZZJCCYIfZD-Pf",
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
            navigate('/checkout-authorized');
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
