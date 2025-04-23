import React from 'react'
import { useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm);
    }

    return (
        <div className="relative flex items-center">
            <AnimatePresence>
                {isOpen ? (
                    <motion.form
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "300px", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center absolute right-0"
                        onSubmit={handleSearch}
                    >
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:border-pink-500"
                            placeholder="Search products..."
                            autoFocus
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setIsOpen(false);
                                setSearchTerm('');
                            }}
                            className="absolute right-3 text-gray-400 hover:text-pink-500"
                        >
                            <FaTimes />
                        </button>
                    </motion.form>
                ) : (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="hover:text-pink-500 transition-colors"
                    >
                        <FaSearch className="text-xl" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    )
}

export default SearchBar