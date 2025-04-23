import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import men from '../../assets/men.jpg'
import women from '../../assets/women1.jpg'

const Categories = () => {
  return (
    <div className='lg:mx-20 mx-3 my-10 lg:px-0'>
      <div className='container mx-auto flex flex-col md:flex-row gap-8'>
         {/* Men Category */}
         <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className='relative flex-1 group overflow-hidden'
         >
          <img 
            src={men} 
            alt="Men Category"  
            className='object-cover w-full h-[700px] transition-transform duration-700 group-hover:scale-110'
          />
          <div className='absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300'>
            <div className='absolute bottom-10 left-10 text-white'>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{duration:0.6}}
                className='flex items-center gap-4'
              >
                <span className='w-10 h-[2px] bg-white'/>
                <p className='dancing-font text-2xl'>Collection</p>
              </motion.div>
              <h2 className='text-5xl yuji-font mt-4'>Men's</h2>
              <Link to="/men">
                <motion.button
                  whileHover={{ scale: 1.05, x: 10 }}
                  className='mt-6 text-sm border-b-2 pb-1 exo-font'
                >
                  SHOP NOW
                </motion.button>
              </Link>
            </div>
          </div>
         </motion.div>

         {/* Women Category */}
         <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className='relative flex-1 group overflow-hidden'
         >
          <img 
            src={women} 
            alt="Women Category"  
            className='object-cover w-full h-[700px] transition-transform duration-700 group-hover:scale-110'
          />
          <div className='absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300'>
            <div className='absolute bottom-10 left-10 text-white'>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{duration:0.6}}
                className='flex items-center gap-4'
              >
                <span className='w-10 h-[2px] bg-white'/>
                <p className='dancing-font text-2xl'>Collection</p>
              </motion.div>
              <h2 className='text-5xl yuji-font mt-4'>Women's</h2>
              <Link to="/women">
                <motion.button
                  whileHover={{ scale: 1.05, x: 10 }}
                  className='mt-6 text-sm border-b-2 pb-1 exo-font'
                >
                  SHOP NOW
                </motion.button>
              </Link>
            </div>
          </div>
         </motion.div>
      </div>
    </div>
  )
}

export default Categories
