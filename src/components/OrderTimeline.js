import React from 'react';

const OrderTimeline = ({ currentStep }) => {
  const steps = [
    'Order Created',
    'Order Paid',
    'Order Approved',
    'Order Packed',
    'Order Shipped',
  ];

  // Map partial names to full step names to get the correct index
  const stepMapping = {
    Created: 'Order Created',
    Paid: 'Order Paid',
    Approved: 'Order Approved',
    Packed: 'Order Packed',
    Shipped: 'Order Shipped',
  };

  // Get the full step name based on the partial input
  const fullStepName = stepMapping[currentStep];
  const currentStepIndex = steps.indexOf(fullStepName);

  return (
    <div className="relative flex items-center justify-between w-full p-4 sm:p-6">
      {/* Horizontal line */}
      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-300 z-0"></div>
      <div
        className="absolute top-1/2 left-0 h-[2px] bg-red z-10"
        style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
      ></div>

      {/* Steps */}
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex; // Mark previous steps as completed
        const isCurrent = index === currentStepIndex; // Highlight the current step

        return (
          <div key={index} className="relative flex flex-col items-center z-20">
            {/* Circle indicator */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white mb-[20px]
                ${isCompleted ? 'bg-red' : isCurrent ? 'bg-red' : 'bg-gray-300'}
              `}
            >
              {isCompleted ? (
                <i className="bi bi-check2-circle text-white text-[20px]"></i>
              ) : (
                index + 1
              )}
            </div>

            {/* Step label */}
            <p
              className={`mt-2 text-[10px] md:text-sm font-medium text-center 
                ${isCompleted ? 'text-red' : isCurrent ? 'text-red' : 'text-gray-500'}
              `}
            >
              {step}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTimeline;
