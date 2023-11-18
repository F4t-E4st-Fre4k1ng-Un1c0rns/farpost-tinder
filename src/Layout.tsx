import { useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'

import { loginContext } from './contexts/loginContext'

export default function Layout() {
  const loginState = useContext(loginContext)
  console.log(import.meta.env.VITE_API_SERVER_BASE_URL)
  return (
    <div>
      { loginState.loggedIn ? 
        <p>Welcome</p> 
      :
        <p>Not logged in <Link to='login'>Please login</Link></p>
      }
      <Outlet />
    </div>
  )
}
