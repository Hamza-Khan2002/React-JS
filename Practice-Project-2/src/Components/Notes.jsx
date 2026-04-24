const Notes = (props) => {
  
  
  
  return (
    <div 
    className="">    
      <div style={{backgroundImage: `url(${props.Img})`}}
      className="h-50 w-40 bg-transparent rounded-2xl bg-cover bg-center overflow-hidden flex flex-col justify-between px-2">
          <div>
            <h3 
            className="pt-6 pb-2 text-center font-semibold underline">{props.Heading}</h3>

            <p 
            className="text-xs px-2">{props.Desc}</p>
          </div>

          <button onClick={() => props.Delete(props.id)}
          className="text-l font-semibold text-gray-300 px-4 py-1 bg-red-500 rounded mb-2 cursor-pointer active:scale-95">Delete</button>
      </div>
    </div>        
  )
}

export default Notes