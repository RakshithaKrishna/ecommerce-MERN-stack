import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import Footer from '../Home/Footer';
import AxiosApi from '../AxiosAPI';
const UserCouponView = () => {
    // Dummy coupon data

  const [data,setdata] = useState('')
 
  const profiles = JSON.parse(sessionStorage.getItem("customer"));


  const gettingdata =async() =>{
    try{
        const response = await AxiosApi.get(`/user/couponcode/${profiles._id}`)
        console.log(response,"geting cupon")
        setdata(response.data.data[0].coupons)
        

    }catch(error){
        console.log(error)
    }
  }

  useEffect(()=>{
    gettingdata()
  },[])





    const coupons = [
        { code: 'SAVE10', expiryDate: '2024-12-31' },
        { code: 'FREESHIP', expiryDate: '2024-06-30' },
        { code: 'SUMMER25', expiryDate: '2024-08-15' }
    ];

    return (
        <div className="">
        <Nav/>
        <div className="max-w-lg mx-auto mt-8 min-h-screen">
            <h2 className="text-xl font-semibold mb-4">Your Coupons</h2>
            <div className="grid gap-4">
                {data && data.map((coupon, index) => (
                    <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">{coupon.code}</h3>
                            <h3 className="text-lg font-semibold">{coupon.discountAmount}</h3>
                            <span className="text-sm text-gray-500">Expires on {coupon.Validity}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <Footer/>
        </div>
    );
};

export default UserCouponView;
