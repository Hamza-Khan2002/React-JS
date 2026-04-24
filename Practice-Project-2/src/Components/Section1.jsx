import Details from "./Details"

const Section1 = (props) => {
  return (
    <div 
    className='lg:w-1/2 lg:bg-linear-to-r bg-linear-to-t from-gray-700 to-gray-900 px-6 py-11'>

        <h1 className="text-3xl font-extrabold text-gray-300 font-mono underline text-center tracking-wide">Notes Details:</h1>

        <Details val1 = {props.val1} val2 = {props.val2} vals = {props.vals} setVal1 = {props.setVal1} setVal2 = {props.setVal2} setVals = {props.setVals} />
    </div>
  )
}

export default Section1