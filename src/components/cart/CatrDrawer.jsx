import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import CartCard from './CartCard';
import { useState ,useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { updateCartQuantity ,removeFromCart , fetchCart } from '../../redux/slices/cart.slice';
const CartDrawer = ({ isOpen, toggleCart }) => {
  const navigate = useNavigate();
  const { guestId , user} = useSelector( (state) => state.auth);
  const {cart} = useSelector( (state) => state.cart);
  const userId = user ? user.id : null ;
  const dispatch = useDispatch();


  const handleCheckout = () => {
    toggleCart();
    if(!user) {
      navigate('/login?redirect=checkout');
    }else{
      navigate('/checkout'); 
    }
  };

  const handleQuantityChange = (productId, delta, size, color) => {
    const quantity = cart.products.find(p => p.productId === productId)?.quantity || 0;
    const newQuantity = quantity + delta;
    
    if (newQuantity > 0) {
      dispatch(updateCartQuantity({ 
        productId, 
        quantity : newQuantity, 
        size,
        color,
        guestId, 
        userId 
      }));
    }
  };

  const handleRemove = (  productId, size, color ) => {
    dispatch(removeFromCart({ productId, size, color, guestId, userId}));
  };



  useEffect(() => {
    if (guestId || userId) {
      dispatch(fetchCart({ guestId, userId }));
    }
  }, [guestId, userId, dispatch]);


  const subtotal = cart.products.reduce((sum, p) => sum + (p.price * p.quantity), 0);

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
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                
                  
                  <div className="text-center flex-1">
                    <h2 className="text-xl font-semibold tracking-wide">SHOPPING BAG</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {cart.products.length} {cart.products.length === 1 ? 'item' : 'items'}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleCart}
                    className="p-2 hover:text-pink-500 rounded-full transition-all duration-200 text-gray-600"
                  >
                    <FaTimes className="text-xl" />
                  </motion.button>
                  
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence>
                  <div className="space-y-4">
                    {cart.products.map((product) => (
                      <CartCard
                      key={`${product.productId}-${product.color}-${product.size}`}
                      product={product}
                      onQuantityChange={handleQuantityChange}
                      onRemove={handleRemove}
                      userId={userId}
                      guestId={guestId}
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
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
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