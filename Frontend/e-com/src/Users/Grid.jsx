import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosApi, { url } from '../AxiosAPI'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { productAtom } from "../store"
import { useAtom } from 'jotai/react'
const Grid = () => {
  const [data, setdata] = useState()
  const customer = JSON.parse(sessionStorage.getItem('customer'))
  const [pagenumber, setpagenumber] = useState(1)
  const [product, setProduct] = useAtom(productAtom)
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  const navigate = useNavigate()

  const products = async () => {
    try {
      const response = await AxiosApi.get(`/user/products/${customer._id}?page=${pagenumber}`);
      console.log(response)
      setdata(response.data.products)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    products()
  }, [pagenumber])




  return (
    <div className=" ">

      <div className=" w-screen mx-auto grid lg:grid-cols-4 gap-y-4 sm:grid-cols-2 hover:gap-y-2 p-3">
        {
          data && data.map((item) => (

            <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">


              <Slider {...settings}>
                {item.image.map((image) => <a href="#" >
                  <img
                    className="rounded-t-lg p-7 w-96 h-80 object-content hover:scale-110 transition-transform"
                    src={`${url}/products/${image}`}


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

      {/* next page */}
      <div className="flex items-end ml-[900px]  mb-3  left-0 mt-3  " >
        <Link
          onClick={() => setpagenumber((pagenumber) => pagenumber - 1)}
          className="border border-teal-500 text-teal-500 block rounded-sm font-bold py-4 px-6 mr-2 flex items-center hover:bg-teal-500 hover:text-white">
          <svg
            className="h-5 w-5 mr-2 fill-current"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="-49 141 512 512"
            style={{ enableBackground: "new -49 141 512 512" }}
            xmlSpace="preserve"
          >
            <path
              id="XMLID_10_"
              d="M438,372H36.355l72.822-72.822c9.763-9.763,9.763-25.592,0-35.355c-9.763-9.764-25.593-9.762-35.355,0 l-115.5,115.5C-46.366,384.01-49,390.369-49,397s2.634,12.989,7.322,17.678l115.5,115.5c9.763,9.762,25.593,9.763,35.355,0 c9.763-9.763,9.763-25.592,0-35.355L36.355,422H438c13.808,0,25-11.193,25-25S451.808,372,438,372z"
            />
          </svg>
          Previous page
        </Link>
        <Link to='/more'
          onClick={() => setpagenumber((pagenumber) => pagenumber + 1)}
          className="border border-teal-500 bg-teal-500 text-white block rounded-sm font-bold py-4 px-6 ml-2 flex items-center">
          Next page
          <svg
            className="h-5 w-5 ml-2 fill-current"
            clasversion="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="-49 141 512 512"
            style={{ enableBackground: "new -49 141 512 512" }}
            xmlSpace="preserve"
          >
            <path
              id="XMLID_11_"
              d="M-24,422h401.645l-72.822,72.822c-9.763,9.763-9.763,25.592,0,35.355c9.763,9.764,25.593,9.762,35.355,0
      l115.5-115.5C460.366,409.989,463,403.63,463,397s-2.634-12.989-7.322-17.678l-115.5-115.5c-9.763-9.762-25.593-9.763-35.355,0
      c-9.763,9.763-9.763,25.592,0,35.355l72.822,72.822H-24c-13.808,0-25,11.193-25,25S-37.808,422-24,422z"
            />
          </svg>
        </Link>
      </div>


    </div>
  )
}

export default Grid



7659971865