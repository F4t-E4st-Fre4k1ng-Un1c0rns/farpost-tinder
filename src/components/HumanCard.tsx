import User from "../interfaces/User"

import './HumanCard.css'
import send from '../assets/send.svg'

type HumanCardProps = {
  user: User
}

function HumanCard(props: HumanCardProps) {
  return (
    <div className='card'>
      <img src={props.user.profilePicture}></img>
      <div className='text'>
        <div className='info'>
          <p className='name'>{props.user.firstName} {props.user.lastName}</p>
          <p>{props.user.bio}</p>
        </div>
        {window.localStorage.getItem('loginState') && 
          <div>
            <img src={send}></img>
          </div>}
      </div>
    </div>
  )
}

export { HumanCard }
