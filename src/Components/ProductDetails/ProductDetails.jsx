import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Slider from "react-slick";
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
  const apiName = process.env.REACT_APP_API;

  let {id} = useParams();
    var settings = {
    dots: true,
    autoplay: true,
    speed: 2000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  function getProductDetails({queryKey}){
      let [ ,id] = queryKey;
      return axios.get(`${apiName}products/${id}`) 
    }

  let { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ['featureProducts', id],
    queryFn: getProductDetails,
    chacheTime: 3000,
    staleTime: 60000
  });

  return (
    <>
    {data?.data.data?<>
      <Helmet>
        <title>{data?.data.data.title}</title>
      </Helmet>
      <div className='row py-2 align-items-center'>
        <div className='col-md-4'>
            <Slider {...settings}>
              {data?.data.data.images.map((img)=>
                  <img className='w-100' src={img} alt={data?.data.data.title} />)}
            </Slider>
        </div>
        <div className='col-md-8'>
          <h2 className='h6'>{data?.data.data.title}</h2>
          <p>{data?.data.data.description}</p>
          <h6 className='text-main'>{data?.data.data.category?.name}</h6>
          <h6 className='text-main'>Price: {data?.data.data.price} EGP</h6>
          <div className="d-flex justify-content-between">
            <span>Rating Quantity: {data?.data.data.ratingsQuantity}</span>
            <span><i className='fas fa-star rating-color'></i>{data?.data.data.ratingsAverage}</span>
          </div>
          <button className='btn bg-main text-white w-100 btn-sm mt-2'>Add to cart</button>
        </div>
      </div>
    </>:""}

    </>
  )
}
