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
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
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