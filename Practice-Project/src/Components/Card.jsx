import CardContent from './CardContent.jsx'
import CardImage from './CardImage.jsx'

const Card = (props) => {

  return (
    <div className="relative h-full w-3/10 shrink-0 bg-amber-300 rounded-3xl overflow-hidden">
          <CardImage picture = {props.picture}/>
          <CardContent btn = {props.btn} color = {props.color} id = {props.id}/>
    </div>
  )
}

export default Card