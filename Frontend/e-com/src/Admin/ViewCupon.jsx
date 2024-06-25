import React, { useEffect, useState } from 'react'
import AxiosApi, { url } from '../AxiosAPI';

const ViewCupon = () => {


  const [data , setdata] = useState('')

  const gettingdata = async() =>{
    try{
      const response = await AxiosApi.get('/admin/cupon')
      console.log(response , 'getting cupon')
      setdata(response.data.cupon)

    }catch(error){
      console.log(error)
    }
  }


  useEffect(()=>{
   gettingdata()
  },[])

    const DummyCouponData = [
        {
          code: 'SAVE20',
          discountAmount: '20%',
          expirationDate: '2024-06-30',
          Status:'false'
        },
        {
          code: 'GET50OFF',
          discountAmount: '50%',
          expirationDate: '2024-07-15',
          Status:'false'
        },
        {
          code: 'FREESHIP',
          discountAmount: '10%',
          expirationDate: '2024-05-31',
          Status:'false'
        },
      ];
  return (
    <div className="w-full  ml-14 mt-11">
    <table className="w-full whitespace-nowrap">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2">#</th>
          <th className="px-4 py-2">Coupon Code</th>
          <th className="px-4 py-2">Discount Amount</th>
          <th className="px-4 py-2">Expiration Date</th>
          {/* <th className="px-4 py-2">Status</th> */}
        </tr>
      </thead>
      <tbody>
        {data && data.map((coupon, index) => (
          <tr key={index} className="bg-white">
            <td className="border px-4 py-2">{index + 1}</td>
            <td className="border px-4 py-2">{coupon.code}</td>
            <td className="border px-4 py-2">{coupon.discountAmount}%</td>
            <td className="border px-4 py-2">{coupon.Validity}</td>
            {/* <td className="border px-4 py-2">{coupon.Status}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default ViewCupon
