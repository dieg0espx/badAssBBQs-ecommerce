import React from 'react';
import { Link } from "react-router-dom";

function Categories({ categories }) { // Destructure `categories` from props
  return (
<div className="text-gray-600 flex items-center ml-0 xl:ml-5 mb-2 text-[15px] overflow-x-auto whitespace-nowrap">
  {categories.map((cat, index) => (
    <React.Fragment key={index}>
      <Link to={`/products/all/${cat}`} className="hover:text-red">
        {cat}
      </Link>
      {index < categories.length - 1 && (
        <span className="mx-1">
          <i className="bi bi-chevron-compact-right"></i>
        </span>
      )}
    </React.Fragment>
  ))}
</div>

  );
}

export default Categories;
