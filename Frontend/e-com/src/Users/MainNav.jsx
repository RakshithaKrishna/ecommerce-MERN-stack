import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const MainNav = () => {





  return (
    <div style={{ position: 'sticky', top: '0', zIndex: '99' }}>
  <div>
    <div className="flex justify-between h-16 w-screen bg-slate-100 items-center px-4 lg:px-8">
      <div className="flex items-center">
        <img src="9.png" alt="" className="mt-1 rounded-full h-12 w-12 lg:h-10 lg:w-10" />
        <Link to="/" className="text-black text-2xl ml-2 font-serif lg:text-2xl">ShopSmart</Link>
      </div>
      
      <div className="hidden md:flex items-center space-x-4">
        <Link to="/login" className="text-black md:text-lg lg:text-2xl font-serif">Sign In</Link>
        <Link to="/register" className="text-black md:text-lg lg:text-2xl font-serif">Sign Up</Link>
      </div>
      <div className=" md:hidden flex items-center space-x-4">
        <Link to="/register">
        <i class="fa-regular fa-registered text-lg "></i>

        </Link>
        <Link to="/login">
        <i class="fa-solid fa-arrow-right-to-bracket"></i>
        </Link>
      </div>
    </div>
  </div>
</div>

  )
}

export default MainNav
