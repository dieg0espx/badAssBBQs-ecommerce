import React from 'react';

function Categories({ categories }) { // Destructure `categories` from props
  return (
    <div className="text-gray-600 flex items-center ml-5">
      {categories.map((cat, index) => (
        <React.Fragment key={index}>
          <p className='hover:text-red'>{cat}</p>
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
