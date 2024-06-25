import React from 'react'
import Nav from './Nav'
import Footer from '../Home/Footer'
import { Link } from 'react-router-dom'


const RejectOrder = () => {
  return (
    <div>
      <Nav/>
        <div className="">
            <Link to='/home'>
           <video src="incorrect.mp4" autoPlay>

           
           </video>
            </Link>
           
        </div>
      <Footer/>
    </div>
  )
}

export default RejectOrder
