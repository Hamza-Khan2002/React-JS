
const Details = (props) => {

  const Title = (e) => {props.setVal1(e.target.value)};
  const Description = (e) => {props.setVal2(e.target.value)};
  const sbtm = (e) => {e.preventDefault()}  
  
  return (

    <form 
    onSubmit={(e) =>{
      sbtm(e)
      props.setVals(prev => [...prev, {Heading: props.val1, Desc: props.val2, Img:'https://static.vecteezy.com/system/resources/thumbnails/010/793/873/small/a-lined-note-paper-covered-with-transparent-tape-on-a-yellow-background-with-a-white-checkered-pattern-free-png.png'}])
      props.setVal1('')
      props.setVal2('')
    }}
    className="py-20 lg:px-20 px-10 flex flex-col items-center gap-6">
    
        <input type="text" placeholder="Title" 
        onChange={Title}
        value={props.val1}
        className="px-6 py-3 text-2xl w-full bg-gray-400 rounded-2xl border-2 border-gray-600 outline-none font-semibold"/>
        
        <textarea placeholder="Details" maxLength={100} onChange={Description} value={props.val2}
        className="px-6 py-3 resize-none h-40 w-full bg-gray-400 rounded-2xl border-2 border-gray-600 outline-none"></textarea>
        
        <input type="submit" value="Submit" 
        className="py-3 w-full text-gray-700 font-semibold bg-linear-to-r from-gray-300 to-gray-400 rounded-full cursor-pointer active:scale-95"/>
    </form>
  )
}

export default Details