import React from 'react'
import Hero from '../components/layout/Hero'
import Categories from '../components/product/Categories'
import NewArrives from '../components/product/NewArrives'
const Home = () => {
  return (
    <div>
        {/* Hero */}
        <Hero/>

        {/* Categories */}
        <Categories/>

        {/* New Arrived */}
        <NewArrives/>
        
    </div>
  )
}

export default Home