import React, { useState } from 'react';
import Nav from './Nav';
import Footer from '../Home/Footer';
import { Link, useNavigate } from 'react-router-dom'; 
import MetaData from '../Home/MetaData';




const Shipping = () => {


  
  const [ShippingDetails , setShippingDetails] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    state: '',
    zipcode: '',
    mobilenumber:''
  })
  
  
  const navigate = useNavigate();

const Change =(e) =>{
  const {name,value} = e.target;
  setShippingDetails({...ShippingDetails,[name]:value})
}




const paymentPage =()=>{
  navigate('/payment',{state:ShippingDetails})
}


  return (
    <div>
      <MetaData title={"Shipping Details"} />
      <Nav />
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600">Shipping Info</h2>
            <p className="text-gray-500 mb-6">
             Enter the corret Address
            </p>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              
                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        id="full_name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue={ShippingDetails.fullName}
                        onChange={Change}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue={ShippingDetails.email}
                        placeholder="email@domain.com"
                        onChange={Change}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label htmlFor="address">Address / Street</label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue={ShippingDetails.address}
                        placeholder=""
                        onChange={Change}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label htmlFor="address">Mobile Number</label>
                      <input
                        type="text"
                        name="mobilenumber"
                        id="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue={ShippingDetails.mobilenumber}
                        placeholder="mobilenumber"
                        onChange={Change}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue={ShippingDetails.city}
                        placeholder=""
                        onChange={Change}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="country">Country / region</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                          type='text'
                          name="country"
                          id="country"
                          placeholder="Country"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          defaultValue={ShippingDetails.country}
                          onChange={Change}
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="state">State / province</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                         type='text'
                          name="state"
                          id="state"
                          placeholder="State"
                          className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                          defaultValue={ShippingDetails.state}
                          onChange={Change}
                        />
                   
                      </div>
                    </div>
                    <div className="md:col-span-1">
                      <label htmlFor="zipcode">Zipcode</label>
                      <input
                        type="text"
                        name="zipcode"
                        id="zipcode"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder=""
                        defaultValue={ShippingDetails.zipcode}
                        onChange={Change}
                      />
                    </div>                  
                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button 
                        //to='/payment'
                        onClick={paymentPage}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Shipping
