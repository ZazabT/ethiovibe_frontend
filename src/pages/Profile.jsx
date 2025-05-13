
import React, { useState , useEffect} from 'react';
import { FaUser, FaShoppingBag, FaSignOutAlt, FaEdit } from 'react-icons/fa';
import { motion } from 'framer-motion';
import MyOrders from './MyOrders';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { logout } from '../redux/slices/auth.slice';
import { useNavigate } from 'react-router-dom';
import { ImSpinner2 } from "react-icons/im";
const Profile = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem('profileActiveTab') || 'profile');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  // Form data for profile editio
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  });
  
  const dispatch = useDispatch();
  const { user , token , isLoading , isError} = useSelector((state) => state.auth);

    // check if the user is logged is other with go to home page 
    useEffect(() => {
      if (!token) {
        navigate('/login');
      }
    }, [token, navigate]);
  
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <div className="h-full mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow p-6">
            {/* Profile Info */}
            <div className="text-center mb-6">
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=F472B6&color=ffffff`}
                alt={user?.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-pink-400"
              />
              <h3 className="text-lg font-semibold">{user?.name}</h3>
              <p className="text-sm text-gray-500">{user?.email}</p>
              <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-xs mt-2">
                {user?.role}
              </span>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {[
                { id: 'profile', label: 'Profile', icon: <FaUser /> },
                { id: 'orders', label: 'Orders', icon: <FaShoppingBag /> },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    localStorage.setItem('profileActiveTab', item.id);
                  }}
                  className={`w-full flex items-center px-4 py-2 rounded-lg transition ${
                    activeTab === item.id
                      ? 'bg-pink-500 text-white'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </button>
              ))}
              <button 
                onClick={() => dispatch(logout())}
                className="w-full flex items-center px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition"
              >
                <FaSignOutAlt />
                <span className="ml-3">Logout</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Profile Settings</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-pink-500 hover:text-pink-600"
                >
                  <FaEdit size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={user?.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-pink-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={user?.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-pink-500 disabled:bg-gray-50"
                    />
                  </div>
                </div>

                {isEditing && (
                  <>
                    <div className="border-t pt-6 mt-6">
                      <h3 className="text-lg font-medium mb-4">Change Password</h3>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                          <input
                            type="password"
                            name="currentPassword"
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-pink-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                          <input
                            type="password"
                            name="newPassword"
                            onChange={handleChange}
                            className="w-full px-3 py-2 rounded-lg border focus:ring-1 focus:ring-pink-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                      >
                        Save Changes
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          )}

          {activeTab === 'orders' && <MyOrders />}
        </div>
      </div>
    </div>
  );
};

export default Profile;