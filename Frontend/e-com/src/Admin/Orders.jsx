import React, { useEffect, useState } from 'react';
import AxiosApi, { url } from '../AxiosAPI';

const Orders = () => {
    // Sample data for orders
  

    // State for selected order status
    const [selectedStatus, setSelectedStatus] = useState('');

    // Function to handle order status change
    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };
 const [data,setdata] = useState()

    const vieworders =async() =>{
        try{
            
            const responce = await AxiosApi.get(`/admin/orders?status=${selectedStatus}`)
            console.log(responce.data.orders,'orders')
            setdata(responce.data.orders)

        }catch(error){
            console.log(error)
        }
    }

useEffect(()=>{
    vieworders()
},[])



const [update, setupdate] = useState('')





const updatestatus = async(id, status) => {
    try {
        const responce = await AxiosApi.put(`/admin/update/${id}`, { status });
        console.log(responce, "update");
    } catch(error) {
        console.log(error);
    }
}















    return (
        <div className="container mx-auto overflow-y-auto max-h-screen">
            <div className=" lg:flex items-end justify-around mt-5 sm:text-center align-middle position-sticky  top-0" >
                <h1 className="text-2xl font-bold mb-4 underline">Admin View Orders</h1>
                <div className=" flex">

                    <label className="block text-gray-700 text-sm font-bold mb-2 mt-2 p-2" htmlFor="category">
                        Category:
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-52 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="category"
                        onChange={handleStatusChange}
                    >
                        <option value="">Select Status</option>
                        <option value="Ready for Delivery">Ready for Delivery</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="processing">processing</option>
                    </select>
                    <i class="fa-solid fa-magnifying-glass p-4"
                    onClick={vieworders}
                    ></i>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 ml-2 ">
    {data && data.map((item) => (
        <div key={item.id} className="bg-white p-3 rounded shadow-md border border-zinc-200">
            <div className="flex items-center mb-4">
                <img src={`${url}/products/${item.products[0].image[0]}`} alt='/' className="w-16 h-16 mr-4" />
                <div>
                    <h2 className="text-lg font-semibold ">Product Name:{item.products[0].productname.length > 20 ? `${item.products[0].productname.slice(0,20)}...`:item.products[0].productname}</h2>
                    <p className="text-gray-500">Price: ${item.amount}</p>
                </div>
            </div>
            <div>
                <p><span className="font-semibold">Name:{item.fullname}</span> </p>
                <p><span className="font-semibold">Order Date:{item.shippingDate}</span> </p>
                <p><span className="font-semibold">MobileNumber:{item.phoneNumber}</span> </p>
                <p><span className="font-semibold">Payment Method:{item.payment}</span> </p>
                <p><span className="font-semibold">Order Date:{item.shippingAddress}</span> </p>
                <div className="mt-4 flex items-center align-bottom space-x-1 ">
                    {/* <label className="block mb-2 font-semibold">Status:</label> */}
                    <select
                        className="px-3 py-2 border rounded-md"
                        defaultValue={item.status || ''}
                        onChange={(e) => setupdate(e.target.value)}
                    >
                        <option value="">Select Status</option>
                        <option value="Ready for Delivery">Ready for Delivery</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={() => updatestatus(item._id, update)}
                    >Send</button>
                </div>
            </div>
        </div>
    ))}
</div>

                <div className="flex flex-col items-center relativeright-0 bottom-0">
  <div className="inline-flex mt-2 xs:mt-0">
    {/* Buttons */}
    <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
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
    <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
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
    );
};

export default Orders;
