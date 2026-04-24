import Card from "./Card.jsx"

const RightContent = () => {
  
  let obj =[ 
  {picture:'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  btn:'Experience',
  color: '#CF6551'  
},
  
  {picture:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  btn:'Satisfied',
  color: '#A2CF51'
},
  
  {picture:'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  btn:'Popular',
  color: '#51CFC7'
},
  
  {picture:'https://images.unsplash.com/photo-1608753167203-a19ae87bcba3?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  btn:'Junior',
  color: '#AA65DB'
},
]
  return (
    <div id="right" className='h-135 w-full py-4 flex flex-nowrap overflow-x-auto gap-4'>
      {obj.map((elem, idx) =>{
        return <Card key = {idx} id = {idx} picture = {elem.picture} btn = {elem.btn} color = {elem.color}/>
      })}     
    </div>
  )
}

export default RightContent