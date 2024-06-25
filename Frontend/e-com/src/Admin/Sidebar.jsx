import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>
       <div className="bg-slate-800 w-64 h-screen">
                <div>
                    <p className="text-4xl text-slate-50 font-serif p-2">Admin Access</p>
                </div>
                <div className="mt-1 ml-4">
                    <ul className="list-none">
                        <Link to="/users">
                            <li className="text-white text-xl mb-4 hover:text-cyan-500 hover:underline">Users</li>
                        </Link>
                        <Link to="/settings">
                            <li className="text-white text-xl mb-4 hover:text-cyan-500 hover:underline">Settings</li>
                        </Link>
                        <Link to="/analytics">
                            <li className="text-white text-xl mb-4 hover:text-cyan-500 hover:underline">Analytics</li>
                        </Link>
                        <Link to="/reports">
                            <li className="text-white text-xl mb-4 hover:text-cyan-500 hover:underline">Reports</li>
                        </Link>
                        <Link to="/logout">
                            <li className="text-white text-xl mb-4 hover:text-cyan-500 hover:underline">Logout</li>
                        </Link>
                    </ul>
                </div>
            </div>
    </div>
  )
}

export default Sidebar
