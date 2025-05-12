import React, { useState } from 'react'
import { FaUser, FaShoppingBag, FaSignOutAlt, FaEdit, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'
import MyOrders from './MyOrders'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const user = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+251 912345678",
    address: "Addis Ababa, Ethiopia",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className=" mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6 sticky top-8">
              {/* Profile Picture */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-28 h-28 rounded-full object-cover border-4 border-pink-100"
                  />
                  <button className="absolute bottom-0 right-0 bg-pink-500 text-white p-2.5 rounded-full hover:bg-pink-600 transition-colors shadow-lg">
                    <FaEdit size={16} />
                  </button>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-xl text-gray-900">{user.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{user.email}</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <nav className="space-y-3">
                  {[
                    { id: 'profile', label: 'Profile', icon: <FaUser /> },
                    { id: 'orders', label: 'Orders', icon: <FaShoppingBag /> },
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id
                          ? 'bg-pink-500 text-white shadow-md'
                          : 'hover:bg-pink-50 text-gray-700'
                        }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                  <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all">
                    <FaSignOutAlt />
                    <span className="font-medium">Logout</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <div className="">
              {/* Profile tab */}
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-pink-500 hover:text-pink-600 transition-colors"
                    >
                      <FaEdit size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={user.name}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            value={user.email}
                            disabled={!isEditing}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <div className="relative">
                          <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="tel"
                            value={user.phone}
                            disabled={!isEditing}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <div className="relative">
                          <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            value={user.address}
                            disabled={!isEditing}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end space-x-4 pt-4">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button className="px-6 py-3 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition-colors">
                        Save Changes
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Orders tab */}
              {activeTab === 'orders' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <MyOrders />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile