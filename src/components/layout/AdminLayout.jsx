import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import Sidebar from '../admin/Sidebar';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="md:ml-64 min-h-screen">
        {/* Top Header */}
        <header className=" shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Mobile humburger button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-gray-500 hover:text-pink-700"
            >
              <FaBars size={24} />
            </button>

            <div className=" flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  src="/hero1.png"
                  alt="Admin"
                  className="w-10 h-10 rounded-full border-2 border-gray-500"
                />
                <span className="text-gray-700 font-medium">Admin User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 min-h-screen">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;