import React from 'react';
import Nav from './Nav';
import Footer from '../Home/Footer';
import Grid from './Grid';
import MetaData from '../Home/MetaData';

const Moreproduct = () => {
 
  return (
    <div>
      <MetaData title={'Products'}/>
        <Nav/>
        
      <Grid/> 
       <Footer/>
    </div>
  )
}

export default Moreproduct
