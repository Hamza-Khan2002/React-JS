import './Card.css'
import {Bookmark} from 'lucide-react'



const Card = (props) => {
  return (

        <div className='card'>
            <div>
              <div className="top">
                <img src={props.images} alt="" />
                <button className='btn1'>Save <Bookmark size={17}/></button>
            </div>

            <div className="center">
              <h3>{props.name} <span>{props.days} days ago</span></h3>
              <h2>{props.occup}</h2>
              <div>
                <h4>{props.tag1}</h4>
                <h4>{props.tag2}</h4>
              </div>
            </div>


            </div>

            <div className="bottom">
              <div>
                <h3>${props.price}/hr</h3>
                <p>{props.city}, {props.country}</p>
              </div>
              <button className='btn2'>Apply Now</button>
            </div>
        </div>
  )
}

export default Card