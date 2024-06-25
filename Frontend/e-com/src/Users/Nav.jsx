import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileComponent from './ProfileComponent ';
import { useNavigate } from 'react-router-dom';
import AxiosApi ,{url} from '../AxiosAPI';




const Nav = () => {
    const [profile,setprofile] = useState(false)

    const showprofile =()=>{
        setprofile(!profile)
    }
    

    const customer = JSON.parse(sessionStorage.getItem('customer'))

    const [search,setsearch] = useState('')
    const NavigateTo = useNavigate();

    const searchproduct = async() =>{
        try{
         const response = await AxiosApi.get(`/user/queryproduct/${customer._id}`,{
            params: { productname: search }
        });
         console.log(response,"search product")
         const data =(response.data.data);
         NavigateTo('/search',{state:data})
        }catch(error){
            console.log(error)
        }

    }



//getting user profile 
const profiles = JSON.parse(sessionStorage.getItem("customer"))
console.log(profiles)





    return (
        <div style={{position:'sticky',top:'0',zIndex:'99'}} >

        <div>
            <div className="lg:flex justify-between  h-16 w-screen bg-slate-100">
                <div className="flex items-center">
                    <img src="9.png" alt="" className='mt-1 rounded-full h-16 w-16 ' />
                    <Link to='/home' className='text-slate-900 hover:text-slate-950 text-2xl mt-1 font-serif'>ShopSmart</Link>
                </div>
                <div className=" flex items-center">
                   
                  
                    <div className=" hidden md:block max-w-md mx-auto">
  <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
    <div className="grid place-items-center h-full w-12 text-gray-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={searchproduct}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          onClick={searchproduct}
        />
      </svg>
    </div>
    <input
      className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
      type="text"
      id="search"
      placeholder="Search something.."
      onChange={(e)=>setsearch (e.target.value)}
      value={search}
    />
  </div>
</div>
<div className=" md:hidden max-w-md mx-auto">
  <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
    <div className="grid place-items-center h-full w-12 text-gray-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={searchproduct}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          onClick={searchproduct}
        />
      </svg>
    </div>
    <input
      className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
      type="text"
      id="search"
      placeholder="Search something.."
      onChange={(e)=>setsearch (e.target.value)}
      value={search}
    />
  </div>
</div>

                </div>
                <div className=" hidden md:flex items-center">
                    <Link to="/cart">
                        <i className="fa-solid fa-cart-plus text-slate-900 hover:text-slate-950  text-4xl p-3 mr-7"></i>
                    </Link>
                    <Link to='/profile' className=' mr-2'>
                        <img src={`${url}/users/${profiles.Avathar}`} alt="" srcset="" className='rounded-s-full w-16 h-16 p-2 mr-5' />
                    </Link>
                 
                </div>
            </div>
           


        </div>
        

        </div>
    );
}

export default Nav;
