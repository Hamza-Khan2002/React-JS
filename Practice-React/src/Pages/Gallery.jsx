import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import GalleryLayout from './GalleryLayout'

const Gallery = () => {
  return (
    <>  
      <div className='flex justify-center gap-5 text-xl font-semibold underline'>
        <NavLink to='/gallery/family'
        className={({isActive}) => isActive ? "bg-emerald-700 text-white px-4 rounded border-2 border-white": "bg-white text-black"}
        >Family</NavLink>


        <NavLink to='/gallery/My'
        className={({isActive}) => isActive ? "bg-emerald-700 text-white px-4 rounded border-2 border-white": "bg-white text-black"}
        >My Gallery</NavLink>
      </div>

      <Outlet />
    </>
    
  )
}

export default Gallery