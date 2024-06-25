import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import './Slider.css'; // You can create your own CSS file for styling

const images = [
    '/51.png',
    '/52.png',
    '/53.png',
    '/54.png',
    '/56.png',
    // '/21.png',
    // '/22.png',
    // '/24.png',
    // '/25.png',
    // '/23.png'
  // Add more image URLs as needed
];

const SliderComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Adjust the speed as needed
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className=' w-screen max-h-96 p-2' />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
