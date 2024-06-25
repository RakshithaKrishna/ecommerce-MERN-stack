import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Users from './Users';
import Bottom from './Bottom';
import AddProduct from './AddProduct';
import ViewProducts from './ViewProducts';
import Orders from './Orders';
import Feedbacks from './Feedbacks';
import Dashboard from './Dahboard';
import Update from './Update';
import AddCouponForm from './AddCouponForm';
import ViewCupon from './ViewCupon';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const [showUsers, setShowUsers] = useState(false);
    const [showProducts, SetshowProducts] = useState(false)
    const [viewproduct, setViewproduct] = useState(false);
    const [vieworder, setvieworder] = useState(false);
    const [feedback , setfeedback] = useState(false);
    const [dashboard, setdashboard] = useState(true);
    const [openUpdate,setOpenUpdate] = useState(false)
    const [cupon,setcupon] = useState(false)

   const handleClickRender=(arg)=>{
    setOpenUpdate(arg)
   }

 const NavigateTo = useNavigate()

   const Logout= () =>{
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Redirect the user to the login page or any other desired location
    NavigateTo('/')
}



    return (
        <div className=' overflow-hidden'>
            <div className="bg-sky-700 flex items-center justify-between">
                <div className="flex items-center ml-2">
                    <img src="9.png" alt="" className="mt-1 rounded-full h-12 w-12" />
                    <Link to="/" className="text-slate-50 text-2xl font-serif">ShopSmart</Link>
                </div>
                <div className="items-center hidden sm:flex">
                    <h4 className="text-xl text-zinc-50 font-serif mr-3 hidden sm:flex">Admin DashBoard</h4>
                </div>
            </div>

            {/* Sidebar */}
            <div className="flex">
                <div className="bg-slate-800 lg:w-64  h-screen">
                    <div>
                        <p className="text-2xl text-slate-50 font-serif p-2 ">Admin Access</p>
                    </div>
                    <div className="mt-1 ml-4 border-zinc-800">
                        <ul className="list-none">
                        <li className=' flex space-x-3  border-gray-500'>
                                <i className="fa-solid fa-house text-gray-100 text-2xl "></i>
                                <button className="text-white text-xl mb-4 hover:text-cyan-500 hover:underline " onClick={()=>handleClickRender('dash')} >Dashboard</button>
                            </li>
                            <hr />
                            <li className=' flex space-x-3'>
                                <i className="fa-solid fa-users-gear text-gray-100 text-2xl"></i>
                                <button className="text-white text-xl mb-4 hover:text-cyan-500 hover:underline" onClick={()=>handleClickRender('users')}>Users</button>
                            </li>
                            <hr />
                            <li className=' flex space-x-2'>
                            <i className="fa-brands fa-product-hunt text-gray-100 text-2xl"></i>
                                <button className="text-white text-xl mb-4 hover:text-cyan-500 hover:underline" onClick={()=>handleClickRender("addproduct")}>Add Product</button>
                            </li>
                            <hr />
                            <li className=' flex space-x-2'>
                            <i className="fa-solid fa-truck text-gray-100 text-2xl"></i>
                                <button className="text-white text-xl mb-4 hover:text-cyan-500 hover:underline" onClick={()=>handleClickRender("product")}>View Products</button>
                            </li>
                            <hr />
                            <li className=' flex space-x-2'>
                            <i className="fa-solid fa-truck text-gray-100 text-2xl"></i>
                                <button className="text-white text-xl mb-4 hover:text-cyan-500 hover:underline" onClick={()=>handleClickRender("order")}>Orders</button>
                            </li>
                            <hr />
                            <li className=' flex space-x-2'>
                            <i className="fa-regular fa-star text-gray-100 text-2xl"></i>
                                <button to="/reports" className="text-white text-xl mb-4 hover:text-cyan-500 hover:underline" onClick={()=>handleClickRender("feedbacks")}>Feedback</button>
                            </li>
                            <hr/>
                            <li className=' flex space-x-2'>
                            <i className="fa-solid fa-ticket text-gray-100 text-2xl"></i>
                                <button to="/reports" className="text-white text-xl mb-4 hover:text-cyan-500 hover:underline" onClick={()=>handleClickRender("cupon")}>Cupon</button>
                            </li>
                            <hr />
                            <li className=' flex space-x-2'>
                            <i class="fa-solid fa-right-from-bracket  text-gray-100 text-2xl"></i>
                                <button  className="text-white text-xl mb-4 hover:text-cyan-500 hover:underline" onClick={()=>Logout()}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
               

                <div style={{ overflowY: showProducts || vieworder ||viewproduct? 'hidden' : 'auto', }}>
                    {openUpdate==='users' && <Users />}
                    {openUpdate==='addproduct' && <AddProduct />}
                    {openUpdate==="product" && <ViewProducts handleClickRender={handleClickRender}  />}
                    {openUpdate==="order" && <Orders />}
                    {openUpdate==='feedbacks' && <ViewCupon/>}
                    {openUpdate==='dash' && <Dashboard/>}
                    {openUpdate==="update"&&<Update/>}
                    {openUpdate === "cupon" && <AddCouponForm/>}
                </div>
               </div>
            <Bottom/>
        </div>
    );
};

export default Navbar;
