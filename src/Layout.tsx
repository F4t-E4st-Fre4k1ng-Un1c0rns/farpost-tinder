import { Outlet, Link } from 'react-router-dom'

import farpost from './assets/farpost.svg'
import incoming from './assets/incoming.svg'
import people from './assets/people.svg'
import whiteboard from './assets/whiteboard.svg'


export default function Layout() {
  return (
    <div id="app">
      <header>
        <div id='icons'>
          <Link to='/'><img src={farpost} /></Link>
          <Link to='/people/'><img src={people} /></Link>
          <Link to='/incoming/'><img src={incoming} /></Link>
          <Link to='/canvas/'><img src={whiteboard} /></Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
