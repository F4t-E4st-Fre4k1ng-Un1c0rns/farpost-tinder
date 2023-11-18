import { useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'


export default function Layout() {
  return (
    <div>
      { window.localStorage.getItem('loginState') ? 
        <p>Welcome</p> 
      :
        <p>Not logged in <Link to='login'>Please login</Link></p>
      }
      <Outlet />
    </div>
  )
}
