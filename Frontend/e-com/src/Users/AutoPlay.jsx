import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AxiosApi,{url} from '../AxiosAPI';

// Import your local images


const AutoPlay = () => {

 const [data , setdata] = useState([])
 const customer = JSON.parse(sessionStorage.getItem('customer'))


 const recomendation = async() =>{
  try{
    const response = await AxiosApi.get(`/user/recomedation/${customer._id}`)
    console.log(response.data.product,'autoply')
    setdata(response.data.product || [])

  }catch(error){
    console.log(error)
  }
 }


useEffect(()=>{
  recomendation()
},[])










  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2000,
  };

  // Define an array of image paths
 

  return (
    <Slider {...settings}>
      {data.map((item) => (
        <div key={item._id}>
          <img src={`${url}/products/${item.image[0]}`} alt={`Slide ${item._id + 1}`} style={{ width: '100%', height: '200px', borderRadius:"5px", padding:"0px" }} />
        </div>
      ))}
    </Slider>
  );
};


export default AutoPlay