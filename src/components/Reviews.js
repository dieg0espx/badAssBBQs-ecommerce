import React from "react";
import Slider from 'react-slick'; // Import the Slider component from react-slick
import profilePicture from '../images/profilePicture.png'

const reviewsData = [
    {
      name: "John D.",
      testimonial: "BadAssBBQs grills are unmatched in quality and performance. My steaks have never been better! Love their fast shipping and easy assembly.",
      city: "Austin",
      state: "TX",
      stars: 5,
    },
    {
      name: "Lisa M.",
      testimonial: "I love my new BadAssBBQs smoker! It's easy to use and gives amazing flavor to all my dishes. Plus, the monthly payment plan made it super affordable!",
      city: "Denver",
      state: "CO",
      stars: 4.5,
    },
    {
      name: "Michael T.",
      testimonial: "The best BBQ grill I've ever owned. Durable, sleek, and worth every penny. Their customer service was fantastic, and the 10-year guarantee gives me peace of mind.",
      city: "Nashville",
      state: "TN",
      stars: 4,
    },
    {
      name: "Sara W.",
      testimonial: "The wood-fired oven is fantastic. I've been baking pizzas every weekend, and they turn out perfect! Fast shipping and great customer support.",
      city: "Seattle",
      state: "WA",
      stars: 5,
    },
    {
      name: "Chris L.",
      testimonial: "Their gas grills are a game-changer. Cooking has become so much more enjoyable. Plus, their flexible payment options made it easy to buy the perfect model.",
      city: "Chicago",
      state: "IL",
      stars: 4.5,
    },
    {
      name: "Emily F.",
      testimonial: "I got the charcoal grill last month, and it’s been amazing. Perfect heat control and easy to clean! The lifetime warranty is a great bonus.",
      city: "Phoenix",
      state: "AZ",
      stars: 5,
    },
    {
      name: "Robert H.",
      testimonial: "The portable grill is ideal for camping trips. Lightweight and super efficient! Their 2-day shipping is unbeatable.",
      city: "Atlanta",
      state: "GA",
      stars: 4.5,
    },
    {
      name: "Megan K.",
      testimonial: "BadAssBBQs products are worth the hype. The oven I bought exceeded my expectations. Monthly payments made it so easy to upgrade!",
      city: "Portland",
      state: "OR",
      stars: 5,
    },
    {
      name: "David G.",
      testimonial: "Their grills are fantastic, and customer support is even better. I love that they offer a 30-day money-back guarantee. Highly recommend!",
      city: "Dallas",
      state: "TX",
      stars: 5,
    },
    {
      name: "Jessica A.",
      testimonial: "The accessories they offer are top-notch. My grill setup is complete now, thanks to BadAssBBQs! Quick delivery and excellent warranty.",
      city: "San Diego",
      state: "CA",
      stars: 5,
    },
    {
      name: "Brian V.",
      testimonial: "The stainless steel grill is super durable and looks amazing in my backyard. Five stars! Fast delivery made it even better.",
      city: "Miami",
      state: "FL",
      stars: 5,
    },
    {
      name: "Sophia P.",
      testimonial: "Their products make BBQing so easy and enjoyable. My family loves the new smoker. Love the option to pay month-to-month!",
      city: "Charlotte",
      state: "NC",
      stars: 4.5,
    },
    {
      name: "Jake H.",
      testimonial: "Unmatched build quality and perfect design. I’m in love with my BadAssBBQs grill! The shipping was lightning fast.",
      city: "Indianapolis",
      state: "IN",
      stars: 5,
    },
    {
      name: "Victoria C.",
      testimonial: "Their wood-fired oven is absolutely perfect for pizzas. Amazing quality, and the warranty is a lifesaver.",
      city: "Boston",
      state: "MA",
      stars: 5,
    },
    {
      name: "Matt R.",
      testimonial: "I can’t imagine grilling without my BadAssBBQs gear. It’s just that good! The payment plan made it easy to get the best model.",
      city: "Las Vegas",
      state: "NV",
      stars: 4,
    },
    {
      name: "Amber L.",
      testimonial: "I’ve recommended their products to all my friends. Outstanding quality and performance. Plus, free shipping was the cherry on top!",
      city: "San Jose",
      state: "CA",
      stars: 5,
    },
    {
      name: "Ethan J.",
      testimonial: "The gas grill I purchased is incredibly easy to use and super reliable. Their flexible financing is fantastic!",
      city: "Salt Lake City",
      state: "UT",
      stars: 4,
    },
    {
      name: "Natalie T.",
      testimonial: "BadAssBBQs is my go-to brand for all grilling equipment. Love the quality! Their guarantee gives me confidence in every purchase.",
      city: "Detroit",
      state: "MI",
      stars: 4.5,
    },
    {
      name: "Aaron W.",
      testimonial: "The smoker I got from them is a game-changer. Incredible flavors every time! The payment options are a big help.",
      city: "Kansas City",
      state: "MO",
      stars: 5,
    },
    {
      name: "Chloe F.",
      testimonial: "Absolutely love my portable grill. Perfect for tailgating and outdoor events! Fast delivery was a bonus.",
      city: "Minneapolis",
      state: "MN",
      stars: 5,
    },
  ];
  

  const settings = {
    dots: false, // Show dots for navigation
    infinite: true, // Infinite loop sliding
    speed: 500, // Slide speed
    slidesToShow: 4, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll on each navigation
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 3000, // Duration between slides
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Show 3 slides on medium screens
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Show 2 slides on smaller screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1, // Show 1 slide on extra small screens
          slidesToScroll: 1,
        },
      },
    ],
  };
  const settings2 = {
    dots: false, // Show dots for navigation
    infinite: true, // Infinite loop sliding
    speed: 500, // Slide speed
    slidesToShow: 4, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll on each navigation
    autoplay: true, // Enable automatic sliding
    autoplaySpeed: 3000, // Duration between slides
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Show 3 slides on medium screens
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Show 2 slides on smaller screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1, // Show 1 slide on extra small screens
          slidesToScroll: 1,
        },
      },
    ],
  };


const Reviews = () => {
  return (
    <div>
      <Slider {...settings} className="my-2 relative z-0 mx-auto max-w-[1400px]">
        {reviewsData.map((review, index) => (
          <div key={index} className="">
            <div className="flex flex-col pt-6 pb-4 px-5 rounded border border-gray-200 h-[240px] mx-[5px] m-auto">
              <div className="grid grid-cols-[1fr_3fr] mb-[10px]">
                <img
                  src={profilePicture}
                  alt={`${review.name}'s profile`}
                  className="w-12 h-12 rounded-full mr-4 mb-[10px]"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">{review.name}</h3>
                  <p className="text-gray-500 text-sm">
                    <strong>
                      {review.city}, {review.state}
                    </strong>
                  </p>
                </div>
              </div>
              <p className="text-gray-600 italic text-[15px] sm:text-[11px] md:text-[12px] lg:text-[15px]  ">"{review.testimonial}"</p>
              <div className="flex items-center mt-auto">
                {Array.from({ length: 5 }, (_, i) => {
                  if (i < Math.floor(review.stars)) {
                    // Render full star
                    return (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="w-6 h-6 text-yellow-400"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    );
                  } else if (i === Math.floor(review.stars) && review.stars % 1 !== 0) {
                    // Render half star
                    return (
                        <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-yellow-400"
                        viewBox="0 0 24 24"
                      >
                        <defs>
                          <linearGradient id={`halfStar${i}`} x1="0" x2="1" y1="0" y2="0">
                            <stop offset="50%" stopColor="currentColor" />
                            <stop offset="50%" stopColor="transparent" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                          fill={`url(#halfStar${i})`}
                        />
                        <path
                          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                      </svg>
                    );
                  } else {
                    // Render empty star
                    return (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="w-4 h-4 text-yellow-400"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <Slider {...settings2} className="my-2 relative z-0 mx-auto max-w-[1400px]">
        {reviewsData.map((review, index) => (
          <div key={index} className="">
            <div className="flex flex-col pt-6 pb-4 px-5 rounded border border-gray-200 h-[240px] mx-[5px] m-auto">
              <div className="grid grid-cols-[1fr_3fr] mb-[10px]">
                <img
                  src={profilePicture}
                  alt={`${review.name}'s profile`}
                  className="w-12 h-12 rounded-full mr-4 mb-[10px]"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">{review.name}</h3>
                  <p className="text-gray-500 text-sm">
                    <strong>
                      {review.city}, {review.state}
                    </strong>
                  </p>
                </div>
              </div>
              <p className="text-gray-600 italic text-[15px] sm:text-[11px] md:text-[12px] lg:text-[15px]  ">"{review.testimonial}"</p>
              <div className="flex items-center mt-auto">
                {Array.from({ length: 5 }, (_, i) => {
                  if (i < Math.floor(review.stars)) {
                    // Render full star
                    return (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="w-6 h-6 text-yellow-400"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    );
                  } else if (i === Math.floor(review.stars) && review.stars % 1 !== 0) {
                    // Render half star
                    return (
                        <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-yellow-400"
                        viewBox="0 0 24 24"
                      >
                        <defs>
                          <linearGradient id={`halfStar${i}`} x1="0" x2="1" y1="0" y2="0">
                            <stop offset="50%" stopColor="currentColor" />
                            <stop offset="50%" stopColor="transparent" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                          fill={`url(#halfStar${i})`}
                        />
                        <path
                          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                      </svg>
                    );
                  } else {
                    // Render empty star
                    return (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="w-4 h-4 text-yellow-400"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        ))}
      </Slider>

    </div>  
  );
};

export default Reviews;
