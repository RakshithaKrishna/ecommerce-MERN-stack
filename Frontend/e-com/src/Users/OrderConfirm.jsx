import React from 'react'
import Nav from './Nav'
import Footer from '../Home/Footer'
import { Link } from 'react-router-dom'

const OrderConfirm = () => {
  return (
    <div>
        <Nav/>
        <div className="">
           <video src="correct.mp4" autoPlay>DashBoard</video>
           <Link to="/home" className='w-28 h-14 rounded-md bg-sky-600 text-white' >DashBoard</Link>
           
        </div>
      <Footer/>
    </div>
  )
}

export default OrderConfirm
