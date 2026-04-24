import React from 'react'
import LeftContent from './LeftContent'
import RightContent from './RightContent'

const Center = () => {
  return (
    <div className='flex gap-10 mt-6'>
        <LeftContent />
        <RightContent />
    </div>
  )
}

export default Center