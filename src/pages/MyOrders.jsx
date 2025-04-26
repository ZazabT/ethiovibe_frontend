import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBox, FaShippingFast, FaCheck, FaClock } from 'react-icons/fa'

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([])

  // Simulate fetching orders from a backend API
  useEffect(() => {
    setTimeout(() => {
      const fetchedOrders = [
        {
          _id: "ORD001",
          date: "2024-01-15",
          status: "Delivered",
          deliveryAddress: "Bole, Addis Ababa, Ethiopia",
          total: 199.99,
          items: 3,
          orderItems: [
            {
              _id: "ITEM001",
              name: "Traditional Habesha Kemis",
              imgUrl: '/hero1.png',
              price: 89.99,
              quantity: 2,
            },
            {
              _id: "ITEM002",
              name: "Ethiopian Coffee Set",
              imgUrl: '/hero1.png',
              price: 49.99,
              quantity: 1,
            },
          ]
        },
        {
          _id: "ORD002",
          date: "2024-01-20",
          status: "Processing",
          deliveryAddress: "Kazanchis, Addis Ababa, Ethiopia",
          total: 299.99,
          items: 4,
          orderItems: [
            {
              _id: "ITEM003",
              name: "Modern Tilfi Dress",
              imgUrl: '/hero1.png',
              price: 159.99,
              quantity: 1,
            },
            {
              _id: "ITEM004",
              name: "Ethiopian Scarf Set",
              imgUrl:'/hero1.png',
              price: 39.99,
              quantity: 2,
            },
            {
              _id: "ITEM005",
              name: "Traditional Jewelry Set",
              imgUrl: '/hero1.png',
              price: 79.99,
              quantity: 1,
            }
          ]
        },
        {
          _id: "ORD003",
          date: "2024-01-25",
          status: "Pending",
          deliveryAddress: "Piassa, Addis Ababa, Ethiopia",
          total: 159.99,
          items: 2,
          orderItems: [
            {
              _id: "ITEM006",
              name: "Ethiopian Print Blazer",
              imgUrl: '/hero1.png',
              price: 129.99,
              quantity: 1,
            },
            {
              _id: "ITEM007",
              name: "Hand-woven Shemma Scarf",
              imgUrl: '/hero1.png',
              price: 29.99,
              quantity: 1,
            }
          ]
        }
      ];
      setMyOrders(fetchedOrders);
    }, 1000);
  }, []);
  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'text-green-500 bg-green-50'
      case 'Processing': return 'text-orange-500 bg-orange-50'
      case 'Pending': return 'text-blue-500 bg-blue-50'
      default: return 'text-gray-500 bg-gray-50'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Delivered': return <FaCheck className="mr-2" />
      case 'Processing': return <FaShippingFast className="mr-2" />
      case 'Pending': return <FaClock className="mr-2" />
      default: return <FaBox className="mr-2" />
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {myOrders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/order/${order._id}`}>
                  <span className="text-sm font-medium text-gray-900 hover:cursor-pointer hover:text-gray-500">#{order._id}</span>
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-3 mb-2">
                        <img 
                          src={item.imgUrl} 
                          alt={item.name} 
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{order.date}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">${order.total}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-pink-500 hover:text-pink-700 text-sm font-medium">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyOrders