import { FaEnvelope, FaPlus ,FaTrash, FaEdit ,FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { FaUsers, FaBan } from 'react-icons/fa';
import { createProduct ,deleteProduct ,getAllProducts ,updateProduct   } from '../../redux/slices/adminSlice/adminProduct.slice'
import { MdOutlineAddBusiness } from "react-icons/md";
const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathname = useLocation();
  const { isLoading, products, totalProducts , isError  } = useSelector((state) => state.adminProduct);
  // Demo products data
  const demoProducts = [
    {
      _id: '1',
      name: 'Traditional Coffee Set',
      brand: 'EthioCraft',
      category: 'Home & Living',
      price: 1299.99,
      countInStock: 15,
      images: ['https://images.unsplash.com/photo-1578943357858-5d7ec5637eb8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3']
    },
    {
      _id: '2',
      name: 'Handwoven Scarf',
      brand: 'TiletCraft',
      category: 'Fashion',
      price: 599.99,
      countInStock: 0,
      images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3']
    },
    {
      _id: '3',
      name: 'Ethiopian Spice Set',
      brand: 'SpiceMaster',
      category: 'Food',
      price: 449.99,
      countInStock: 25,
      images: ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3']
    },
    {
      _id: '4',
      name: 'Traditional Dress',
      brand: 'HabeshaStyle',
      category: 'Fashion',
      price: 2499.99,
      countInStock: 8,
      images: ['https://images.unsplash.com/photo-1585914641050-fa9883c4e21c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3']
    },
    {
      _id: '5',
      name: 'Leather Bag',
      brand: 'LeatherCraft',
      category: 'Accessories',
      price: 899.99,
      countInStock: 12,
      images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3']
    }
  ];

  // get products
  useEffect(() => {
    dispatch(getAllProducts());
    console.log(products);
  }, [dispatch]);
  return (
    <div>
       <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">Product Management</h1>
          <p className="text-sm text-gray-500">Manage and monitor product</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
            <div className="text-right">
              <div className="text-sm text-gray-500">Total producs</div>
              <div className="text-lg font-semibold text-gray-800 flex justify-center">
                {isLoading ? <ImSpinner2 className="animate-spin inline-block" /> : totalProducts}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors shadow-sm"
          >
            < MdOutlineAddBusiness className="text-xl" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select className="border rounded-lg px-4 py-2">
            <option>All Categories</option>
            <option>Topwear</option>
            <option>Underwear</option>
            <option>Children</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {demoProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.brand}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
                <td className="px-6 py-4 text-sm text-gray-900">Br {product.price.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.countInStock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.countInStock > 0 ? `In Stock (${product.countInStock})` : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash />
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
              Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
              <span className="font-medium">5</span> results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50">Previous</button>
              <button className="px-3 py-1 border rounded-md text-sm bg-pink-500 text-white">1</button>
              <button className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;