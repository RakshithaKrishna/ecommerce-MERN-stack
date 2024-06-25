import React, { useState } from 'react';
import MainNav from './MainNav';
import Footer from '../Home/Footer';
import { Link } from 'react-router-dom';
import AxiosAPI from '../AxiosAPI';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {

const {handleSubmit:handleSubmit1 , register:register1} = useForm();
const [image,setimage] = useState()
const handleimage = (e)=>setimage(e.target.files[0])
const NavigateTo = useNavigate()
const CustomerRegister = async(data) =>{
  const Mydata  = new FormData()
  for(let [key,value] of Object.entries(data)){
    Mydata.append(key,value)
  }
  Mydata.append('Avathar',image)
  try{
    const response = await AxiosAPI.post(`/user/register`,Mydata);
    console.log(response)
    toast.success(response.data.message)
    NavigateTo('/login')

  }catch(error){
    console.log(error)
    toast.error(error.response?.data.message)
  }
}







  return (
    <div className="">
    <MainNav/>

<div>
  <section className="flex flex-col md:flex-row h-screen items-center">
<div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
<img
  src="9.png"
  alt=""
  className="w-full h-full object-cover"
/>
</div>
<div
className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
flex items-center justify-center"
>
<div className="w-full h-100">
  <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
    Create  your account
  </h1>
  <form className="mt-6" onSubmit={handleSubmit1(CustomerRegister)} encType="multipart/file" >
  <div>
      <label className="block text-gray-700">Name</label>
      <input
        type="text"
        name=""
        id=""
        placeholder="Enter Your Name"
        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
        autofocus=""
        autoComplete=""
        required=""
        {
          ...register1('name')
        }
      />
    </div>
    <div>
      <label className="block text-gray-700">Email Address</label>
      <input
        type="email"
        name=""
        id=""
        placeholder="Enter Email Address"
        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
        autofocus=""
        autoComplete=""
        required=""
        {
          ...register1('email')
        }
      />
    </div>
    <div className="mt-4">
      <label className="block text-gray-700">Password</label>
      <input
        type="password"
        name=""
        id=""
        placeholder="Enter Password"
        minLength={6}
        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
      focus:bg-white focus:outline-none"
        required=""
        {
          ...register1('password')
        }
      />
    </div>
    <div>
      <label className="block text-gray-700">Profile</label>
      <input
        type="file"
        name=""
        id=""
        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
        autofocus=""
        autoComplete=""
        required=""
        onChange={handleimage}
      />
    </div>
    
    <button
      type="submit"
      className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
    px-4 py-3 mt-6"
    >
      Sign Up
    </button>
  </form>
  <hr className="my-6 border-gray-300 w-full" />
  {/*   */}
  <p className="mt-8">
    Already Account?{" "}
    <Link to='/login' className="text-blue-500 hover:text-blue-700 font-semibold">
      Login
    </Link>
  </p>
</div>
</div>
</section>
</div>
<Footer/>
</div>
  )
}

export default Register
