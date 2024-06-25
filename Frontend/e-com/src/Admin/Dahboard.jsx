import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import AxiosApi from '../AxiosAPI';


const Dahboard = () => {


const [data,setdata] = useState();
 const [noOfUSers, setNoOfUsers]=useState();
 const [noOfProds, setNoOfProds]=useState();
 const [noOfOrders, setNoOfOrders]=useState();
 const [userCounts, setUserCount]=useState([]);
 const [productcount,setproductcount] = useState([]);
 const [orderscount , setordercount] = useState([]);
let userCount=[];
const count = async()=>{
    try{
     const response = await AxiosApi.get(`/admin/count`);
     console.log(response,'counts');
     setUserCount(response.data.user)
     setproductcount(response.data.product)
     setordercount(response.data.order)
     setNoOfUsers(response.data.users);
     setNoOfProds(response.data.products);
     setNoOfOrders(response.data.orders)
    }catch(error){
        console.log(error)
    }
}
userCounts.map((item)=>userCount.push(item.count) )
console.log(userCount, "userCi");
productcount?.map((item)=>productcount.push(item.count))
orderscount?.map((item)=>orderscount.push(item.count))
useEffect(()=>{
    count()
},[])










    const lineChartData = {
        options: {
            chart: {
                id: 'line-chart',
            },
            xaxis: {
                categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            },
        },
        series: [
            {
                name: 'Users',
                data: userCount
                // [30, 40, 35, 50, 49, 60, 70],
            },
            {
                name: 'Products',
                data: productcount
                //[1, 5, 5, 2, 5, 6, 7],
            },
            {
                name: 'Orders',
                data: orderscount
                //[1, 2, 3, 2, 5, 6, 7],
            },
            // {
            //     name: 'Reviews',
            //     data: [5, 10, 15, 20, 25, 30, 35],
            // },
        ],
    };

    // Dummy data for pie chart
    const pieChartData = {
        options: {
            labels: ['Users', 'Products', 'Orders'],
        },
        series: [noOfUSers, noOfProds, noOfOrders],
    };
  return (
    <div className=''>
      <div className=" flex space-x-16 mt-2 m-2  ml-10 h-72 w-[1150px] items-center p-3  ">
         
      <div className="flex w-64 h-36 space-x-3 bg-white items-center align-middle p-4 rounded-md shadow-lg hover:bg-blue-400 hover:text-white border border-zinc-500">
  <i className="fa-solid fa-users text-black text-5xl rounded-full bg-red-200 p-2 hover:text-white"></i>
  <p className='text-gray-950 font-extrabold hover:text-white'>Users:{noOfUSers}</p>
</div>

          <div className=" flex w-64 h-36 space-x-3 bg-white  items-center align-middle p-4 rounded-md shadow-lg  hover:bg-blue-400 hover:text-white border border-zinc-500  ">
          <i className="fa-brands fa-product-hunt text-black text-5xl rounded-full bg-red-200 p-2 "></i>
          <p className=' text-gray-950 font-extrabold'>Products:{noOfProds}</p>

          </div>
          <div className=" flex w-64 h-36 space-x-3 bg-white  items-center align-middle p-4 rounded-md shadow-lg   hover:bg-blue-400 hover:text-white border border-zinc-500  ">
          <i className="fa-solid fa-truck text-black text-5xl rounded-full bg-red-200 p-2 "></i>
          <p className=' text-gray-950 font-extrabold'>Orders:{noOfOrders}</p>

          </div>
          {/* <div className=" flex w-64 h-36 space-x-3 bg-white  items-center align-middle p-4 rounded-md  shadow-lg  ">
          <i className="fa-regular fa-star text-black text-5xl rounded-full bg-red-200 p-2 "></i>
          <p className=' text-gray-950 font-extrabold'>Rating:234</p>

          </div> */}
          
      </div>
      <div className=" flex justify-around bg-slate-100 mt-3 m-2 p-5">
      <div className="bg-white p-4 rounded shadow-md w-[500px]">
                    <h3 className="text-lg font-semibold mb-2">Line Chart</h3>
                    <ReactApexChart
                        options={lineChartData.options}
                        series={lineChartData.series}
                        type="line"
                        height={300}
                    />
                </div>
                <div className="bg-white p-4 rounded shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Pie Chart</h3>
                    <ReactApexChart
                        options={pieChartData.options}
                        series={pieChartData.series}
                        type="pie"
                        height={300}
                    />
                </div>

      </div>

    </div>
  )
}

export default Dahboard
