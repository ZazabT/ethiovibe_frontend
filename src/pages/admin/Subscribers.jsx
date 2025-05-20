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
import { FaUsers, FaBan } from 'react-icons/fa';

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
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">Newsletter Subscribers</h1>
          <p className="text-sm text-gray-500">Manage your newsletter subscriber list</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-lg">
            <div className="text-right">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Total Subscribers</div>
              <div className="text-lg font-semibold text-gray-800 mt-0.5 flex justify-center">
                {isLoading ? <ImSpinner2 className="animate-spin inline-block items-center" /> : totalSubscriber || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by email..."
              className="w-full pl-10 pr-4 py-2.5 border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="p-8">
          <div className="flex flex-col items-center justify-center">
            <ImSpinner2 className="animate-spin text-pink-500 text-4xl mb-4" />
            <p className="text-gray-500">Loading orders...</p>
          </div>
        </div>
      ) : isError ? (
        <div className="p-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <FaBan className="text-red-500 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Occurred</h3>
            <p className="text-gray-500 max-w-md">
              {typeof isError === 'string' ? isError : 'Failed to load orders. Please try again.'}
            </p>
            <button
              onClick={() => dispatch(getAllOrders())}
              className="mt-4 px-4 py-2 text-red-500 hover:text-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : !Array.isArray(subscribers) || subscribers.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaUsers className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No subscribers Found</h3>
            <p className="text-gray-500 max-w-md">There are no subscribers in the system yet.</p>
          </div>
        </div>
      ) :(
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscribers.map((subscriber) => (
                <tr key={subscriber._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center mr-3">
                        <FaEnvelope className="text-pink-500 text-sm" />
                      </div>
                      <div className="text-sm font-medium text-gray-900">{subscriber.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {format(new Date(subscriber.subscribedAt), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteSub(subscriber._id)}
                      className="p-2 rounded-lg hover:bg-red-50 transition-colors group"
                      title="Delete Subscriber"
                    >
                      <RiDeleteBin5Line className="text-red-400 group-hover:text-red-600 text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">{subscribers.length}</span> of{' '}
                <span className="font-medium">{totalSubscriber}</span> subscribers
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  Previous
                </button>
                <button className="px-4 py-2 bg-pink-500 text-white rounded-lg text-sm hover:bg-pink-600 transition-colors">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscribers;