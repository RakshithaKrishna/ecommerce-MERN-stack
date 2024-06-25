import React from 'react'
import Nav from '../Users/Nav'
import Carousel from '../Users/Carousel '
import Grid from '../Users/Grid';
import Footer from './Footer';
import MainNav from '../Users/MainNav';
import SliderComponent from './SliderComponent';
import Product from './Product';
import MetaData from './MetaData';
import Products from '../Users/Products';
import Best from '../Users/Best';


const Home = () => {
  return (
    <div>
      <MetaData title={"Shop Smart"} />
        <MainNav/>
 

        <SliderComponent/>
        <Product/>
        <Products/>
    
        
      
      

<div className=" mt-24">

        <Footer/>
</div>
 
     
      
    </div>
  )
}

export default Home
