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
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-white shadow-xl z-50"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                <div>
                  <h2 className="text-xl font-semibold">Shopping Cart</h2>
                  <p className="text-sm text-gray-500 mt-1">{products.length} items</p>
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
              <div className="border-t p-6 bg-gray-50">
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-pink-500 text-white py-4 rounded-xl font-medium hover:bg-pink-600 transition-colors"
                >
                  Checkout
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;