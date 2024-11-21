const loadAcceptJs = () => {
    const script = document.createElement("script");
    script.src = "https://js.authorize.net/v1/Accept.js";
    script.async = true;
    document.body.appendChild(script);
  };
  
  export const handlePayment = async (formData) => {
    return new Promise((resolve, reject) => {
      const { cardNumber, expirationDate, cvv, zipCode } = formData;
  
      const secureData = {
        authData: {
          clientKey: "YOUR_CLIENT_KEY", // Replace with your Client Key
          apiLoginID: "YOUR_API_LOGIN_ID", // Replace with your API Login ID
        },
        cardData: {
          cardNumber,
          month: expirationDate.split("/")[0],
          year: expirationDate.split("/")[1],
          cardCode: cvv,
          zip: zipCode,
        },
      };
  
      const responseHandler = (response) => {
        if (response.messages.resultCode === "Error") {
          reject(new Error(response.messages.message[0].text));
        } else {
          const { opaqueData } = response;
          resolve(`Payment successful. Token: ${opaqueData.dataValue}`);
        }
      };
  
      Accept.dispatchData(secureData, responseHandler);
    });
  };
  
  // Load Accept.js when the app starts
  loadAcceptJs();
  