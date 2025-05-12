import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBox, FaShippingFast, FaCheck, FaClock, FaTruck, FaTimes, FaBan, FaUndo, FaMoneyBill } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetail , getUserOrders } from '../redux/slices/order.slice'
import { ImSpinner2 } from "react-icons/im";
const MyOrders = () => {
  const { orders, isLoading, isError } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'DELIVERED':
        return 'text-green-500 bg-green-50';
      case 'PROCESSING':
        return 'text-blue-500 bg-blue-50';
      case 'SHIPPED':
        return 'text-indigo-500 bg-indigo-50';
      case 'OUT_FOR_DELIVERY':
        return 'text-purple-500 bg-purple-50';
      case 'PENDING':
        return 'text-yellow-500 bg-yellow-50';
      case 'FAILED_DELIVERY':
        return 'text-red-500 bg-red-50';
      case 'CANCELLED':
        return 'text-gray-500 bg-gray-50';
      case 'RETURNED':
        return 'text-orange-500 bg-orange-50';
      case 'REFUNDED':
        return 'text-teal-500 bg-teal-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toUpperCase()) {
      case 'DELIVERED':
        return <FaCheck className="mr-2" />;
      case 'PROCESSING':
        return <FaShippingFast className="mr-2" />;
      case 'SHIPPED':
        return <FaTruck className="mr-2" />;
      case 'OUT_FOR_DELIVERY':
        return <FaShippingFast className="mr-2" />;
      case 'PENDING':
        return <FaClock className="mr-2" />;
      case 'FAILED_DELIVERY':
        return <FaTimes className="mr-2" />;
      case 'CANCELLED':
        return <FaBan className="mr-2" />;
      case 'RETURNED':
        return <FaUndo className="mr-2" />;
      case 'REFUNDED':
        return <FaMoneyBill className="mr-2" />;
      default:
        return <FaBox className="mr-2" />;
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
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

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-8">
        <FaBox className="mx-auto text-4xl text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No Orders Yet</h3>
        <p className="text-gray-500 mt-2">Start shopping to see your orders here</p>
        <Link to="/shop" className="mt-4 inline-block bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }


  return (
    <div className="">
      {/* <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="text-gray-500 mt-2">Track and manage your orders</p>
      </div> */}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Items</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/orders/my-order/${order._id}`} className="group">
                      <span className="text-sm font-medium text-gray-900 group-hover:text-pink-500">
                        #{order._id.slice(-6)}
                      </span>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-3">
                      {order.orderItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 rounded-lg object-cover border border-gray-100"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                              <span className="text-sm text-gray-500">×</span>
                              <span className="text-sm text-gray-700">Br {item.price}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{formatDate(order.createdAt)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getStatusColor(order.deliveryStatus)}`}>
                      {getStatusIcon(order.deliveryStatus)}
                      {order.deliveryStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">Br {order.totalPrice.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      to={`/orders/${order._id}`}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-pink-600 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default MyOrders

