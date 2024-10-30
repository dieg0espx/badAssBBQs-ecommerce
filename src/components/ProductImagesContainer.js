import React, { useEffect, useState } from 'react';

const ProductImagesContainer = ({ Image, Other_image }) => {
  const [currentImage, setCurrentImage] = useState(Image); // Initialize with the main image URL
  const [imageUrls, setImageUrls] = useState([]); // State to store image URLs

  useEffect(() => {
    // Regular expression to match URLs in the Other_image string
    const urlPattern = /(https?:\/\/[^\s]+\.jpg)/g; // Adjust regex to ensure it captures only .jpg URLs
    const urls = Other_image.match(urlPattern); // Extract URLs
    setImageUrls(urls || []); // Set the extracted URLs to state, defaulting to an empty array if none found
  }, [Other_image]); // Dependency on Other_image

  return (
    <div className="flex">
      <div className="flex flex-col max-h-52 overflow-y-auto p-2" style={{ maxHeight: '400px' }}>
        {/* Display the miniatures */}
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Thumbnail ${index + 1}`} // Alt text for accessibility
            className="w-20 h-20 object-contain mb-2 cursor-pointer rounded"
            onMouseEnter={() => setCurrentImage(url)} // Change main image on hover
          />
        ))}
      </div>

      <div className="flex-shrink-0 ml-5">
        <img
          src={currentImage}
          alt="Current Product"
          className="max-w-[400px] w-full h-auto object-contain rounded-lg" // Set width and height to 400px
        />
      </div>
    </div>
  );
};

export default ProductImagesContainer;
