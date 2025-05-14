import React from 'react';
import { FaEnvelope, FaTrash, FaSearch } from 'react-icons/fa';

const Subscribers = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Newsletter Subscribers</h1>
        <button className="bg-pink-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-pink-600">
          Export List
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search subscribers..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subscribed Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map((item) => (
              <tr key={item} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <FaEnvelope className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">subscriber{item}@example.com</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date().toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
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

export default Subscribers;