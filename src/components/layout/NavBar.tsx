import React from 'react'
import { Link } from 'react-router-dom'
import { FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa'
import { motion } from'framer-motion'
import SearchBar from '../common/SearchBar'
const NavBar = () => {
  return (
    <>
    <nav className='container mx-auto my-2 flex py-4 px-10'>
        {/* Logo - 50% width */}
        <div className='w-1/3'>
            <Link to='/' className='text-lg md:text-3xl font-semibold yuji-font'>
                <motion.span
                    whileHover={{ 
                        letterSpacing: "0.2em",
                        color: "#EC4899",
                        transition: { duration: 0.3 }
                    }}
                    className="inline-block"
                >
                    Ethio vibe
                </motion.span>
            </Link>
        </div>

        {/* NavLinks and Icons - 50% width */}
        <div className='hidden md:w-2/3 md:flex justify-between items-center'>
            <div className='hidden md:flex space-x-8'>
                <Link to='/men' className='hover:text-pink-500 transition-colors exo-font'>Men</Link>
                <Link to='/women' className='hover:text-pink-500 transition-colors exo-font'>Women</Link>
                <Link to='/children' className='hover:text-pink-500 transition-colors exo-font'>Children</Link>
                <Link to='/footwear' className='hover:text-pink-500 transition-colors exo-font'>Footwear</Link>
                <Link to='/other' className='hover:text-pink-500 transition-colors exo-font'>Others</Link>
            </div>

            <div className='flex items-center space-x-8 py-2'>
                <SearchBar/>
                <Link to='/cart' className='hover:text-pink-500 transition-colors'>
                    <div className='relative'>
                        <FaShoppingCart className='text-xl' />
                        <span className='absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>
                            0
                        </span>
                    </div>
                </Link>
                <Link to='/profile' className='hover:text-pink-500 transition-colors'>
                    <FaUser className='text-xl' />
                </Link>
            </div>
        </div>
    </nav>
    </>
  )
}

export default NavBar