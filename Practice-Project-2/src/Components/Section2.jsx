import Notes from "./Notes"

const Section2 = (props) => {

  const Clear = (idx)=>{
    const newVal = [...props.array]
    newVal.splice(idx, 1)
    props.setVals(newVal) 
  }

  return (
    <div className='lg:w-1/2 lg:border-l-3 border-t-3 border-gray-500 lg:bg-linear-to-l bg-linear-to-b from-gray-700 to-gray-900 px-6 py-11'>
        
      <h1 
      className="text-3xl font-extrabold text-gray-300 font-mono underline text-center tracking-wide">Notes:</h1>
        
      <div 
      className="mt-8 flex gap-10 flex-wrap">
        {props.array.map((elem, idx) =>{
          return <Notes key = {idx} id = {idx} Heading = {elem.Heading} Desc = {elem.Desc} Img = {elem.Img} Delete = {Clear}/>
        })}
      </div>
    </div>
  )
}

export default Section2