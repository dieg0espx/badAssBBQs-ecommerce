import React,{useEffect} from 'react';

const ReturnPolicy = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, []);

  return (
    <div className="return-policy-container p-6">
      <h1 className="text-3xl font-bold mb-4">Return Policy</h1>

      <p className="mb-4">
        At Badass BBQ, we want to ensure that you're completely satisfied with your purchase. If for any reason you're not, we're here to help find a solution.
      </p>

      <p className="mb-4">
        Please note that in order to qualify for a return, all items must be in new and unused condition, in their original packaging, and returned within 30 days of delivery.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Non-Returnable Items</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Items that have been used or assembled</li>
        <li>Clearance items</li>
        <li>Warehouse deal items</li>
        <li>Custom-made, special-order, and made-to-order products</li>
        <li>Items marked as "non-returnable" in the product description</li>
        <li>Items returned outside of the 30-day return period</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-2">How to Initiate a Return</h2>
      <p className="mb-4">
        To initiate a return, please use the "Submit a Return Request" button. Please keep in mind that:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Shipping costs for both directions will be deducted from the refund</li>
        <li>You will receive an email confirmation of your request with further details on the return process</li>
        <li>An itemized Return Authorization, return shipping labels, and instructions will be sent to you upon approval</li>
        <li>Returns must be shipped within 30 days of receiving approval</li>
        <li>If your return is being shipped via freight truck, we will require a photo of the item before authorization</li>
        <li>Returns must be properly packaged in their original outer and inner packaging, including all original parts, manuals, pieces, and packing slips</li>
      </ul>

      <p className="mb-4">
        Once we receive and inspect the return, your refund will be processed. The time for refund processing will depend on the payment method used for the original order.
      </p>

      <p className="mb-4">
        Any items returned outside of this process or the 30-day period are not eligible for a refund. Any items returned without prior authorization will not be eligible for a refund.
      </p>

      <h2 className="text-2xl font-semibold mb-2">The Outdoor Plus (TOP) Return Policy</h2>
      <ul className="list-disc list-inside mb-4">
        <li>No returns on made-to-order goods.</li>
        <li>No returns on custom features, <strong>NO EXCEPTIONS</strong>.</li>
        <li>
          If a product is delivered incorrectly, it is the recipient's responsibility to notify TOP within 48 hours. TOP is not responsible for incorrect or damaged packages and shipments 48 hours after they have been received.
        </li>
      </ul>

      <p className="mb-4">
        Please call <a href="tel:909-460-5579" className="text-blue-500">(909) 460-5579</a> or email <a href="mailto:support@theoutdoorplus.com" className="text-blue-500">support@theoutdoorplus.com</a> for help with warranty, replacements, returns, or any support-related questions.
      </p>
    </div>
  );
};

export default ReturnPolicy;
