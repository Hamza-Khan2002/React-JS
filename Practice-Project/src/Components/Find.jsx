import {Search} from 'lucide-react'

const Find = () => {
  return (
    <div className='w-1/3 flex gap-2 py-2 px-3 text-center'>
        <i className='text-gray-400 mt-1'><Search /></i>
        <input type="text" placeholder='Search' className='w-full border-b-2 border-gray-400 text'/>
    </div>
  )
}

export default Find