import React from 'react';
import { FaSearch, FaEye } from 'react-icons/fa';

const Orders = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Orders Management</h1>
        <div className="flex gap-2">
          <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600">
            Export Orders
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select className="border rounded-lg px-4 py-2">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
          <input
            type="date"
            className="border rounded-lg px-4 py-2"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map((item) => (
              <tr key={item} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  #ORD-{String(item).padStart(4, '0')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 flex-shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={`https://ui-avatars.com/api/?name=Customer${item}&background=random`}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">Customer {item}</div>
                      <div className="text-sm text-gray-500">customer{item}@example.com</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date().toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Br {(Math.random() * 1000).toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
              <span className="font-medium">20</span> results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50">Previous</button>
              <button className="px-3 py-1 border rounded-md text-sm bg-pink-500 text-white">1</button>
              <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50">2</button>
              <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;