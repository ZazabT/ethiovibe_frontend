import { useEffect } from 'react';
import { FaSearch, FaEye, FaBan, FaUsers } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAllOrders } from '../../redux/slices/adminSlice/adminOrder.slice';
import { format } from 'date-fns';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { toast } from 'sonner';
import { deleteOrder, updateOrder } from '../../redux/slices/adminSlice/adminOrder.slice';

const Orders = () => {
  const { isLoading, isError, orders, totalOrders } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathname = useLocation();
   const getStatusStyle = (status) => {
    const styles = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      PROCESSING: 'bg-blue-100 text-blue-800',
      SHIPPED: 'bg-indigo-100 text-indigo-800',
      OUT_FOR_DELIVERY: 'bg-purple-100 text-purple-800',
      DELIVERED: 'bg-green-100 text-green-800',
      FAILED_DELIVERY: 'bg-red-100 text-red-800',
      CANCELLED: 'bg-gray-100 text-gray-800',
      RETURNED: 'bg-orange-100 text-orange-800',
      REFUNDED: 'bg-pink-100 text-pink-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(getAllOrders());
    console.log(orders)
  }, [dispatch]);


  // Handle status update
  const handleStatusUpdate = async ( orderId, newStatus) => {
    dispatch(updateOrder({ id:orderId,  deliveryStatus:newStatus })).unwrap().then(() => {
      toast.success('Order status updated successfully'); 
    }).catch((error) => {
      toast.error('Failed to update order status');
      console.error(error);
    });
  };

  // Handle order deletion
  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      dispatch(deleteOrder(orderId)).unwrap().then(() => {
        toast.success('Order deleted successfully'); 
      }).catch((error) => {
        toast.error('Failed to delete order');
        console.error(error); 
      })
    }
  };
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">Order Management</h1>
          <p className="text-sm text-gray-500">Manage and monitor orders</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
            <div className="text-right">
              <div className="text-sm text-gray-500">Total orders</div>
              <div className="text-lg font-semibold text-gray-800 flex justify-center">
                {isLoading ? <ImSpinner2 className="animate-spin inline-block" /> : totalOrders || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 border-gray-200 py-2 border rounded-lg"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            defaultValue="ALL"
          >
            <option value="ALL">All Orders</option>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="SHIPPED">Shipped</option>
            <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
            <option value="DELIVERED">Delivered</option>
            <option value="FAILED_DELIVERY">Failed Delivery</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="RETURNED">Returned</option>
            <option value="REFUNDED">Refunded</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="p-8">
          <div className="flex flex-col items-center justify-center">
            <ImSpinner2 className="animate-spin text-pink-500 text-4xl mb-4" />
            <p className="text-gray-500">Loading orders...</p>
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
              {typeof isError === 'string' ? isError : 'Failed to load orders. Please try again.'}
            </p>
            <button
              onClick={() => dispatch(getAllOrders())}
              className="mt-4 px-4 py-2 text-red-500 hover:text-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : !Array.isArray(orders) || orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FaUsers className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Found</h3>
            <p className="text-gray-500 max-w-md">There are no orders in the system yet.</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (

               
                
                // Update the table row content
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    #{order._id.slice(0,6)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover border-2 border-gray-100"
                        src={`https://ui-avatars.com/api/?name=${order?.user?.name || 'U'}&background=random`}
                        alt={order?.user?.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{order?.user?.name || 'Unknown User'}</div>
                        <div className="text-xs text-gray-500">{order?.user?.email || 'No email provided'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(order.deliveryStatus)}`}>
                      {order.deliveryStatus.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ETB {order.totalPrice.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <select
                        value={order.deliveryStatus}
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        className="text-sm border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="FAILED_DELIVERY">Failed Delivery</option>
                        <option value="CANCELLED">Cancelled</option>
                        <option value="RETURNED">Returned</option>
                        <option value="REFUNDED">Refunded</option>
                      </select>
                      <button 
                        onClick={() => navigate(``)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        title="View Order Details"
                      >
                        <FaEye className="text-blue-500 hover:text-blue-600 text-lg" />
                      </button>
                      <button 
                        onClick={() => handleDeleteOrder(order._id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                        title="Delete Order"
                      >
                        <RiDeleteBin5Line className="text-red-400 hover:text-red-600 text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                <span className="font-medium">20</span> results
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50">Previous</button>
                <button className="px-3 py-1 border rounded-md text-sm bg-pink-500 text-white">1</button>
                <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>



  );
};

export default Orders;


