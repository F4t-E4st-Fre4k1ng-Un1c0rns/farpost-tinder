import {useState} from "react"
import {useSearchParams} from "react-router-dom"

import './NewCanvas.css'

export default function NewCanvas() {
  let [params, setParams] = useSearchParams()
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")

  function send() {
    fetch(import.meta.env.VITE_API_SERVER_BASE_URL + '/api/adverts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.localStorage.getItem('access')
      },
      body: JSON.stringify({
        x_coordinates: params.get('x'),
        y_coordinates: params.get('y'),
        title: title,
        text: text
      })
    })
  }

  return (
    <div className='form'>
      <input placeholder='Заголовок' className='text' onChange={
          (e) => {
            setTitle(e.target.value)
          }
        }></input>
      <textarea className='text' placeholder='Дорогой дневник, только за вчера мне удалось вынести 5ТБ оперативной памяти из офиса Фарпоста' onChange={
          (e) => {
            setText(e.target.value)
          }
        }></textarea>
        <button onClick={() => { send() }}>Отправить</button>
    </div>
  )
}
