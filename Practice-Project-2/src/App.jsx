import React, { useState } from 'react'
import Section1 from './Components/Section1'
import Section2 from './Components/Section2'

const App = () => {
    
    const [vals, setVals] = useState([])
    const [val1, setVal1] = useState('')
    const [val2, setVal2] = useState('')

    

  return (
    <div className='min-h-screen lg:flex'>
      <Section1 val1 = {val1} val2 = {val2} vals = {vals} setVal1 = {setVal1} setVal2 = {setVal2} setVals = {setVals}/>
      
      <Section2 array = {vals} setVals = {setVals}/>
    </div>
  )
}

export default App