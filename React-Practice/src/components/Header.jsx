import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = ({search, setSearch}) => {
  
  const location = useLocation();
  const navigate = useNavigate()

  const handleBack = () =>{
    if(location.state?.from){
      navigate(location.state.from)
    } else{
      navigate('/')
    }
  }

  
  return (
    <div 
    className= "w-full h-20 flex justify-between items-center bg-linear-to-r from-red-900 via-black to-red-900 px-3 fixed top-0 left-0">
      <img className='h-15 w-38 lg:h-17 lg:w-48'
      src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png" alt="" />

      {(location.pathname === "/" || /^\/\d+$/.test(location.pathname)) && (
        <input value={search} onChange={(e) => setSearch(e.target.value)}
        type="text" placeholder='Search'
        className='bg-white w-35 h-8 lg:w-50 rounded-full px-3 text-sm outline-none translate-y-[15%]'
        />
      )}

      {location.pathname.startsWith("/pokemon") && (
        <button onClick={handleBack}
        className='text-white [-webkit-text-stroke:0.8px_black] tracking-wider font-extrabold bg-amber-400 cursor-pointer active:scale-95 px-10 py-1 border-blue-900 border-4 rounded-full translate-y-[15%]'>BACK</button>
      )}
    </div>
  )
}

export default Header
