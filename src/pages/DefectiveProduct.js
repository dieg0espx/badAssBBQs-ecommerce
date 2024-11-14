import React,{useEffect} from 'react';

const DefectiveProduct = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, []);

  return (
    <div className="defective-product-container p-6">
      <h1 className="text-3xl font-bold mb-4">Defective Product</h1>

      <p className="mb-4">
        In the unlikely event that you receive a defective product from Badass BBQs, most of the manufacturers we carry have excellent processes in place to assist you. Check your manual for details on how to proceed. If you need to contact us, our skilled Support team will guide you through the manufacturer's warranty process. Here is what you need to know:
      </p>

      <ul className="list-disc list-inside mb-4">
        <li>The defective item must still be within the manufacturer's warranty period.</li>
        <li>You will need to provide any serial numbers, a description of the issue, and any pictures or videos showing the problem.</li>
        <li>Badass BBQs is the expert, so we will work with you to verify that it is a defect.</li>
        <li>We will then report this to the manufacturer to start the claim.</li>
        <li>The manufacturer will review the claim and then approve or reject it.</li>
        <li>The time it takes for the manufacturer to respond may vary depending on their internal processes.</li>
        <li>If approved, the warranty process begins and service, parts, repair, or any combination of those as needed will be provided in accordance with the manufacturer's warranty.</li>
        <li>Some parts or items may need to be returned to the manufacturer for quality control. We will let you know if this is the case.</li>
      </ul>

      <p className="mb-4">
        Badass BBQs is not responsible for reimbursement of any labor costs or project delays that may occur due to the receipt of defective goods. We recommend that you wait to schedule installation until after your order has arrived and items have been fully inspected.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Delivery Inspection</h2>

      <p className="mb-4">
        All shipments should be opened and inspected within 48 hours of delivery in accordance with our Delivery Inspection policy. It is recommended that you check for visible defects as well as damage at this time to prevent any delays in using your item(s).
      </p>

      <h2 className="text-2xl font-semibold mb-2">Defects Outside Warranty Period</h2>

      <p className="mb-4">
        If your item has a defect outside of the warranty period:
      </p>

      <ul className="list-disc list-inside mb-4">
        <li>We will not be able to facilitate a claim with the manufacturer.</li>
        <li>Any replacement parts or whole units at this point can be purchased by you through Badass BBQs. Contact us for pricing and availability.</li>
        <li>Please note that parts or whole replacement units may not be available for discontinued items.</li>
      </ul>

      <p className="mb-4">
        For further assistance, please don’t hesitate to reach out to our support team. We’re here to help you with any questions or concerns you may have.
      </p>
    </div>
  );
};

export default DefectiveProduct;
