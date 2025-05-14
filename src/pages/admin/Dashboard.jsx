import React from 'react';
import { FaBox, FaShoppingBag, FaUsers, FaDollarSign } from 'react-icons/fa';
import { useSelector , useDispatch } from 'react-redux';
const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-pink-100 rounded-lg">
              <FaBox className="text-pink-500 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Products</p>
              <h3 className="text-xl font-semibold text-gray-900">245</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaShoppingBag className="text-blue-500 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Orders</p>
              <h3 className="text-xl font-semibold text-gray-900">156</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <FaDollarSign className="text-green-500 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-xl font-semibold text-gray-900">Br 24,500</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FaUsers className="text-purple-500 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Users</p>
              <h3 className="text-xl font-semibold text-gray-900">1,245</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h2>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {/* Add sample orders here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;