import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosApi, { url } from '../AxiosAPI';
import {toast} from 'react-toastify'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Update from './Update';
import UpdateProduct from './UpdateProduct';

const ViewProducts = () => {



const [showUpdate, setshowUpdate] = useState()
const [updatedata, setupdatedata] = useState({})

const update = (item) =>{
  setshowUpdate(true)
  setupdatedata(item)
}








  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
   
    const [arr,setarr] = useState()
    const [productname,setproductname] = useState()
    const [category ,setcategory] = useState();
    const [page, setpage] = useState(1)
  





  // get he products
    const product = async() =>{
      try{
        const product = productname  !== undefined ? `&name=${productname}`:''
        const category1 = category !== undefined ? `$category=${category}`:''
        const response = await AxiosApi.get(`/admin/products?page=${page}&${product}&${category1}`);
        console.log(response,'search');
        setarr(response.data.products)

      }catch(error){
        console.log(error)
      }
    }


  

    useEffect(()=>{
      product()

    },[page])





//delete the products
const deletproduct = async(id) =>{
  try{
    const response = await AxiosApi.delete(`/admin/product/${id}`);
    console.log(response)
    toast.error(response.data.message)

  }catch(error){
    console.log(error)
  }
}


















  return (
    <div className="">
      {
       ! showUpdate ? (

    <div className=' ml-1 flex-grow overflow-y-auto max-h-screen'>
    <div className=" flex justify-around mt-4 items-center">
    <div className="mb-4 flex">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
              Product Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="productName"
              type="text"
              placeholder="Product Name"
              onChange={(e)=>setproductname(e.target.value)}
            />
             <i class="fa-solid fa-magnifying-glass p-4" onClick={product}   ></i>

          </div>
    <div className="mb-4 flex">
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="category">
              Category:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              onChange={(e)=>setcategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing and Apparel">Clothing and Apparel</option>
              <option value="Home and Kitchen">Home and Kitchen</option>
              <option value="Beauty and Personal Care">Beauty and Personal Care</option>
              <option value="Health and Wellness">Health and Wellness</option>
              <option value="Books and Media">Books and Media</option>
              <option value="Toys and Games">Toys and Games</option>
              <option value="Sports and Outdoors">Sports and Outdoors</option>
              <option value="Food and Beverages">Food and Beverages</option>
              <option value="Jewelry and Accessories">Jewelry and Accessories</option>
              <option value="Automotive">Automotive</option>
              <option value="Others">Others</option>
            </select>
            <i class="fa-solid fa-magnifying-glass p-4" onClick={product}></i>
          </div>
    </div>
     

      <div className=" w-auto mx-auto grid lg:grid-cols-3 gap-y-2 gap-x-1 sm:grid-cols-2 hover:gap-y-2 flex-wrap overscroll-y-auto">
     { arr && arr.map((item)=>( <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700" key={item._id}>
      <Slider {...settings}>
      {item.image.map((image,index)=>  <a href="#" key={index}>
          <img
            className="rounded-t-lg p-7 w-96 h-80 object-content hover:scale-110 transition-transform"
            src={`${url}/products/${image}`}
// onMouseOver={()=>setIndexNo((indexno)=>indexno+1)}
alt={`Slide ${index + 1}`}
          />
        </a>)}
      </Slider>
        <div className="px-5 pb-5">
       
            <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
              {item.productname.length > 20 ? `${item.productname.slice(0,20)}...`:item.productname}
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
            onClick={()=>update(item)}
              // to={`/update/:${item._id}`}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update
            </Link>
            <button
           type='button'
              onClick={()=>deletproduct(item._id)}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Delete
            </button>
          </div>
        </div>
      </div>))}
     
     
    </div>
      
    <div className="flex flex-col items-center">
  {/* Help text */}
  {/* <span className="text-sm text-gray-700 dark:text-gray-400">
    Showing{" "}
    <span className="font-semibold text-gray-900 dark:text-white">1</span> to{" "}
    <span className="font-semibold text-gray-900 dark:text-white">10</span> of{" "}
    <span className="font-semibold text-gray-900 dark:text-white">100</span>{" "}
    Entries
  </span> */}
  <div className="inline-flex mt-2 xs:mt-0">
    {/* Buttons */}
    <button onClick={()=>setpage((currentpage)=> currentpage -1)}            
     className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
      <svg
        className="w-3.5 h-3.5 me-2 rtl:rotate-180"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 5H1m0 0 4 4M1 5l4-4"
        />
      </svg>
      Prev
    </button>
    <button onClick={()=>setpage((currentpage)=> currentpage +1)}
     className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
      Next
      <svg
        className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </button>
  </div>
</div>
    </div>
        ):(
          <div className="">
            <UpdateProduct products={updatedata}/>
          </div>
        )
      }

    </div>
  )
}

export default ViewProducts
