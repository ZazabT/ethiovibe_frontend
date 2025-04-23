import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes ,Route } from 'react-router-dom'
import UserLayout from './components/layout/UserLayout'
import AdminLayout from './components/layout/AdminLayout'
import Home from './pages/Home'
function App() {
  return (
    <Routes>
      {/* UserLayouts */}
      <Route path='/' element={<UserLayout/>}>
      <Route index element={<Home/>} />
      </Route>
      
      {/* AdminLayouts */}
      <Route path='/admin' element={<AdminLayout/>} >
      </Route>
    </Routes>
  )
}

export default App
