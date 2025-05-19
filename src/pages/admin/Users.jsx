import React, { useEffect, useState } from 'react';
import { FaUserPlus, FaBan, FaSearch, FaUsers } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
import { TbUserEdit } from 'react-icons/tb';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { createUser, deleteUser, getAllUsers, updateUser } from '../../redux/slices/adminSlice/user.slice';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { users, isLoading, isError, totalUser } = useSelector((state) => state.adminUser);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Scroll to top on pathname change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Fetch all users
  useEffect(() => {
    console.log('Fetching users...');
    dispatch(getAllUsers()).then((result) => {
      console.log('Users fetched:', result.payload);
    });
  }, [dispatch]);

  // Reset form data
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: '',
    });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form
  const validateForm = (isUpdate = false) => {
    const { name, email, password, role } = formData;
    if (!name.trim()) {
      toast.error('Name is required');
      return false;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Valid email is required');
      return false;
    }
    if (!isUpdate && !password) {
      toast.error('Password is required for new users');
      return false;
    }
    if (!role || !['admin', 'customer'].includes(role)) {
      toast.error('Valid role is required');
      return false;
    }
    return true;
  };

  // Add user
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { name, email, password, role } = formData;
    dispatch(createUser({ name, email, password, role }))
      .unwrap()
      .then(() => {
        toast.success('User added successfully');
        setIsAddModalOpen(false);
        resetForm();
      })
      .catch((error) => toast.error(error.msg || 'Failed to add user'));
  };

  // Update user
  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (!selectedUser || !validateForm(true)) return;

    const { name, email, password, role } = formData;
    const user = { name, email, role, ...(password && { password }) };
    dispatch(updateUser({ id: selectedUser._id, user }))
      .unwrap()
      .then(() => {
        toast.success('User updated successfully');
        setIsUpdateModalOpen(false);
        setSelectedUser(null);
        resetForm();
      })
      .catch((error) => toast.error(error.msg || 'Failed to update user'));
  };

  // Open update modal with user data
  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      password: '',
      role: user.role || 'customer',
    });
    setIsUpdateModalOpen(true);
  };

  // Delete user
  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id))
        .unwrap()
        .then(() => toast.success('User deleted successfully'))
        .catch((error) => toast.error(error.msg || 'Failed to delete user'));
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">Users Management</h1>
          <p className="text-sm text-gray-500">Manage and monitor user accounts</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
            <div className="text-right">
              <div className="text-sm text-gray-500">Total Users</div>
              <div className="text-lg font-semibold text-gray-800 flex justify-center">
                {isLoading ? <ImSpinner2 className="animate-spin inline-block" /> : totalUser || 0}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors shadow-sm"
          >
            <FaUserPlus className="text-lg" />
            <span>Add User</span>
          </button>
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
          <select className="border border-gray-200 rounded-lg px-4 py-2">
            <option>All Roles</option>
            <option>Admin</option>
            <option>Customer</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      {isLoading ? (
        <div className="p-8">
          <div className="flex flex-col items-center justify-center">
            <ImSpinner2 className="animate-spin text-pink-500 text-4xl mb-4" />
            <p className="text-gray-500">Loading users...</p>
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
              {typeof isError === 'string' ? isError : 'Failed to load users. Please try again.'}
            </p>
            <button
              onClick={() => dispatch(getAllUsers())}
              className="mt-4 px-4 py-2 text-red-500 hover:text-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : !Array.isArray(users) || users.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaUsers className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Users Found</h3>
            <p className="text-gray-500 max-w-md">
              There are no users in the system yet. Click the "Add User" button to create your first user.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users
                .filter((user) => user && typeof user === 'object' && user._id && user.name && user.email)
                .map((user) => {
                  const createdAtDate = user.createdAt ? new Date(user.createdAt) : null;
                  const isValidDate = createdAtDate && !isNaN(createdAtDate.getTime());
                  const formattedDate = isValidDate ? format(createdAtDate, 'MMM dd, yyyy') : 'N/A';

                  return (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full object-cover border-2 border-gray-100"
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'Unknown')}&background=random`}
                            alt={user.name || 'Unknown'}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name || 'Unknown'}</div>
                            <div className="text-xs text-gray-500">Joined {formattedDate}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email || 'N/A'}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            user.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {user.role || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => openUpdateModal(user)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <TbUserEdit className="text-green-500 hover:text-green-600 text-lg" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <RiDeleteBin5Line className="text-red-300 hover:text-red-500 text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              {users.filter((user) => user && typeof user === 'object' && user._id && user.name && user.email).length ===
                0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                    No valid users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                <span className="font-medium">{totalUser || 0}</span> users
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  Previous
                </button>
                <button className="px-4 py-2 bg-pink-500 text-white rounded-lg text-sm hover:bg-pink-600 transition-colors">
                  1
                </button>
                <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      <Transition appear show={isAddModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsAddModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                  <div className="flex justify-between items-center mb-4">
                    <Dialog.Title as="h3" className="text-xl font-semibold text-gray-900">
                      Add New User
                    </Dialog.Title>
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <form onSubmit={handleAddUser} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-colors"
                        required
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-colors"
                        required
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-colors"
                        required
                        placeholder="Enter password"
                      />
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Role
                      </label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-colors"
                        required
                      >
                        <option value="" disabled>
                          Select a role
                        </option>
                        <option value="admin">Admin</option>
                        <option value="customer">Customer</option>
                      </select>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsAddModalOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors"
                      >
                        Add User
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Update User Modal */}
      <Transition appear show={isUpdateModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsUpdateModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
                  <div className="flex justify-between items-center mb-4">
                    <Dialog.Title as="h3" className="text-xl font-semibold text-gray-900">
                      Update User
                    </Dialog.Title>
                    <button
                      type="button"
                      onClick={() => setIsUpdateModalOpen(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <form onSubmit={handleUpdateUser} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-colors"
                        required
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-colors"
                        required
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password (optional)
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-colors"
                        placeholder="Leave blank to keep unchanged"
                      />
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Role
                      </label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-colors"
                        required
                      >
                        <option value="admin">Admin</option>
                        <option value="customer">Customer</option>
                      </select>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsUpdateModalOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors"
                      >
                        Update User
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Users;