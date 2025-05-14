import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
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
import LearnMore from './pages/LearnMore'
import ProtectRoute from './components/admin/ProtectRoute'
import Dashboard from './pages/admin/Dashboard'
import Products from './pages/admin/Products'
import Users from './pages/admin/Users'
import Orders from './pages/admin/Orders'
import Subscribers from './pages/admin/Subscribers'
function App() {
  return (
    <Routes>
      {/* UserLayouts */}
      <Route path='/' element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='profile' element={<Profile />} />
        <Route path='*' element={<NotFound />} />
        <Route path='product/:id' element={<ProductDetails />} />
        <Route path='collections/:collection' element={<Colloction />} />
        <Route path='checkout' element={<CheckOut />} />
        <Route path="/order-completed/:orderId" element={<OrderCompleted />} />
        <Route path='order/:orderId' element={<OrderDetail />} />
        <Route path='/learn-more' element={<LearnMore />} />
      </Route>

      {/* AdminLayouts */}
      <Route path='/admin' element={
        <ProtectRoute role='admin'>
          <AdminLayout />
        </ProtectRoute>
      } >
        <Route index element={<Dashboard />} />
        <Route path='products' element={<Products />} />
        <Route path='users' element={<Users />} />
        <Route path='orders' element={<Orders />} />
        <Route path='subscribers' element={<Subscribers />} />
      </Route>

    </Routes>
  )
}

export default App
