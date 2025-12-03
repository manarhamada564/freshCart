import React from 'react'
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';


export default function Home() {


  return (
    <div>
      <MainSlider/>
      <CategorySlider/>
      <FeatureProducts/>
    </div>
  )
}
