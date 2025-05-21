import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingBag, FaUsers, FaBox, FaChartLine, FaEnvelope } from 'react-icons/fa';
import { MdAttachMoney, MdTrendingUp } from 'react-icons/md';
import { ImSpinner2 } from 'react-icons/im';
import { getAllOrders } from '../../redux/slices/adminSlice/adminOrder.slice';
import { getAllProducts } from '../../redux/slices/adminSlice/adminProduct.slice';
import { getAllUsers } from '../../redux/slices/adminSlice/user.slice';
import { getAllSubscribers } from '../../redux/slices/subscribe.slice';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const dispatch = useDispatch();
  const { orders, totalOrders, totalSells ,isLoading : orderLoading} = useSelector((state) => state.adminOrder);
  const { products, totalProducts , isLoading : productLoading } = useSelector((state) => state.adminProduct);
  const { users, totalUser , isLoading : userLoading } = useSelector((state) => state.adminUser);
  const { subscribers, totalSubscriber , isLoading : subLoading } = useSelector((state) => state.subscribe);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getAllProducts());
    dispatch(getAllUsers());
    dispatch(getAllSubscribers());
  }, [dispatch]);



  const stats = [
    {
      title: 'Total Revenue',
      value: `ETB ${Number(totalSells).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`,
      icon: <MdAttachMoney className="text-2xl" />,
      bgColor: 'bg-gradient-to-br from-green-100 to-emerald-100',
      iconBg: 'bg-green-100',
      trend: '+12.5%',
      borderColor: 'border-green-200'
    },
    {
      title: 'Total Orders',
      value: totalOrders || 0,
      icon: <FaShoppingBag className="text-2xl" />,
      bgColor: 'bg-gradient-to-br from-blue-100 to-sky-100',
      iconBg: 'bg-blue-100',
      trend: '+8.2%',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Total Products',
      value: totalProducts || 0,
      icon: <FaBox className="text-2xl" />,
      bgColor: 'bg-gradient-to-br from-purple-100 to-indigo-100',
      iconBg: 'bg-purple-100',
      trend: '+5.3%',
      borderColor: 'border-purple-200'
    },
    {
      title: 'Total Users',
      value: totalUser || 0,
      icon: <FaUsers className="text-2xl" />,
      bgColor: 'bg-gradient-to-br from-orange-100 to-amber-100',
      iconBg: 'bg-orange-100',
      trend: '+15.7%',
      borderColor: 'border-orange-200'
    },
    // {
    //   title: 'Subscribers',
    //   value: totalSubscriber || 0,
    //   icon: <FaEnvelope className="text-2xl" />,
    //   bgColor: 'bg-gradient-to-br from-pink-100 to-rose-100',
    //   iconBg: 'bg-pink-100',
    //   trend: '+3.8%',
    //   borderColor: 'border-pink-200'
    // }
  ];



  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
        <p className="text-sm text-gray-500">Welcome to your dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bgColor} rounded-2xl p-6 transition-all duration-300 
      hover:scale-105 hover:shadow-lg border ${stat.borderColor}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.iconBg} transition-colors`}>
                {stat.icon}
              </div>
              <div className="flex items-center gap-1 text-green-600 bg-white/80 
          backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium">
                <span>{stat.trend}</span>
                <MdTrendingUp className="text-lg" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
            <p className="text-sm text-gray-500 mt-1">Latest 5 transactions</p>
          </div>
          <button  onClick={()=>navigate('/admin/orders')} className="px-4 py-2 text-sm font-medium text-pink-500 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors flex items-center gap-2">
            View All Orders
            <FaChartLine className="text-sm" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders?.slice(0, 5).map((order) => (
                <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">#{order._id.slice(0, 8)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <FaUsers className="text-gray-500 text-sm" />
                      </div>
                      <span className="ml-3 text-sm text-gray-700">{order.user?.name || 'Guest'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      ETB {Number(order.totalPrice).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1.5 text-xs font-medium rounded-full inline-flex items-center gap-1.5
                      ${order.deliveryStatus === 'DELIVERED' 
                        ? 'bg-green-100 text-green-700' 
                        : order.deliveryStatus === 'PENDING' 
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'}`
                    }>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        order.deliveryStatus === 'DELIVERED' 
                          ? 'bg-green-500' 
                          : order.deliveryStatus === 'PENDING' 
                          ? 'bg-yellow-500'
                          : 'bg-gray-500'
                      }`} />
                      {order.deliveryStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Low Stock Products</h2>
              <p className="text-sm text-gray-500 mt-1">Products running low on inventory</p>
            </div>
            <span className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-full">
              Critical Alert
            </span>
          </div>
          <div className="space-y-4">
            {products?.filter(p => p.countInStock < 30).slice(0, 5).map((product) => (
              <div key={product._id} 
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors border border-gray-50 hover:border-gray-100"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img 
                      src={product.images[0].url} 
                      alt={product.name} 
                      className="w-12 h-12 rounded-lg object-cover border border-gray-100" 
                    />
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white border border-gray-100 flex items-center justify-center">
                      <div className={`w-2 h-2 rounded-full ${
                        product.countInStock < 10 ? 'bg-red-500' : 'bg-yellow-500'
                      }`} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
                    <p className="text-xs text-gray-500">SKU: {product.sku || 'N/A'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    product.countInStock < 10 
                      ? 'bg-red-50 text-red-600' 
                      : 'bg-yellow-50 text-yellow-600'
                  }`}>
                    {product.countInStock} units left
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Recent Subscribers</h2>
              <p className="text-sm text-gray-500 mt-1">Latest newsletter signups</p>
            </div>
            <span className="px-3 py-1 text-xs font-medium text-green-600 bg-green-50 rounded-full">
              Active List
            </span>
          </div>
          <div className="space-y-4">
            {subscribers?.slice(0, 5).map((subscriber) => (
              <div key={subscriber._id} 
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors border border-gray-50 hover:border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 flex items-center justify-center">
                    <FaEnvelope className="text-pink-500" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-800">{subscriber.email}</span>
                    <p className="text-xs text-gray-500">Subscribed on {new Date(subscriber.subscribedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="text-xs text-green-600">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;