import React, { useEffect } from 'react';
import { useParams , Link} from 'react-router-dom';
import { FaBox, FaTruck, FaMapMarkerAlt, FaCreditCard, FaCalendarAlt ,FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetail } from '../redux/slices/order.slice';
import { ImSpinner2 } from "react-icons/im";

const OrderDetail = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { order, isLoading, isError } = useSelector((state) => state.order); // Changed from orderDetail to order

  useEffect(() => {
    console.log('OrderId:', orderId); // Debug log
    if (orderId) {
      dispatch(getOrderDetail(orderId));
    }
  }, [dispatch, orderId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ImSpinner2 className="animate-spin text-pink-500 text-4xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-8">
        {isError}
      </div>
    );
  }

  if (!order || !order._id) {
    return (
      <div className="text-center py-8">
        Order not found
      </div>
    );
  }

  const getStatusStep = (status) => {
    const steps = {
      'PENDING': 1,
      'PROCESSING': 2,
      'SHIPPED': 3,
      'OUT_FOR_DELIVERY': 4,
      'DELIVERED': 5
    };
    return steps[status] || 1;
  };

  const currentStep = getStatusStep(order.deliveryStatus);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 bg-gray-50">
      {/* Simple Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm mb-4">
          <Link to="/profile" className="text-gray-500 hover:text-pink-500">Orders</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">#{order._id.slice(-6)}</span>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Order Details</h1>
          <div className={`px-4 py-2 rounded-lg ${
            order.deliveryStatus === 'DELIVERED' ? 'bg-green-100 text-green-800' : 
            'bg-blue-100 text-blue-800'
          }`}>
            {order.deliveryStatus}
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Order Summary Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Order Date</p>
              <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Total Amount</p>
              <p className="font-medium">Br {order.totalPrice.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Payment Status</p>
              <p className={`font-medium ${order.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                {order.paymentStatus}
              </p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Payment Method</p>
              <p className="font-medium capitalize">{order.paymentMethod}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="font-semibold">Order Items</h2>
          </div>
          <div className="divide-y">
            {order.orderItems?.map((item, index) => (
              <div key={index} className="p-6 flex items-center gap-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                  <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                    <span>Size: {item.size}</span>
                    <span>Qty: {item.quantity}</span>
                    <span className="font-medium text-gray-900">Br {item.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 bg-gray-50">
            <div className="flex justify-between items-center text-lg font-medium">
              <span>Total</span>
              <span>Br {order.totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Shipping and Payment Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="font-semibold mb-4">Shipping Information</h2>
            <div className="space-y-2 text-sm">
              <p className="font-medium">{order.user?.name}</p>
              <p className="text-gray-600">{order.streetAddress}</p>
              <p className="text-gray-600">{order.city}, {order.country}</p>
              <p className="text-gray-600">{order.postalCode}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="font-semibold mb-4">Payment Information</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Method</span>
                <span className="font-medium capitalize">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-medium">{order.paymentDetail?.id?.slice(-8) || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm text-center">
          <p className="text-gray-600 mb-4">Need help with your order?</p>
          <button className="inline-flex items-center px-6 py-2 border border-pink-500 text-pink-500 rounded-lg hover:bg-pink-50 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
