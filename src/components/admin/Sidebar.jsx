import { Link, useLocation , useNavigate} from 'react-router-dom';
import { 
  FaHome, FaBox, FaUsers, FaShoppingCart, FaChartBar, 
  FaCog, FaTimes, FaSignOutAlt, FaStore, FaBell, FaUserCog 
} from 'react-icons/fa';
import { useSelector , useDispatch } from 'react-redux';
import { useState } from 'react';
import { logout  } from '../../redux/slices/auth.slice';
const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const {user , token } = useSelector((state) => state.auth);
  const handleLogout = () => {
    // Handle logout logic here
    dispatch(logout());

  };
  const navigation = [
    { 
      title: 'Main',
      items: [
        { name: 'Dashboard', icon: FaHome, path: '/admin' },
        { name: 'Products', icon: FaBox, path: '/admin/products' },
        { name: 'Orders', icon: FaShoppingCart, path: '/admin/orders' },
      ]
    },
    {
      title: 'Management',
      items: [
        { name: 'Users', icon: FaUsers, path: '/admin/users' },
        { name: 'Subscribers', icon: FaChartBar, path: '/admin/subscribers' },
        { name: 'Settings', icon: FaCog, path: '/admin/settings' },
      ]
    }
  ];

  return (
    <aside className={`fixed top-0 left-0 z-40 w-72 h-screen transition-transform ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } md:translate-x-0`}>
      <div className="h-full px-6 py-8 overflow-y-auto bg-gradient-to-b from-pink-600 to-pink-700 shadow-xl">
        {/* Logo */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/admin" className="flex items-center space-x-3">
            <span className="text-2xl yuji-font font-bold text-white tracking-wide">
              EthioVibe
            </span>
          </Link>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-pink-100 hover:text-white transition-colors relative"
            >
              <FaBell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                3
              </span>
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="md:hidden text-pink-100 hover:text-white transition-colors"
            >
              <FaTimes size={24} />
            </button>
          </div>
        </div>

        {/* Admin Info */}
        <div className="mb-8 p-4 bg-pink-500/30 rounded-2xl backdrop-blur-sm border border-pink-500/20">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src="/women2.jpg" 
                alt="Admin" 
                className="w-12 h-12 rounded-full border-2 border-pink-300"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <h3 className="text-white font-medium">Admin User</h3>
              <p className="text-pink-200 text-sm">Super Admin</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link to="/admin/profile" className="flex items-center justify-center px-3 py-1.5 bg-pink-500/20 rounded-lg text-pink-100 text-sm hover:bg-pink-500/30 transition-colors">
              <FaUserCog className="mr-2" size={14} />
              Profile
            </Link>
            <Link to="/admin/store" className="flex items-center justify-center px-3 py-1.5 bg-pink-500/20 rounded-lg text-pink-100 text-sm hover:bg-pink-500/30 transition-colors">
              <FaStore className="mr-2" size={14} />
              Store
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-6">
          {navigation.map((group) => (
            <div key={group.title}>
              <h3 className="text-pink-200 text-xs uppercase tracking-wider mb-3 px-4">{group.title}</h3>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                      location.pathname === item.path 
                        ? 'bg-white text-pink-600 shadow-lg' 
                        : 'text-pink-100 hover:bg-pink-500/30'
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
              </div>
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-8 left-6 right-6">
          <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 text-pink-100 rounded-xl hover:bg-pink-500/30 transition-all duration-200 border border-pink-500/20">
            <FaSignOutAlt className="w-5 h-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};s

export default Sidebar;