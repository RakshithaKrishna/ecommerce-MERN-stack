import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import Footer from '../Home/Footer';
import { Link } from 'react-router-dom';
import AxiosApi, { url } from '../AxiosAPI';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Home/MetaData';

const Cart = () => {

  const [data, setdata] = useState([])
  const [total, settoatal] = useState(0);
  const [isEmpty, setisEmpty] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [couponDetails, setCouponDetails] = useState(null);

  const customer = JSON.parse(sessionStorage.getItem('customer'))

  const product = async () => {
    try {
      const response = await AxiosApi.get(`/user/carts/${customer._id}`)
      console.log(response);
      setdata(response.data.products);
      calculateSubtotal(response.data.products);
      setisEmpty()
    } catch (error) {
      console.log(error)
    }
  }




  const Storages = () => {
    const datastorage = JSON.stringify(data)

    localStorage.setItem('products', datastorage)
    localStorage.setItem('totalPrice', totalPrice.toString());

  }


  const update = async (id, quantity) => {
    try {
      const response = await AxiosApi.put(`/user/cart/${customer._id}/${id}`, { quantity: quantity });
      console.log(response, "response");
      // After successful update, you may want to update the cart data
      product();
    } catch (error) {
      console.log(error);
    }
  };










  //calaculate the prices
  const calculateSubtotal = (products) => {
    // console.log(products,"products")
    const total = products.reduce((acc, item) => acc + item.productDetails[0].Price*item.quantity, 0);
    console.log(total,"total")
    
    settoatal(total);
    setisEmpty(products.length === 0);
  };

  const shippingCost = 40; // Define your shipping cost here

  const totalPrice = total + shippingCost;








  useEffect(() => {
    product()
  }, [])


  //delete the product
  const deleteProduct = async (id) => {
    try {
      const response = await AxiosApi.delete(`/user/cart/${customer._id}/${id}`);
      console.log(response)
      product()
    } catch (error) {
      console.log(error)
    }
  }


  // const applyCoupon = async () => {
  //   try {
  //     const response = await AxiosApi.post(`user/apply/${customer._id}`, { cupon: couponCode });
  //     setCouponDetails(response.data.Cuponcode[0]?.cupon[0]?.discountAmount);
  //     console.log(response.data, "cupon detils")
  //     const cuponid = JSON.stringify(response.data.Cuponcode[0]?.cupon[0]?._id)
  //     console.log(cuponid)
  //     if(cuponid){
  //       localStorage.setItem("cuponid",cuponid)
  //     }
  //     // console.log(response.data.Cuponcode[0]?.cupon[0]?.discountAmount,"data")
   
  //     // If coupon has a discount, calculate the new total price
  //     if (response.data.Cuponcode[0]?.cupon[0]?.discountAmount) {
  //       const coupon = response.data.Cuponcode[0]?.cupon[0];

  //       // Check if coupon exists and has a discount percentage
  //       if (coupon && coupon.discountAmount) {
  //         // Convert discount percentage to a decimal value
  //         const discountPercentage = parseFloat(coupon.discountAmount) / 100;
  //         console.log(discountPercentage)
        
  //         // Calculate the discount amount
  //         const discountAmount = total * discountPercentage;
  //         console.log(discountAmount)
        
  //         // Calculate the new total after applying the discount
  //         const newTotal = total - discountAmount;
  //         console.log(newTotal)
        
  //         // Set the new total
  //         settoatal(newTotal < 0 ? 0 : newTotal);
  //       // Ensure total doesn't go below zero
  //     }}
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const applyCoupon = async () => {
    try {
      const response = await AxiosApi.post(`user/apply/${customer._id}`, { cupon: couponCode });
      const coupon = response.data.Cuponcode[0]?.cupon[0];
  
      // Check if the coupon exists and if it has a discount amount and expiration date
      if (coupon && coupon.discountAmount && coupon.Validity) {
        const expirationDate = new Date(coupon.Validity);
        const currentDate = new Date();
  
        // Compare expiration date with current date
        if (expirationDate < currentDate) {
          console.log("Coupon has expired");
          // Handle the case where the coupon has expired, e.g., display a message to the user
          return;
        }
  
        setCouponDetails(coupon.discountAmount);
        const cuponid = JSON.stringify(coupon._id);
        console.log(cuponid);
        if (cuponid) {
          localStorage.setItem("cuponid", cuponid);
        }
  
        // Calculate the discount percentage
        const discountPercentage = parseFloat(coupon.discountAmount) / 100;
        
        // Calculate the discount amount
        const discountAmount = total * discountPercentage;
        
        // Calculate the new total after applying the discount
        const newTotal = total - discountAmount;
  
        // Set the new total, ensuring it doesn't go below zero
        settoatal(newTotal < 0 ? 0 : newTotal);
      } else {
        console.log("Coupon is not valid or has no discount amount or expiration date");
        // Handle the case where the coupon is not valid or missing required information
      }
    } catch (error) {
      console.log(error);
    }
  };
  




  return (
    <div>
      <MetaData title={"cart page"}/>
      <Nav />

      {isEmpty ? (<div className=" items-center ml-96  justify-center align-middle">
        <img src="empty.png" alt="" className=' w-1/2 h-1/2  rounded-lg ' />
        <h2 className=' ml-36 text-4xl'>Your Cart is empty  🥺 </h2>
      </div>) :

        (<section className=" min-h-screen overscroll-y-auto bg-gray-100 py-12 sm:py-16 lg:py-20">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center">
              <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
            </div>
            <div className="mx-auto mt-8 max-w-md md:mt-12">
              <div className="rounded-3xl bg-white shadow-lg">
                <div className="px-4 py-6 sm:px-8 sm:py-10">
                  <div className="flow-root">
                    <ul className="-my-8">
                      {
                        data && data.map((item) => (

                          <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0" key={item._id}>
                            <div className="shrink-0 relative">
                              <img
                                className="h-24 w-24 max-w-full rounded-lg object-cover"
                                src={`${url}/products/${item.productDetails[0].image[0]}`}
                                alt=""
                              />
                            </div>
                            <div className="relative flex flex-1 flex-col justify-between">
                              <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                <div className="pr-8 sm:pr-5">
                                  <p className="text-base font-semibold text-gray-900">
                                    {item.productDetails[0].productname}
                                  </p>
                                  <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                                    {item.productDetails[0].category}
                                  </p>
                                </div>
                                <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                  <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                    ₹{item.quantity * item.productDetails[0].Price}
                                  </p>
                                  <div className="flex">

                                    <button className="flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2" onClick={() => update(item._id, item.quantity - 1)}>
                                      -
                                    </button>
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">{item.quantity}</span>
                                    <button className="flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2" onClick={() => update(item._id, item.quantity + 1)}>
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                <button
                                  onClick={() => deleteProduct(item._id)}
                                  type="button"
                                  className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                                >
                                  <svg
                                    className="h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"
                                      className=""
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </li>
                        ))
                      }


                    </ul>
                  </div>
                  {/* <hr class="mx-0 mt-6 mb-0 h-0 border-r-0 border-b-0 border-l-0 border-t border-solid border-gray-300" /> */}
                  <div className="mt-6 space-y-3 border-t border-b py-8">



                    <div className="flex items-center justify-between">
                      <p className="text-gray-400">Subtotal</p>
                      <p className="text-lg font-semibold text-gray-900">₹{total} </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-gray-400">Shipping</p>
                      <p className="text-lg font-semibold text-gray-900">₹40</p>
                    </div>
                    <div className="">
                    <p className="text-gray-400">Cupon</p>
                    <div className="flex"></div>
                    <input type="text"  className=' w-20 h-7 border border-zinc-300 rounded-md ' value={couponCode} onChange={(e) => setCouponCode(e.target.value)}/>
                    <button className='ml-2  w-16 h-7 bg-sky-600 text-neutral-100 hover:text-white rounded-md'onClick={applyCoupon}>Apply</button>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Total</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      <span className="text-xs font-normal text-gray-400">INR</span>{" "}
                      ₹{totalPrice}
                    </p>
                  </div>
                  <div className="mt-6 text-center">
                    <Link
                      to='/shipping'
                      onClick={Storages}

                      type="button"
                      className="group inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                    >
                      Place Order
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>)}

      {/* <Footer/> */}

    </div>
  )
}

export default Cart
