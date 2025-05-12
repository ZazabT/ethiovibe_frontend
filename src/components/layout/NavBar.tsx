import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaSearch, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../common/SearchBar';
import { GiHamburgerMenu } from "react-icons/gi";
import CatrDrawer from '../cart/CatrDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { FaCog, FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../../redux/slices/auth.slice'
import { clearCart } from '../../redux/slices/cart.slice'
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

  const { cart } = useSelector((state) => state.cart);
  const { user, guestId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // handle Loging out 
    dispatch(logout());
    // handle cleaning cart
    dispatch(clearCart());
  };

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

            {user ? (
              <div className="relative group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 px-3 py-2 cursor-pointer rounded-lg bg-gray-50/50 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:shadow-lg"
                >
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white font-semibold shadow-md ring-2 ring-pink-200"
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </motion.div>
                  <div className="hidden md:flex flex-col leading-tight">
                    <motion.span
                      className="text-sm font-medium text-gray-900"
                      whileHover={{ color: '#EC4899' }}
                    >
                      {user.name}
                    </motion.span>
                    <span className="text-xs text-gray-500 truncate max-w-[150px]">
                      {user.email}
                    </span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-1 w-56 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl py-2 hidden group-hover:block z-50 border border-gray-100"
                >
                  <Link to="/profile" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-500 transition-colors">
                    <FaUser className="mr-3 text-xs" />
                    My Profile
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-500 transition-colors">
                      <FaCog className="mr-3 text-xs" />
                      Admin Dashboard
                    </Link>
                  )}
                  <div className="h-[1px] bg-gray-100 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FaSignOutAlt className="mr-3 text-xs" />
                    Logout
                  </button>
                </motion.div>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="px-4 py-2 bg-white justify-center text-pink-500 font-medium rounded-full border-2 border-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-600 flex items-center space-x-2 shadow-md hover:shadow-pink-200"
                >
                  <FaUser className="text-sm" />
                  <span>Login</span>
                </Link>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile Icons */}
        <div className='md:hidden flex items-center gap-4'>
          <button onClick={toggleCart} className='relative hover:text-pink-500 transition-colors'>
            <FaShoppingCart className='text-xl' />
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

                  {/* Mobile User Section */}
                  <div className="p-6 bg-gray-50">
                    {user ? (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white text-xl font-semibold">
                            {user.name?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Link
                            to="/profile"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-pink-50 rounded-lg transition-colors"
                          >
                            <FaUser className="mr-3" />
                            My Profile
                          </Link>

                          {user.role === 'admin' && (
                            <Link
                              to="/admin"
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-pink-50 rounded-lg transition-colors"
                            >
                              <FaCog className="mr-3" />
                              Admin Dashboard
                            </Link>
                          )}

                          <button
                            onClick={() => {
                              handleLogout();
                              setIsMenuOpen(false);
                            }}
                            className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <FaSignOutAlt className="mr-3" />
                            Logout
                          </button>
                        </div>
                      </div>
                    ) : (
                      <Link
                        to="/login"
                        className="px-4 py-2 bg-white justify-center text-pink-500 font-medium rounded-full border-2 border-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-600 flex items-center space-x-2 shadow-md hover:shadow-pink-200"
                      >
                        <FaUser className="text-sm" />
                        <span>Login</span>
                      </Link>
                    )}
                  </div>
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