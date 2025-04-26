import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FaBars, FaBell, FaSearch, FaUser } from 'react-icons/fa';
import Sidebar from '../admin/Sidebar';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="md:ml-72 min-h-screen">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden text-gray-500 hover:text-pink-600 transition-colors"
              >
                <FaBars size={24} />
              </button>
              
              {/* Search Bar */}
              <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-xl px-4 py-2">
                <FaSearch className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none focus:ring-0 text-sm text-gray-600 w-64"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-pink-600 transition-colors">
                <FaBell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
              </button>

              {/* Admin Profile */}
              <div className="flex items-center space-x-3 border-l pl-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-700">Admin User</p>
                  <p className="text-xs text-gray-500">admin@ethiovibe.com</p>
                </div>
                <button className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                  <FaUser className="text-pink-600" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto min-h-screen">
            <div className=" min-h-screen p-6">
              <Outlet />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 mt-8">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <p className="text-center text-sm text-gray-500">
              © 2024 EthioVibe Admin Dashboard. All rights reserved.
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default AdminLayout;