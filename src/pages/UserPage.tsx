import {createRef, useState} from 'react'
import {useParams} from 'react-router-dom'
import User from '../interfaces/User'
import {HumanCard} from '../components/HumanCard'

export default function UserPage() {
  const [user, setUser] = useState<User>()
  let { id } = useParams()

  if (user == undefined) {

  fetch(import.meta.env.VITE_API_SERVER_BASE_URL + '/api/profiles/' + id).then(e => {
      e.json().then(human => {
        setUser({
                username: human.username,
                profilePicture: human.profile_picture,
                firstName: human.first_name,
                lastName: human.last_name,
                city: human.city,
                bio: human.bio,
                interests: human.interests
              })
      })
    })
  }
  if (user == undefined) {
    return (<h1>Загрузка</h1>)
  }

  return (
    <HumanCard user={user}></HumanCard>
      )
}
