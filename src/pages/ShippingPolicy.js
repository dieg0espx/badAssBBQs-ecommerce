import React,{useEffect} from 'react';

const ShippingPolicy = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, []);

  return (
    <div className="shipping-policy-container p-6">
      <h1 className="text-3xl font-bold mb-4">Shipping Policy</h1>

      <p className="mb-4">
        At Badass BBQs, we recognize that timely and reliable shipping is a crucial part of your shopping experience. To ensure your order arrives safely and on time, we partner with a variety of trusted freight carriers.
      </p>

      <p className="mb-4">
        While we make every effort to ensure smooth delivery, please note that once your package is in the hands of the carrier, we cannot alter the shipping address or schedule a specific delivery date. We can provide estimated delivery times based on the information provided by the carrier, but these are subject to change.
      </p>

      <p className="mb-4">
        If you experience any issues with your delivery, our customer service team is here to help. You can reach us at <a href="tel:877-659-2619" className="text-blue-500">877-659-2619</a> for assistance.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Freight Carrier Shipments</h2>

      <p className="mb-4">
        For larger orders, we use freight carriers instead of standard couriers like UPS or FedEx. This type of delivery can be more complex, so we recommend reviewing the process ahead of time. Freight shipments are usually delivered on a pallet and may require a signature upon receipt.
      </p>

      <p className="mb-4">
        The carrier might also contact you to arrange a delivery window, or they may drop the package at a nearby location. You’ll receive detailed information about the delivery process in your shipping confirmation email.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Remote and Difficult-to-Access Locations</h2>

      <p className="mb-4">
        Please be aware that deliveries to remote or difficult-to-access locations may incur additional shipping fees. If we anticipate any delivery challenges or extra charges, one of our customer service representatives will contact you directly.
      </p>

      <p className="mb-4">
        If you foresee any issues with access to your delivery location, please let us know at the time of purchase so we can plan accordingly.
      </p>

      <h2 className="text-2xl font-semibold mb-2">In-Home Delivery</h2>

      <p className="mb-4">
        At this time, we do not offer in-home delivery without an additional charge, and availability for such services may vary.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Curbside and Freight Delivery</h2>

      <p className="mb-4">
        While we strive to provide the best possible shipping experience, please note that we are not responsible for shipping costs in the event that a carrier is unable to complete the delivery to your location.
      </p>

      <p className="mb-4">
        Freight shipments are typically delivered curbside, and you will be responsible for moving the package to your desired location. We recommend having at least two people available to assist with unloading.
      </p>

      <p>
        We hope this information helps ensure a smooth delivery. If you have any further questions, please don’t hesitate to contact our customer service team at <a href="tel:877-659-2619" className="text-blue-500">877-659-2619</a>.
      </p>
    </div>
  );
};

export default ShippingPolicy;
