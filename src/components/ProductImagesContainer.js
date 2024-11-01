import React, { useEffect, useState } from 'react';

const ProductImagesContainer = ({ Image, Other_image }) => {
  const [currentImage, setCurrentImage] = useState(Image); // Initialize with the main image URL
  const [imageUrls, setImageUrls] = useState([]); // State to store image URLs

  useEffect(() => {
    if (Other_image && typeof Other_image === 'object') {
      const urls = Object.keys(Other_image); // Extract URLs from the object keys

      // Prepend Image if not already included in Other_image
      const allImages = !urls.includes(Image) ? [Image, ...urls] : urls;
      setImageUrls(allImages);

      // Set the last image as currentImage if available
      setCurrentImage(allImages[allImages.length - 1]);
    } else {
      setImageUrls([Image]); // Use only Image if Other_image is not an object
      setCurrentImage(Image); // Set currentImage to Image
    }
  }, [Image, Other_image]); // Dependency on Image and Other_image

  return (
    <div className="flex w-full">
      <div className="flex flex-col max-h-[450px] overflow-y-auto p-2 w-[100px] h-full scrollbar-hide">
        {/* Display the miniatures */}
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={Other_image[url] || `Thumbnail ${index + 1}`} // Use description as alt text if available
            className="w-20 h-20 object-contain mb-2 cursor-pointer rounded"
            onMouseEnter={() => setCurrentImage(url)} // Change main image on hover
          />
        ))}
      </div>

      <div className='w-full'>
        <img
          src={currentImage}
          alt="Current Product"
          className="w-full h-auto object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

export default ProductImagesContainer;
