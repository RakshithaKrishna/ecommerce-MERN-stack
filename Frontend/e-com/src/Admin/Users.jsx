import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import AxiosApi,{url} from '../AxiosAPI'
const Users = () => {

  const [data,setdate] = useState()
const [pageNumber ,setPageNumber]=useState(1);
 
  const getcustomers = async()=>{
    try{
      const response = await AxiosApi.get(`/admin/users?page=${pageNumber}`);
      console.log(response)
      setdate(response.data.Customers)

    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getcustomers();
  }, [pageNumber])
 
  const formatedate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0];
  }
  
  const [code ,setcode] = useState('')

  const giveCupon = async(id)=>{
    try{
      const responce = await AxiosApi.put(`/admin/user/${id}`,{cuponcode:code})
      console.log(responce,"cupon responce")
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className=' ml-40'>
      <section className="container mx-auto p-6 font-mono">
  <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
    <div className="w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Password</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Cupon</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {
          data && data.map((item)=>(

          <tr className="text-gray-700" key={item._id}>
            <td className="px-4 py-3 border">
              <div className="flex items-center text-sm">
                <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                  <img
                    className="object-cover w-full h-full rounded-full"
                    src={`${url}/users/${item.Avathar}`}
                    alt=""
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 rounded-full shadow-inner"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="font-semibold text-black">{item.name}</p>
                  
                </div>
              </div>
            </td>
            <td className="px-4 py-3 text-ms font-semibold border">{item.email}</td>
            <td className="px-4 py-3 text-xs border">
              {item.password}
            </td>
            <td className="px-4 py-3 text-sm border">{formatedate(item.dates)}</td>
            <td className="px-4 py-3 text-sm border">
              <input type="text" name='code'    value={code} className=' w-16 h-6' onChange={(e)=>setcode(e.target.value)} />
              <button className='w-10 h-8 text-white border border-zinc-200 bg-blue-400 rounded-md' onClick={()=>giveCupon(item._id)}>Send</button>
            </td>
          </tr>
          ))
          }
          
          
        </tbody>
      </table>
    </div>
  </div>
</section>
<div className="flex flex-col items-center mb-1">
  <div className="inline-flex mt-2 xs:mt-0">
    {/* Buttons */}
    <button onClick={()=> setPageNumber((current)=>current-1)}
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
    <button onClick={()=>setPageNumber((current)=>current+1)}
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

  )
}

export default Users
