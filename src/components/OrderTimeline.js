import React from 'react';

const OrderTimeline = ({ currentStep }) => {
  const steps = [
    'Order Created',
    'Order Paid',
    'Order Approved',
    'Order Packed',
    'Order Shipped'
  ];

  // Map partial names to full step names to get the correct index
  const stepMapping = {
    Created: 'Order Created',
    Paid: 'Order Paid',
    Approved: 'Order Approved',
    Packed: 'Order Packed',
    Shipped: 'Order Shipped'
  };

  // Get the full step name based on the partial input
  const fullStepName = stepMapping[currentStep];
  const currentStepIndex = steps.indexOf(fullStepName);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-y-[20px] p-[20px] ">
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex; // Mark previous steps as completed
        const isCurrent = index === currentStepIndex; // Highlight the current step

        return (
          <div key={index} className="flex flex-col items-center">
            {/* Circle indicator */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white 
                ${isCompleted ? 'bg-black-600' : isCurrent ? 'bg-yellow-500' : 'bg-gray-300'}
              `}
            >
              {isCompleted ? '✔️' : index + 1}
            </div>

            {/* Step label */}
            <p className={`mt-2 text-sm font-medium ${isCompleted ? 'text-black' : isCurrent ? 'text-yellow-500' : 'text-gray-500'}`}>
              {step}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTimeline;
