import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, FaBox, FaUsers, FaShoppingCart, FaChartBar, 
  FaCog, FaTimes, FaSignOutAlt, FaStore 
} from 'react-icons/fa';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', icon: FaHome, path: '/admin' },
    { name: 'Products', icon: FaBox, path: '/admin/products' },
    { name: 'Orders', icon: FaShoppingCart, path: '/admin/orders' },
    { name: 'Customers', icon: FaUsers, path: '/admin/customers' },
    { name: 'Analytics', icon: FaChartBar, path: '/admin/analytics' },
  ];

  return (
    <aside className={`fixed top-0 left-0 z-40 w-72 h-screen transition-transform ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } md:translate-x-0`}>
      <div className="h-full px-6 py-8 overflow-y-auto bg-gradient-to-b from-pink-600 to-pink-700 shadow-xl">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <Link to="/admin" className="flex items-center space-x-3">
            <span className="text-2xl yuji-font  font-bold text-white tracking-wide">
              EthioVibe
            </span>
          </Link>
          <button 
            onClick={() => setIsOpen(false)}
            className="md:hidden text-pink-100 hover:text-white transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Admin Info */}
        <div className="mb-8 p-4 bg-pink-500/100 rounded-2xl backdrop-blur-sm">
          <div className="flex items-center space-x-4">
            <img 
              src="/women2.jpg" 
              alt="Admin" 
              className="w-12 h-12 rounded-full border-2 border-gray-300"
            />
            <div>
              <h3 className="text-white font-medium">Admin User</h3>
              <p className="text-pink-200 text-sm">Super Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                location.pathname === item.path 
                  ? 'bg-white text-pink-600 shadow-lg' 
                  : 'text-pink-100 hover:bg-pink-500/100'
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 ${
                location.pathname === item.path 
                  ? 'text-pink-600'
                  : 'text-pink-300'
              }`} />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>


        {/* Logout Button */}
        <div className="absolute bottom-8 left-6 right-6">
          <button className="flex items-center w-full px-4 py-3 text-pink-100 rounded-xl hover:bg-pink-500/100 transition-all duration-200">
            <FaSignOutAlt className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;