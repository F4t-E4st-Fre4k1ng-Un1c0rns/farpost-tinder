import {createRef, useState} from 'react'
import send from '../assets/send.svg'
import User from '../interfaces/User'
import './Confirm.css'

enum State {
  Asking,
  Sent
}

type Props = {
  to: User
}

export default function Confirm(props: Props) {
  const [currentState, setCurrentState] = useState(State.Asking);
  const parentRef = createRef<HTMLDivElement>();
  return (
    <div ref={parentRef}>
      <div className='overlay'/>
      <div className='alert'>
        <img src={send}></img>
        <h1>{ currentState == State.Asking? 'Отправить запрос?' : 'Запрос отправлен' }</h1>
        {currentState == State.Asking ? (
          <div className='answers'>
            <button id='no' onClick={() => {
          parentRef.current!.remove()
        }}>Нет</button>
            <button id='yes' onClick={() => { setCurrentState(State.Sent) }}>Да</button>
          </div>
          ): <button id='yes' onClick={() => {
          parentRef.current!.remove()
        }}>Закрыть</button>
          }
      </div>
    </div>
  )
}
