import User from "../interfaces/User"

import './HumanCard.css'
import send from '../assets/send.svg'
import Confirm from "./Confirm"
import {createRef} from "react"

type HumanCardProps = {
  user: User
}

function HumanCard(props: HumanCardProps) {
  const alertRef = createRef<HTMLDivElement>()
  return (
    <div className='card'>
      <img src={props.user.profilePicture}></img>
      <div className='text'>
        <div className='info'>
          <p className='name'>{props.user.firstName} {props.user.lastName}</p>
          <p className='bio'>{props.user.bio}</p>
          <div className='interests'>
            { props.user.interests.map(interest => { return (<p className='interest' key={interest}>{interest}</p>)})}
          </div>
        </div>
        {window.localStorage.getItem('loginState') && 
          <div>
            <img src={send} onClick={() => {alertRef.current!.className = ''}}></img>
          </div>}
      </div>
      <div className='hidden' ref={alertRef}>
        <Confirm to={props.user}></Confirm>
      </div>
    </div>
  )
}

export { HumanCard }
