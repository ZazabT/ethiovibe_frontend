import { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetail } from '../redux/slices/order.slice';

const OrderCompleted = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.order);
  const navigate = useNavigate();

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderDetail(orderId));
    }
  }, [dispatch, orderId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <FaCheckCircle className="mx-auto h-16 w-16 text-green-500" />
        </motion.div>

        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-3xl font-bold text-gray-900"
          >
            Order Completed!
          </motion.h2>
          {order?._id && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-2 text-sm text-gray-600"
            >
              Thank you for your purchase. Your order #{order._id.slice(-6)} has been received.
            </motion.p>
          )}

        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 pt-6"
        >
          <h3 className="text-lg font-medium text-gray-900">Order Details</h3>
          <dl className="mt-4 divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex justify-between p-4 hover:bg-gray-50 transition-colors">
              <dt className="text-sm font-medium text-gray-500">Order number</dt>
              <dd className="text-sm font-medium text-gray-900">
                #{order?._id?.slice(-6) || '------'}
              </dd>
            </div>
            <div className="flex justify-between p-4 hover:bg-gray-50 transition-colors">
              <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
              <dd className="text-sm font-medium text-gray-900">Br {order.totalPrice?.toLocaleString()}</dd>
            </div>
            <div className="flex justify-between p-4 hover:bg-gray-50 transition-colors">
              <dt className="text-sm font-medium text-gray-500">Shipping address</dt>
              <dd className="text-sm font-medium text-gray-900 text-right">
                {`${order.streetAddress}, ${order.city}`}<br />
                {`${order.country}`}
              </dd>
            </div>
            <div className="flex justify-between p-4 hover:bg-gray-50 transition-colors">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="text-sm font-medium text-green-600">{order.deliveryStatus}</dd>
            </div>

          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 space-y-4"
        >
          <Link
            to={`/order/${order._id}`}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-pink-500 hover:bg-pink-600 transition-colors duration-200"
          >
            Track Order
          </Link>
          <Link
            to="/"
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            Continue Shopping
          </Link>
        </motion.div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Need help? Contact our support team at</p>
          <a href="mailto:support@ethiovibe.com" className="font-medium text-pink-500 hover:text-pink-600">
            support@ethiovibe.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderCompleted;