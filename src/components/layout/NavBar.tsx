import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaSearch, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../common/SearchBar';
import { GiHamburgerMenu } from "react-icons/gi";
import CatrDrawer from '../cart/CatrDrawer';
import { useDispatch , useSelector} from 'react-redux';
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const navLinks = [
    { to: '/collections/all?gender=male', label: 'Men' },
    { to: '/collections/all?gender=female', label: 'Women' },
    { to: '/collections/all?category=children', label: 'Children' },
    { to: '/collections/all?category=topwear', label: 'Topwear' },
    { to: '/collections/all?category=underwear', label: 'Underwear' },
    { to: '/collections/all?category=other', label: 'Others' },
  ];

  const { cart } = useSelector( (state) => state.cart);
  return (
    <>
      <nav className='container mx-auto my-2 flex py-4 px-10 justify-between'>
        {/* Logo */}
        <div className='w-1/3'>
          <Link to='/' className='text-lg md:text-3xl font-semibold yuji-font'>
            <motion.span
              whileHover={{ letterSpacing: '0.2em', color: '#EC4899' }}
              transition={{ duration: 0.3 }}
              className='inline-block'
            >
              Ethio vibe
            </motion.span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:flex w-2/3 justify-between items-center'>
          <div className='flex space-x-8'>
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className='hover:text-pink-500 transition-colors exo-font'
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className='flex items-center space-x-6'>
            <SearchBar />
            <button onClick={toggleCart} className='relative hover:text-pink-500 transition-colors'>
              <FaShoppingCart className='text-xl' />
              <span className='absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>{cart.products.length}</span>
            </button>
            <Link to='/profile' className='hover:text-pink-500 transition-colors'>
              <FaUser className='text-xl' />
            </Link>
          </div>
        </div>

        {/* Mobile Icons */}
        <div className='md:hidden flex items-center gap-4'>
          <button onClick={toggleCart} className='relative hover:text-pink-500 transition-colors'>
            <FaShoppingCart className='text-xl'  />
            <span className='absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>{cart.products.length}</span>
          </button>
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
            className='z-50'
          >
            {isMenuOpen ? (
              <FaTimes className='text-2xl' />
            ) : (
              <motion.div whileHover={{ scale: 1.1, color: '#EC4899' }} className='text-2xl'>
                <GiHamburgerMenu />
              </motion.div>
            )}
          </motion.button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden'
                onClick={() => setIsMenuOpen(false)}
              />
              <motion.aside
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className='fixed right-0 top-0 h-screen w-4/5 max-w-sm bg-white shadow-lg z-50 md:hidden'
                role='dialog'
                aria-modal='true'
              >
                <div className='flex flex-col h-full divide-y divide-gray-100'>
                  {/* Header */}
                  <div className='flex items-center justify-between p-5 bg-gray-100'>
                    <h2 className='text-xl font-bold text-pink-500 yuji-font'>Ethio Vibe</h2>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsMenuOpen(false)}
                      className='p-2 rounded-full hover:bg-gray-200 transition'
                      aria-label='Close menu'
                    >
                      <FaTimes className='text-xl text-gray-700' />
                    </motion.button>
                  </div>

                  {/* Nav Links */}
                  <nav className='flex-1 overflow-y-auto p-6'>
                    <ul className='space-y-4'>
                      {navLinks.map(link => (
                        <motion.li key={link.to} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Link
                            to={link.to}
                            onClick={() => setIsMenuOpen(false)}
                            className='block px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-all'
                          >
                            {link.label}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </nav>
      <CatrDrawer isOpen={isCartOpen} toggleCart={toggleCart} />
    </>
  );
};

export default NavBar;