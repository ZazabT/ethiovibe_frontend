import React from 'react'
import Hero from '../components/layout/Hero'
import Categories from '../components/product/Categories'
import NewArrives from '../components/product/NewArrives'
import ProductDetails from '../components/product/ProductDetails'
const Home = () => {
  return (
    <div>
        {/* Hero */}
        <Hero/>

        {/* Categories */}
        <Categories/>

        {/* New Arrived */}
        <NewArrives/>

        {/* Best Seller */}
        <div className=''>
          {/* Best seller header */}
          <div className="text-center mb-12">
                <h2 className="md:text-4xl text-xl yuji-font font-semibold mb-4">Best Seller</h2>
                <div className="flex items-center justify-center gap-4">
                    <span className="w-10 h-[2px] bg-pink-500"/>
                    <p className=" md:text-xl text-sm text-gray-600">Discover Our Best Selling Product</p>
                    <span className="w-10 h-[2px] bg-pink-500"/>
                </div>
          </div>
           <ProductDetails/>
        </div>
        
    </div>
  )
}

export default Home