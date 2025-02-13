import React from 'react';

function VariantsDropdowns({ dropdowns, product, selectedVariation }) {
  return (
    <div className="mb-[30px] flex flex-col gap-[10px]">
      {dropdowns &&
        Object.keys(dropdowns).map((specName) => {
          // Find the current value from product.Specifications array
          const currentSpecObj = product.Specifications.find(
            (spec) => Object.keys(spec)[0] === specName
          );
          const currentValue = currentSpecObj ? Object.values(currentSpecObj)[0] : 'N/A';

          return (
            <div key={specName}>
              <p className="text-[12px] font-semibold ml-[5px] text-red">{specName}</p>
              <select
                onChange={(e) => selectedVariation(specName, e.target.value)}
                className="border border-gray-100 w-[300px] p-[5px] rounded"
              >
                <option value={currentValue}>{currentValue}</option> {/* Current value as first option */}
                {dropdowns[specName].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
    </div>
  );
}

export default VariantsDropdowns;
