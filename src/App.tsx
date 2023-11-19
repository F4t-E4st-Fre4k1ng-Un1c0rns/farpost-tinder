import { Routes, Route } from 'react-router-dom';

import Layout from './Layout.tsx';
import Login from './pages/Login.tsx';
import Canvas from './pages/Canvas.tsx';
import NewCanvas from './pages/NewCanvas.tsx';
import People from './pages/People.tsx';
import UserPage from './pages/UserPage.tsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/login/' element={<Login />}/>
          <Route path='/people/' element={<People />}/>
          <Route path='/canvas/' element={<Canvas />}/>
          <Route path='/canvas/new' element={<NewCanvas />}/>
          <Route path='/user/:id' element={<UserPage />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
