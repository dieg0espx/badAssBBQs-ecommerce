import React from 'react';

const ParagraphSkeleton = ({ lines = 5 }) => {
  return (
    <div className="space-y-2">
      {[...Array(lines)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 h-4 rounded animate-pulse"
          style={{ width: `${80 + Math.random() * 20}%` }}
        ></div>
      ))}
    </div>
  );
};

export default ParagraphSkeleton;
