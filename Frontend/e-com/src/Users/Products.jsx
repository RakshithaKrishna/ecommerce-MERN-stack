import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import AxiosApi ,{url} from '../AxiosAPI';

const Products = () => {

  const [data, setdata] = useState([])
  const [image, setimage] = useState()




  const getting = async () => {
    try {
      const response = await AxiosApi.get('/user/home')
      // console.log(response, "getting")
      setdata(response.data.Products)
      console.log(response.data.Products ,"jgiu")
      setimage(response.data.Products[1])

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getting()
  }, [])


// jowlary 

  const [Jewelry,setJewelry] = useState()


const gettingjwellary = async() =>{
  try{
    const response = await AxiosApi.get('/user/Jewelry')
    console.log(response.data.Products,"getting jwelarry")
    setJewelry(response.data.Products)

  }catch(error){
    console.log(error)
  }
};

useEffect(()=>{
  gettingjwellary()
},[])


//getting Sports

const [sports,setsports] = useState([])

const gettingsports = async() =>{
  try{
    const response = await AxiosApi.get('/user/sports');
    console.log(response,"getting sports")
    setsports(response.data.Products)

  }catch(error){
    console.log(error)
  }
};

useEffect(()=>{
  gettingsports()
},[])











  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <FaChevronRight className="slick-arrow slick-next" onClick={onClick} />
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <FaChevronLeft className="slick-arrow slick-prev" onClick={onClick} />
    );
  };

  const images = [
    '/51.png',
    '/52.png',
    '/53.png',
    '/54.png',
    '/56.png',
    '/21.png',
    '/22.png',
    '/24.png',
    '/25.png',
    '/23.png'
    // Add more image URLs as needed
  ];


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    controls: true,


  };


  //   const NextArrow = (props) => {
  //     const { onClick } = props;
  //     return (
  //         <FaChevronRight className="slick-arrow slick-next" onClick={onClick} />
  //     );
  // };

  // const PrevArrow = (props) => {
  //     const { onClick } = props;
  //     return (
  //         <FaChevronLeft className="slick-arrow slick-prev" onClick={onClick} />
  //     );
  // };



  return (
    <div>
      <div className="flex mt-4 p-2 max-h-200px">
        {
          image &&

          <div className="mr-4" >
            <Link to={`/detils/${image._id}`}>

            <img src={`${url}/products/${image.image[0]}`} alt="" className=" object-cover max-h-400px min-h-200px h-300px hover:transform hover:scale-110 transition-transform duration-300 ease-in-out" />
            </Link>
          </div>

        }
        <div className="grid grid-cols-2 grid-rows-2 mt-5  ">
          {
            data && data.map((item) => (
              <div className="mr-4" key={item}>
                <Link to={`/detils/${item._id}`}>
                <img src={`${url}/products/${item.image[0]}`} alt="" className=" max-h-96 w-80 object-fill space-x-2 hover:transform hover:scale-110 transition-transform duration-300 ease-in-out   " />
                </Link>
              </div>
            ))
          }

        </div>
      </div>

  

      <div className=" mt-5 bg-slate-200 ">
        <div className=" ml-4 mt-3">

          <h4 className='text-black font-serif sm:text-sm '>Best Selling</h4>
        </div>
        <div className="mt-2 lg:flex">

          <div className="  lg:bg-white  ">
            {/* <div className=" flex justify-between">

              <h4 className='text-black font-serif mt-3 ml-4 '> Best Clothes</h4>
              <i className="fa-solid fa-chevron-right text-blue-700 text-2xl top-1/2 right-0 transform -translate-y-1/2 mt-5 mr-3 sm:text-sm "></i>
            </div> */}
            <div className="grid grid-cols-2 grid-rows-2  space-x-2 space-y-2 border border-black ml-4 p-2 mb-2 bg-white">
              {
                Jewelry && Jewelry.map((item)=>(

              <div className="mr-4 border border-gray-300 rounded-md p-2" key={item}>
                <Link to={`/detils/${item._id}`}>
                <img src={`${url}/products/${item.image[0]}`} alt="" className="max-h-44 w-80 object-cover hover:transform hover:scale-110 transition-transform duration-300 ease-in-out" />
                </Link>
                <p className=' text-2xl text-slate-800 mt-1'>From ₹{item.Price}</p>
              </div>
                ))
              }
            
            </div>
          </div>

          <div className="  bg-white">
            {/* <div className=" flex justify-between">

              <h4 className='text-black font-serif mt-3 ml-4'> Best Clothes</h4>
              <i className="fa-solid fa-chevron-right text-blue-700 text-2xl top-1/2 right-0 transform -translate-y-1/2 mt-5 mr-3 "></i>
            </div> */}
            <div className="grid grid-cols-2 grid-rows-2 space-x-2 space-y-2 border border-black ml-4 p-2 mb-2 bg-white">
            {
                data && data.map((item)=>(

              <div className="mr-4 border border-gray-300 rounded-md p-2" key={item}>
                <Link to={`/detils/${item._id}`}>
                <img src={`${url}/products/${item.image[0]}`} alt="" className="max-h-44 w-80 object-cover hover:transform hover:scale-110 transition-transform duration-300 ease-in-out" />
                </Link>
                <p className=' text-2xl text-slate-800 mt-1'>From ₹{item.Price}</p>
              </div>
                ))
              }
              
            </div>
          </div>

          <div className="  bg-white ">
            {/* <div className=" flex justify-between">

              <h4 className='text-black font-serif mt-3 ml-4'> Best Clothes</h4>
              <i className="fa-solid fa-chevron-right text-blue-700 text-2xl top-1/2 right-0 transform -translate-y-1/2 mt-5 mr-3 "></i>
            </div> */}
            <div className="grid grid-cols-2 grid-rows-2 space-x-2 space-y-2 border border-black ml-4 p-2 mb-2 bg-white">
            {
                sports && sports.map((item)=>(

              <div className="mr-4 border border-gray-300 rounded-md p-2" key={item}>
                <Link to={`/detils/${item._id}`}>
                <img src={`${url}/products/${item.image[0]}`} alt="" className="max-h-44 w-80 object-cover hover:transform hover:scale-110 transition-transform duration-300 ease-in-out" />
                </Link>
                <p className=' text-2xl text-slate-800 mt-1'>From ₹{item.Price}</p>
              </div>
                ))
              }
            </div>
          </div>


     
        </div>
      </div>

     

      



    </div>
  )
}

export default Products
