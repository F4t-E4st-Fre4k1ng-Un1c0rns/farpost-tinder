import { Routes, Route } from 'react-router-dom';

import Layout from './Layout.tsx';
import Login from './pages/Login.tsx';
import Canvas from './pages/Canvas.tsx';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/login/' element={<Login />}/>
          <Route path='/canvas/' element={<Canvas />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
