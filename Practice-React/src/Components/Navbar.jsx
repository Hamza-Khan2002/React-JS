import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-screen h-16 bg-emerald-700 mt-8 flex items-center justify-between px-5'>
        <h1 className='font-extrabold text-white text-4xl -translate-y-1/20'>Shopify</h1>

        <div className='flex gap-6 font-bold text-white text-xl'>
            <NavLink to='/' 
            className={({isActive}) => isActive ? "bg-white text-emerald-700 px-3 rounded": "bg-emerald-700 text-white"}>
            Home
            </NavLink>
            <NavLink to='/gallery' 
            className={({isActive}) => isActive ? "bg-white text-emerald-700 px-3 rounded": "bg-emerald-700 text-white"}>
            Gallery
            </NavLink>

            <NavLink to='/about' 
            className={({isActive}) => isActive ? "bg-white text-emerald-700 px-3 rounded": "bg-emerald-700 text-white"}>
            About
            </NavLink>

            <NavLink to='/contact' 
            className={({isActive}) => isActive ? "bg-white text-emerald-700 px-3 rounded": "bg-emerald-700 text-white"}>
            Contact
            </NavLink>
        </div>
    </div>
  )
}

export default Navbar