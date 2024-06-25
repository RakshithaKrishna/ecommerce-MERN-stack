import React, { useEffect, useState } from 'react';
import Nav from './Nav'
import Footer from '../Home/Footer';
import AxiosApi,{url} from '../AxiosAPI';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Home/MetaData';


const Vieworders = () => {


  const profiles = JSON.parse(sessionStorage.getItem("customer"));

 const [data,setdata] = useState([])
 const [show, setshow] = useState(false)


  const gettingorder =async()=>{
    try{
      const response = await AxiosApi.get(`user/order/${profiles._id}`);
      console.log(response,"getting order")
      setdata(response.data.order)

    }catch(error){
      console.log(error)
    }
  }


useEffect(()=>{
  gettingorder()
},[])


const NavigateTo = useNavigate()
const feedback = (item) => {
  NavigateTo('/feedback' ,{state:item})
}



  return (
    <div>
      <MetaData title={"view orders"} />
        <Nav/>
      <section className="py-24 relative">
  <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
    <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
        <div className="data">
           <h4 className=' uppercase text-2xl text-slate-700 underline font-serif'>MY Orders</h4>
        </div>
      
      </div>
      <div className="w-full px-3 min-[400px]:px-6">
        {
          data && data.map((item)=>(
        <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
          
          <div className="img-box max-lg:w-full">
            <img
              src={`${url}/products/${item.products[0]?.image[0]}`}
              alt="Premium Watch image"
              className="aspect-square w-full lg:max-w-[140px]"
            />
          </div>
          <div className="flex flex-row items-center w-full ">
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
              <div className="flex items-center">
                <div className="">
                  <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                 { item.products[0]?.productname.length > 20 ? `${item.products[0]?.productname.slice(0,20)}...` : item.products[0]?.productname}
                  </h2>
                  <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                    By: Shop Smart
                  </p>
                  <div className="flex items-center ">
                    <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                    category: <span className="text-gray-500">{item.products[0]?.category}</span>
                    </p>
                    <p className="font-medium text-base leading-7 text-black ">
                      Qty: <span className="text-gray-500">{item.quantity}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-6">
                <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                  <div className="flex gap-3 lg:block">
                    <p className="font-medium text-sm leading-7 text-black">
                      price
                    </p>
                    <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                      {item.amount}
                    </p>
                  </div>
                </div>
                <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                  <div className="flex gap-3 lg:block">
                    <p className="font-medium text-sm leading-7 text-black">
                      Status
                    </p>
                    <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                     {item.Status}
                    </p>
                  </div>
                </div>
                <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                  <div className="flex gap-3 lg:block">
                    <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                     Payment
                    </p>
                    <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                     {item.payment}
                    </p>
                  </div>
                  <div className="  relative left-10">
                  {item.Status === 'Delivered' && (
                                <button className='w-20 p-1 h-8 bg-sky-500 rounded-md text-slate-50' onClick={()=>feedback(item)}>Feedback</button>
                              )}
                </div>
                </div>
                
                
              </div>
            </div>
          </div>
        </div>

          ))
        }
        {/* <div className="flex flex-col lg:flex-row items-center py-6 gap-6 w-full">
          <div className="img-box max-lg:w-full">
            <img
              src="https://pagedone.io/asset/uploads/1701167621.png"
              alt="Diamond Watch image"
              className="aspect-square w-full lg:max-w-[140px]"
            />
          </div>
          <div className="flex flex-row items-center w-full ">
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
              <div className="flex items-center">
                <div className="">
                  <h2 className="font-semibold text-xl leading-8 text-black mb-3 ">
                    Diamond Platinum Watch
                  </h2>
                  <p className="font-normal text-lg leading-8 text-gray-500 mb-3">
                    Diamond Dials
                  </p>
                  <div className="flex items-center  ">
                    <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                      Size: <span className="text-gray-500">Regular</span>
                    </p>
                    <p className="font-medium text-base leading-7 text-black ">
                      Qty: <span className="text-gray-500">1</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-5">
                <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                  <div className="flex gap-3 lg:block">
                    <p className="font-medium text-sm leading-7 text-black">
                      price
                    </p>
                    <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                      $100
                    </p>
                  </div>
                </div>
                <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                  <div className="flex gap-3 lg:block">
                    <p className="font-medium text-sm leading-7 text-black">
                      Status
                    </p>
                    <p className="font-medium text-sm leading-6 py-0.5 px-3 whitespace-nowrap rounded-full lg:mt-3 bg-indigo-50 text-indigo-600">
                      Dispatched
                    </p>
                  </div>
                </div>
                <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                  <div className="flex gap-3 lg:block">
                    <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                      Expected Delivery Time
                    </p>
                    <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                      23rd March 2021
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  </div>
</section>
<Footer/>

    </div>
  )
}

export default Vieworders
