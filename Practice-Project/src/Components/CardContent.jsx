import Description from './Description.jsx'

const CardContent = (props) => {
  return (
    <div className="h-full w-full absolute top-0 left-0 bg-transparent p-6 flex flex-col justify-between">
          <h2 className="text-2xl font-semibold bg-white h-10 w-10 rounded-full text-center text-[1.7em]" >{props.id+1}</h2>

        <Description btn = {props.btn} color = {props.color}/>
    </div>
  )
}

export default CardContent