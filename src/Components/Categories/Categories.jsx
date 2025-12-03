import React, { use, useEffect } from 'react';
import Style from './Categories.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../Redux/categoriesSlice';
import { MutatingDots } from 'react-loader-spinner';


export default function Categories() {
  let {categories, loading, isError} = useSelector((state)=> state.categories)
  let dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getCategories())
  },[]);
  return (
    <>
    <div className="row">
      {loading ? <div className="loading">
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          secondaryColor="#4fa94d"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />
      </div> : categories.map((category)=>
        <div key={category._id} className="col-md-2 text-center mx-1 my-3 cursor-pointer p-3 border rounded-3">
          <h1 className='h6'>{category.name}</h1>
          <img className='w-100' src={category.image} alt="" />
        </div>
  )}
    </div>
    </>
  )
}
