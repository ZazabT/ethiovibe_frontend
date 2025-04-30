import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import CartCard from './CartCard';

const CartDrawer = ({ isOpen, toggleCart }) => {
  // Demo products (move this to a separate file or state management in a real app)
  const [products, setProducts] = React.useState([
    {
      id: 1,
      name: "Traditional Habesha Kemis",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1",
      quantity: 1,
      size: "M",
      color: "White"
    },
    {
      id: 2,
      name: "Ethiopian Coffee Dress",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95",
      quantity: 2,
      size: "L",
      color: "Gold"
    }
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setProducts(products.map(p => 
      p.id === id ? { ...p, quantity: newQuantity } : p
    ));
  };

  const handleRemove = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const subtotal = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={toggleCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-gray-100 shadow-xl z-50"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 flex flex-row-reverse max-w-[75%] justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">YOUR BAG</h2>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleCart}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaTimes className="text-xl" />
                </motion.button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence>
                  <div className="space-y-4">
                    {products.map((product) => (
                      <CartCard
                        key={product.id}
                        product={product}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemove}
                      />
                    ))}
                  </div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-300 p-6">
                <div className="mb-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                    <span className="font-normal">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span className="font-normal">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-pink-500 text-white py-3.5 text-sm font-medium tracking-wide hover:bg-pink-600 transition-all rounded-sm uppercase"
                >
                  Proceed to Checkout
                </motion.button>
                <p className="text-xs text-center text-gray-500 mt-4">
                  Shipping & taxes calculated at checkout
                </p>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;