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
      className="flex items-start gap-4 p-4 border-b hover:bg-gray-200  border-gray-200 last:border-none"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-20 h-20 object-cover rounded-lg shadow-sm"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900 text-sm truncate pr-4">
              {product.name}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
              <span>{product.size}</span>
              <span>•</span>
              <span>{product.color}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium text-gray-900 text-sm">
              ${(product.price * product.quantity).toFixed(2)}
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => onQuantityChange(product.id, product.quantity - 1)}
              className="px-2 py-1 hover:bg-gray-50 transition-colors"
              disabled={product.quantity <= 1}
            >
              <FaMinus className="text-xs text-gray-500" />
            </motion.button>
            <span className="w-8 text-center text-sm">
              {product.quantity}
            </span>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => onQuantityChange(product.id, product.quantity + 1)}
              className="px-2 py-1 hover:bg-gray-50 transition-colors"
            >
              <FaPlus className="text-xs text-gray-500" />
            </motion.button>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onRemove(product.id)}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1.5"
          >
            <FaTrash size={10} />
            <span>Remove</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartCard;