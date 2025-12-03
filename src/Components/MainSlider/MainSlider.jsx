import React from 'react';
import imageS1 from '../../Assets/images/slider-image-1.jpeg';
import imageS3 from '../../Assets/images/slider-image-3.jpeg';
import blog1 from '../../Assets/images/products.webp';
import blog2 from '../../Assets/images/product2.jpg';


import Slider from 'react-slick';

var settings = {
  customPaging: function(i) {
  return (
    <div style={{
        width: '8px',  
        height: '5px', 
        backgroundColor: '#ccc',  
        margin: '5px',  // Space between dots
        display: 'inline-block',  
        borderRadius: '2px'  
      }}
    />
      );
    },
    dots: true,
    autoplay: true,
    speed: 5000,
    arrows:false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };

export default function MainSlider() {
  return (
    <>
      <div className="row gx-0 mb-3">
        <div className='col-md-10'>
        <Slider {...settings}>
              <img height={450} className='w-100' src={imageS1} alt="Slider 1" />
              <img height={450} className='w-100' src={imageS3} alt="Slider 3" />
      </Slider>
      </div>
      <div className='col-md-2'>
              <img height={225} className='w-100' src={blog1} alt= "blog 1" />
              <img height={225} className='w-100' src={blog2} alt= "blog 2" />
      </div>
      </div>
    </>
  )
}
