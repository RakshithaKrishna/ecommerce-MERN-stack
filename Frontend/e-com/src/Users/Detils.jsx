import React, { useEffect, useState } from 'react'
import Nav from './Nav';
import Footer from '../Home/Footer';
import AxiosApi ,{url} from '../AxiosAPI';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import MetaData from '../Home/MetaData';
import ReactImageMagnify from 'react-image-magnify';
// import { productAtom } from "../store"
// import { useAtom } from 'jotai/react'

const Detils = () => {
  // const [product, setProduct] = useAtom(productAtom)
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };
const [data, setdata] = useState()
const[datas,setdatas] = useState()
const [ review , setreview] = useState([])
const customer = JSON.parse(sessionStorage.getItem('customer'))
const {id} = useParams()


const productdetils =async()=>{
  try{
    const response = await AxiosApi.get(`/user/product/${customer._id}/${id}`);
    console.log(response.data.product[0].image[0],"getting product")
    setdata(response.data.product[0])
    setdatas(response.data.moodeproducts)
    setreview(response.data.product[0].review)
    console.log(response.data.product[0].review ,"reviews")


  }catch(error){
    console.log(error)
  }
}

useEffect(() => {
  productdetils();
  // console.log(product,"atpom")
}, []);


const addtocart =async() =>{
  try{
    const response = await AxiosApi.post(`/user/cartproduct/${customer._id}/${id}`);
    console.log(response);
    toast.success(response.data.message)

  }catch(error){
    console.log(error)
    toast.error(error.response.data.message)
  }
};


const rating = (rating) =>{
  const stars = [] 
  for(let i=0; i <=5; i++){
    if(i < rating){
      stars.push(<svg key={i} className="w-5 h-5 fill-current text-yellow-500" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>);
    }else{
      stars.push(<svg key={i} className="w-5 h-5 fill-current text-gray-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>);
    }

  }
  return stars
}






const [selectimage , setselectedimage] = useState(0)













  return (
    <div>
      <MetaData title={"Product detils"} />
        <Nav/>
       
      <section className="text-gray-700 body-font overflow-hidden bg-white min-h-screen">
  <div className="container px-5 py-24 mx-auto"> 
    {data&&<div className="lg:w-4/5 mx-auto flex flex-wrap">
    <div className="flex flex-col space-y-2 ...">
  {data.image.map((image, index) => (
    <div key={index} onClick={()=>setselectedimage(index)}>
      <img src={`${url}/products/${image}`} alt="" className="w-20 h-24 p-2 border border-zinc-400" />
    </div>
  ))}
</div>
  {/* Product Image */}
  <ReactImageMagnify {...{
    smallImage: {
      alt: 'Product',
  
      src: `${url}/products/${data.image[selectimage]}`,
      width: 400,
      height: 800
    },
    largeImage: {
      src: `${url}/products/${data.image[selectimage]}`,
      width: 1000,
      height: 2400
    }
  }} />

  {/* Product Details */}
  <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
    <h2 className="text-sm title-font text-gray-500 tracking-widest">
      {data.productname}
    </h2>
    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
      {data.productname}
    </h1>
    <div className="flex mb-4">
      {/* Review Stars */}
      <span className="flex items-center">
        {[...Array(4)].map((_, index) => (
          <svg
            key={index}
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-4 h-4 text-red-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
        <span className="text-gray-600 ml-3">4 Reviews</span>
      </span>
    </div>
    {/* Description */}
    <p className="leading-relaxed">
      {data.description}
    </p>
    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
      {/* Stock Status */}
      <h4 className='text-2xl text-black'>Stock: {data.stock}</h4>
    </div>
    {/* Original Price */}
    <span className='ml-5 line-through text-red-500 font-bold'>
      ₹{data.Originalprice}
    </span>
    <div className="flex">
      {/* Discounted Price */}
      <span className="title-font font-medium text-2xl text-gray-900">
        ₹{data.Price}
      </span>
      {/* Add to Cart Button */}
      <button
        type='submit'
        onClick={addtocart}
        className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
        Add to cart
      </button>
    </div>
  </div>
</div>
}
  </div>
</section>

<div className=" w-screen mx-auto grid lg:grid-cols-4 gap-y-4 sm:grid-cols-2 hover:gap-y-2 mb-5">
        {
          datas && datas.map((item)=>(

     <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
   

      <Slider {...settings}>
      {item.image.map((image)=>  <a href="#" >
        <Link 
             to={`/detils/${item._id}`}
        >
        
          <img
            className="rounded-t-lg p-7 w-96 h-60 object-cover hover:scale-110 transition-transform"
            src={`${url}/products/${image}`}


          />
        </Link>
        </a>)}
      </Slider>
     
        <div className="px-5 pb-5">
       
            <h3 className="text-gray-900 min-h-12 font-semibold text-xl tracking-tight dark:text-white">
             {item.productname}
            </h3>
    
           <div className="flex items-center mt-2.5 mb-5">
            <svg
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <svg
              className="w-5 h-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
              5.0
            </span>
          </div>
          <span className=' ml-5 line-through text-red-500 font-bold'>
            ₹{item.Originalprice}
            </span>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ₹{item.Price}
            </span>
            <Link
               to={`/detils/${item._id}`}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              View Details
            </Link>
            {/* <button className=' text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' type="button" onClick={() => {
                    setProduct(item._id)
                    navigate("/detils")
                  }}>view details</button> */}
          </div>
        </div>
      </div>
          ))
        }
     
     
    </div>
  {/* feedback */}
  {review && review.length > 0 && (
  <div className="ml-4 w-3/4 min-h-60 max-h-80 border border-zinc-500 overscroll-y-auto overflow-scroll shadow-lg rounded-md mb-4">
    {review.map((item) => (
      <div key={item}>
        <div className="flex mt-2 ml-3 items-center relative">
          {/* User Profile Image */}
          <img src={`${url}/users/${item.userDetails.Avathar}`} alt="" className="w-14 h-14 rounded-full" />
          {/* Username */}
          <h3 className="text-2xl text-slate-800 font-serif ml-2">{item.userDetails.name}</h3>
          {/* Time of Feedback */}
          <p className="absolute top-0 right-40 mt-1 text-gray-500">{item.date}</p>
        </div>

        <div className="ml-3 mt-2">
          {/* Render Stars based on rating */}
          <div className="flex">
            {rating(item.rating)}
          </div>
        </div>

        <p className="ml-3 mt-1 text-gray-500">
          {item.Comment}
        </p>
      </div>
    ))}
  </div>
)}



    
<Footer/>

    </div>
  )
}

export default Detils
