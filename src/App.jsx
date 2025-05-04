import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes ,Route } from 'react-router-dom'
import UserLayout from './components/layout/UserLayout'
import AdminLayout from './components/layout/AdminLayout'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'
import Colloction from './pages/Colloction'
import ProductDetails from './components/product/ProductDetails'
import CheckOut from './components/cart/CheckOut'
import OrderCompleted from './pages/OrderCompleted'
import OrderDetail from './pages/OrderDetail'

function App() {
  return (
    <Routes>
      {/* UserLayouts */}
      <Route path='/' element={<UserLayout/>}>
      <Route index element={<Home/>} />
      <Route path='login' element={<Login/>} />
      <Route path='register' element={<Register/>} />
      <Route path='profile' element={<Profile/>} />
      {/* <Route path='*' element={<NotFound/>} /> */}
      <Route path='product/:id' element={<ProductDetails/>} />
      <Route path='collections/:collection' element={<Colloction/>} />
      <Route path='checkout' element={<CheckOut/>} />
      <Route path='order-confirmation' element={<OrderCompleted/>} />
      <Route path='order/:id' element={<OrderDetail/>} />
      </Route>
      
      {/* AdminLayouts */}
      <Route path='/admin' element={<AdminLayout/>} >
      </Route>
    </Routes>
  )
}

export default App
