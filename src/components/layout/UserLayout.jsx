import React from 'react'
import Header from '../common/Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'


const UserLayout = () => {
  return (
    <div>
        {/* Header */}
        <Header/>

        {/* MainContent */}
        <main>
          <Outlet/>
        </main>
        
        {/* Footer */}
        <Footer/>
    </div>
  )
}

export default UserLayout