import React from 'react';
import Slider from "react-slick";

const Morque = () => {
    const Images = [
        '11.png',
        '12.png',
        '13.png',
        '14.png',
        '15.png',
        '16.png'
    ];

    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };

    return (
        <div className="slider-container">
            <div className="w-48 h-48">
                <img src="11.png" alt="" className="" />
            </div>
            <Slider {...settings}>
                {Images.map((image, index) => (
                    <div key={index} className="w-48 h-48 flex">
                        <img src={image} alt={`Image ${index + 1}`} className="" />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Morque;
