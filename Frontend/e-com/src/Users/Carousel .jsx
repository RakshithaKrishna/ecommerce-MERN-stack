import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Morque from './Morque';
import AutoPlay from './AutoPlay';

const Carousel = () => {
  // Array of online image URLs
  const images = [
    '/2.png',
    '/ecommerce.png',
    '/2.png',
    '/3.png',
    '/4.png',
    '/5.png',
    '/6.png'
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(4);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="">

    <div className="mt-0 relative">
      <button onClick={handlePrev} className="absolute left-0 top-1/2 transform -translate-y-1/2">
        <i className="fa-solid fa-angle-left text-black text-5xl ml-7"></i>
      </button>
      <Link to='/' className="block">
        <img 
          src={images[currentImageIndex]} 
          alt={`Image ${currentImageIndex + 1}`}  
          className='p-1 shine-image w-screen  object-cover'
          style={{height:"600px"}} 
        />
      </Link>
      <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2">
        <i className="fa-solid fa-angle-right text-black text-5xl mr-7"></i>
      </button>
    </div>
    <div className="">
    </div>
    </div>
  );
};

export default Carousel;
