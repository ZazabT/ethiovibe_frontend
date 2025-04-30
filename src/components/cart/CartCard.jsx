import React from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const CartCard = ({ product, onQuantityChange, onRemove }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex gap-4 p-4 bg-white rounded-xl border hover:border-pink-200 transition-all hover:shadow-md"
    >
      <div className="relative group">
        <img
          src={product.image}
          alt={product.name}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
          <button 
            onClick={() => onRemove(product.id)}
            className="text-white p-2 hover:text-red-400 transition-colors"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-medium text-gray-800 line-clamp-1">{product.name}</h3>
          <div className="mt-1 text-sm text-gray-500 space-x-2">
            <span className="inline-block px-2 py-1 bg-gray-100 rounded-full">
              Size: {product.size}
            </span>
            <span className="inline-block px-2 py-1 bg-gray-100 rounded-full">
              Color: {product.color}
            </span>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => onQuantityChange(product.id, product.quantity - 1)}
              className="p-1.5 hover:bg-white rounded-md transition-colors"
              disabled={product.quantity <= 1}
            >
              <FaMinus className="text-xs" />
            </motion.button>
            <span className="text-sm font-medium w-8 text-center">
              {product.quantity}
            </span>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => onQuantityChange(product.id, product.quantity + 1)}
              className="p-1.5 hover:bg-white rounded-md transition-colors"
            >
              <FaPlus className="text-xs" />
            </motion.button>
          </div>
          
          <div className="text-right">
            <p className="font-medium text-gray-800">
              ${(product.price * product.quantity).toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">
              ${product.price.toFixed(2)} each
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartCard;