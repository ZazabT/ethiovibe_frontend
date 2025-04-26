import React from 'react';
import { FaBox, FaTruck, FaMapMarkerAlt, FaCreditCard, FaCalendarAlt } from 'react-icons/fa';

const OrderDetail = () => {
  // Demo data
  const orderData = {
    orderId: "ETH-2023-001",
    orderDate: "November 15, 2023",
    estimatedArrival: "November 20, 2023",
    daysToArrive: 3,
    status: "In Transit",
    paymentMethod: "Credit Card",
    shippingAddress: {
      name: "John Doe",
      street: "Bole Road",
      city: "Addis Ababa",
      country: "Ethiopia",
      phone: "+251 912345678"
    },
    items: [
      {
        id: 1,
        name: "Traditional Habesha Kemis",
        price: 199.99,
        quantity: 1,
        image: "/women2.jpg",
        color: "White",
        size: "M"
      },
      {
        id: 2,
        name: "Ethiopian Silver Necklace",
        price: 89.99,
        quantity: 2,
        image: "/hero3.png",
        color: "Silver",
        size: "Standard"
      }
    ],
    subtotal: 379.97,
    shipping: 0,
    total: 379.97
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Order Header with Arrival Date */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Order #{orderData.orderId}</h1>
            <p className="text-gray-500">Placed on {orderData.orderDate}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
              <FaTruck className="text-lg" />
              <span className="font-medium">{orderData.status}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <FaCalendarAlt className="text-gray-400" />
              <span>Arriving in {orderData.daysToArrive} days ({orderData.estimatedArrival})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Progress */}
      <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">✓</div>
            <p className="mt-2 text-sm text-gray-600">Order Placed</p>
          </div>
          <div className="flex-1 h-1 mx-4 bg-green-500"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">✓</div>
            <p className="mt-2 text-sm text-gray-600">Processing</p>
          </div>
          <div className="flex-1 h-1 mx-4 bg-blue-500"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              <FaTruck />
            </div>
            <p className="mt-2 text-sm text-gray-600">In Transit</p>
          </div>
          <div className="flex-1 h-1 mx-4 bg-gray-200"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
              <FaBox />
            </div>
            <p className="mt-2 text-sm text-gray-600">Delivered</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="md:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-6">Order Items</h2>
          <div className="space-y-6">
            {orderData.items.map((item) => (
              <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-gray-500 text-sm">Color: {item.color} | Size: {item.size}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-gray-900 font-medium">${item.price}</p>
                    <p className="text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>${orderData.subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span>{orderData.shipping === 0 ? 'Free' : `$${orderData.shipping}`}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${orderData.total}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Info */}
        <div className="space-y-6">
          {/* Shipping Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <FaMapMarkerAlt className="text-gray-400" />
              <h2 className="text-lg font-semibold">Shipping Address</h2>
            </div>
            <div className="text-gray-600 space-y-1">
              <p className="font-medium text-gray-900">{orderData.shippingAddress.name}</p>
              <p>{orderData.shippingAddress.street}</p>
              <p>{orderData.shippingAddress.city}</p>
              <p>{orderData.shippingAddress.country}</p>
              <p>{orderData.shippingAddress.phone}</p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <FaCreditCard className="text-gray-400" />
              <h2 className="text-lg font-semibold">Payment Method</h2>
            </div>
            <p className="text-gray-600">{orderData.paymentMethod}</p>
          </div>

          {/* Need Help */}
          <div className="bg-pink-50 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-2">Need Help?</h2>
            <p className="text-gray-600 mb-4">Contact our support team for assistance</p>
            <button className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;