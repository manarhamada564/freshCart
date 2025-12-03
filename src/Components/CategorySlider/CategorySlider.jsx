import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Slider from 'react-slick';

export default function CategorySlider() {
  const apiName = process.env.REACT_APP_API;
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
    speed: 2000,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1
  };
  
  function getCategories(){
    return axios.get(`${apiName}categories`)
  }

  let { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  return (
    <>
          <h2>Shop Populars Categories</h2>
              {data?.data.data? <div className='py-2'>
              <Slider {...settings}>
              {data?.data.data.map((category)=>
              <>
                  <img height={200} key= {category.id} className='w-100' src={category.image} alt={data?.data.data.title} />
                  <span className='font-sm'>{category.name}</span>                  
              </>
                  )}
            </Slider>
              </div>:""}
    </>
  )
}
