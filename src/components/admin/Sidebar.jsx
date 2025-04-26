import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, FaBox, FaUsers, FaShoppingCart, FaChartBar, 
  FaCog, FaTimes, FaSignOutAlt 
} from 'react-icons/fa';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', icon: FaHome, path: '/admin' },
    { name: 'Products', icon: FaBox, path: '/admin/products' },
    { name: 'Orders', icon: FaShoppingCart, path: '/admin/orders' },
    { name: 'Customers', icon: FaUsers, path: '/admin/customers' },
    { name: 'Analytics', icon: FaChartBar, path: '/admin/analytics' },
    { name: 'Settings', icon: FaCog, path: '/admin/settings' },
  ];

  return (
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } md:translate-x-0`}>
      <div className="h-full px-3 py-4 overflow-y-auto bg-pink-400">
        {/* Logo */}
        <div className="flex items-center justify-between mb-6 px-2">
          <Link to="/admin" className="text-2xl font-bold text-white">
            EthioVibe
          </Link>
          <button 
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-200 hover:text-white"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 text-gray-200 rounded-lg hover:bg-pink-800 ${
                location.pathname === item.path ? 'bg-pink-800 text-white' : ''
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button className="flex items-center w-full px-4 py-3 text-gray-200 rounded-lg hover:bg-pink-800">
            <FaSignOutAlt className="w-5 h-5 mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;