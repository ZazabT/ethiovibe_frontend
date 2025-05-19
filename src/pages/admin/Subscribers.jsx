import { FaEnvelope, FaTrash, FaSearch } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { getAllSubscribers } from '../../redux/slices/subscribe.slice';
import { deleteSubscriber } from '../../redux/slices/subscribe.slice';

const Subscribers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathname = useLocation();
  const { subscribers, isLoading, totalSubscriber, isError } = useSelector((state) => state.subscribe);

  useEffect(() => {
    dispatch(getAllSubscribers());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])

  // delete subscriber
  const handleDeleteSub = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscriber?')) {
      dispatch(deleteSubscriber(id)).unwrap()
        .then(() => {
          toast.success("Subscriber deleted successfully");
        })
        .catch((err) => {
          toast.error('Failed to delete order');
          console.error(err);
        });
    }
  };
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">Subscribe Management</h1>
          <p className="text-sm text-gray-500">Manage and monitor Subscribers</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
            <div className="text-right">
              <div className="text-sm text-gray-500">Total Users</div>
              <div className="text-lg font-semibold text-gray-800 flex justify-center">
                {isLoading ? <ImSpinner2 className="animate-spin inline-block" /> : totalSubscriber || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 border-gray-200 py-2 border rounded-lg"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subscribed Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {subscribers.map((sub) => (
              <tr key={sub._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex subs-center">
                    <FaEnvelope className="text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">{sub.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {format(new Date(sub.subscribedAt), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleDeleteSub(sub._id)} className="text-red-300 hover:text-red-500">
                    <RiDeleteBin5Line />
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