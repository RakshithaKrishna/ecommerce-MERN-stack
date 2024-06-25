import React from 'react';
import Nav from './Nav';
import Footer from '../Home/Footer';
import AxiosApi, { url } from '../AxiosAPI';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Home/MetaData';

const ProfileComponent = () => {
    const profiles = JSON.parse(sessionStorage.getItem("customer"));

  const NavigateTo = useNavigate()

    const myorders =() =>{
      NavigateTo('/orders')
    }
    const Coupon = () =>{
      NavigateTo('/coupon')
    }

 

    const Logout= () =>{
     document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
     sessionStorage.clear()
     localStorage.clear()
     // Redirect the user to the login page or any other desired location
     NavigateTo('/')
 }

    return (
      <div className="">
        <MetaData title={"Profile"} />
        <Nav/>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 min-h-screen">
        <div className="mb-4">
          <img
            className="w-20 h-20 rounded-full mx-auto"
            src={`${url}/users/${profiles.Avathar}`}
            alt="User Avatar"
          />
        </div>


        <div className="mb-4 relative left-96 flex space-x-3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username :
          </label>
          <p className="text-gray-700">{profiles.name}</p>
        </div>
        <div className="mb-4 relative left-96 flex space-x-3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email :
          </label>
          <p className="text-gray-700">{profiles.email}</p>
      
        </div>
        
        <div className="mb-4 text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            type="button"
           onClick={myorders}

          >
            My Orders
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            type="button"
            onClick={Coupon}
          >
            My Coupon Code
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={()=>Logout()}
          >
            Logout
          </button>
        </div>
      </div>
      <Footer/>
    </div>
    );
};

export default ProfileComponent;
