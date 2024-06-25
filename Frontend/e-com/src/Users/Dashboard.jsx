import React from 'react';
import Nav from './Nav';
import Carousel from './Carousel ';
import AutoPlay from './AutoPlay';
import Grid from './Grid';
import Footer from '../Home/Footer';
import SliderComponent from '../Home/SliderComponent';
import Products from './Products';
import MetaData from '../Home/MetaData';

const Dashboard = () => {
  return (
    <div>
      <MetaData title={"Dashboard"} />
        <Nav/>
        <SliderComponent/>
        <AutoPlay/>
        <Products/>
        <Footer/>
      
    </div>
  )
}

export default Dashboard
