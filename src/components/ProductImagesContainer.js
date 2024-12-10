import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import placeholderImage from '../images/placeholder_image.jpg'

const ProductImagesContainer = ({ Image, Other_image }) => {
  const [currentImage, setCurrentImage] = useState(Image);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (Other_image && typeof Other_image === 'object') {
      const urls = Object.keys(Other_image);
      const allImages = !urls.includes(Image) ? [Image, ...urls] : urls;
      setImageUrls(allImages);
      setCurrentImage(allImages[allImages.length - 1]);
    } else {
      setImageUrls([Image]);
      setCurrentImage(Image);
    }
  }, [Image, Other_image]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className="flex w-full">
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex flex-col max-h-[450px] overflow-y-auto p-2 w-[100px] h-full scrollbar-hide">
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={Other_image[url] || `Thumbnail ${index + 1}`}
            className="w-20 h-20 object-contain mb-2 cursor-pointer rounded"
            onMouseEnter={() => setCurrentImage(url)}
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop in case placeholder also fails
              e.target.src = placeholderImage
            }}
          />
        ))}
      </div>

      {/* Main image for larger screens */}
      <div className="w-full hidden md:block">
        <img
          src={currentImage.split('?i10c=img.resize(width:250,height:250')[0]}
          alt="Current Product"
          className="w-full h-auto object-contain rounded-lg"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop in case placeholder also fails
            e.target.src = placeholderImage
          }}
        />
      </div>

      {/* Mobile Slider */}
      <div className="block md:hidden w-full">
        <Slider {...sliderSettings}>
          {imageUrls.map((url, index) => (
            <div key={index}>
              <img
                src={url.split('?i10c=img.resize(width:250,height:250')[0]}
                alt={Other_image[url] || `Slide ${index + 1}`}
                className="w-full h-auto object-contain rounded-lg"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop in case placeholder also fails
                  e.target.src = placeholderImage
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductImagesContainer;
