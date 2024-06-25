import React from 'react'
import MainNav from './MainNav';
import Footer from '../Home/Footer';
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import AxiosApi from '../AxiosAPI';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const {handleSubmit:handleSubmit2 , register:register2} = useForm();
  const NavigateTo = useNavigate()

  const handlelogin = async(data) =>{
    console.log(data, "sfsfsfadadada")
    try{
       if(data.email === 'admin@gmail.com' && data.password === 'admin'){
        const response = await AxiosApi.post(`/admin/login`,data)
        console.log(response)
         NavigateTo('/admin')
       }else{
        try{

          const response = await AxiosApi.post(`/user/login`,data);
          console.log(response);
          const customers = JSON.stringify(response.data.user);
          sessionStorage.setItem('customer',customers);
          toast.success(response.data.message)
          NavigateTo('/home')
        }catch(error){
          console.log(error)
          toast.error(error.response.data.message)
        }
       }
    }catch(error){
      console.log(error)
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
        Log in to your account
      </h1>
      <form className="mt-6" onSubmit={handleSubmit2(handlelogin)}>
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
              ...register2('email')
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
           
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
          focus:bg-white focus:outline-none"
            required=""
            {
              ...register2('password')
            }
          />
        </div>
        <div className="text-right mt-2">
          <a
            href="#"
            className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
          >
            Forgot Password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
        px-4 py-3 mt-6"
        >
          Log In
        </button>
      </form>
      <hr className="my-6 border-gray-300 w-full" />
      {/*   */}
      <p className="mt-8">
        Need an account?{" "}
        <Link to='/register' className="text-blue-500 hover:text-blue-700 font-semibold">
          Create an account
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

export default Login
