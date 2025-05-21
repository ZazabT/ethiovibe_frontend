import { FaEnvelope, FaTrash, FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaEye } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { FaUsers, FaBan } from 'react-icons/fa';
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '../../redux/slices/adminSlice/adminProduct.slice'
import { MdOutlineAddBusiness } from "react-icons/md";
import Pagination from '../../components/common/Pagination';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pathname = useLocation();
  const { isLoading, products, totalProducts, isError } = useSelector((state) => state.adminProduct);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  // Calculate pagination
  const indexOfLastProduct = (currentPage + 1) * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct);
  const pageCount = Math.ceil((products?.length || 0) / itemsPerPage);

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0);
  };


  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Scroll to top on pathname change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Add product 
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    countInStock: 0,
    stockStatus: 'IN_STOCK',
    category: '',
    images: [],
  });

  const handleAddProduct = async () => {

  }


  // delete product
  const handleDeleteProduct = async (productId) => {
  }

  // Edit product
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    name: '',
    description: '',
    price: 0,
    countInStock: 0,
    stockStatus: 'IN_STOCK',
    category: '',
    images: [],
  })
  const handleEditProduct = (product) => {
  };


  // get product details
  const handleGetProductDetails = (productId) => {
  };
  return (
    <div>
      {/* Header */}

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
              handleAddProduct();
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
      <div className="rounded-lg mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <select className="border border-gray-200 rounded-lg px-4 py-2">
            <option>All Categories</option>
            <option>Topwear</option>
            <option>Underwear</option>
            <option>Children</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      {isLoading ? (
        <div className="p-8 min-h-[calc(80vh-200px)] flex items-center justify-center">
          <div className="flex flex-col h-full items-center justify-center">
            <ImSpinner2 className="animate-spin text-pink-500 text-5xl mb-4" />
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
              {typeof isError === 'string' ? isError : 'Failed to load products. Please try again.'}
            </p>
            <button
              onClick={() => dispatch(getAllProducts())}
              className="mt-4 px-4 py-2 text-red-500 hover:text-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : !Array.isArray(products) || products.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <MdOutlineAddBusiness className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Found</h3>
            <p className="text-gray-500 max-w-md">Add your first product to get started.</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentProducts?.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">ETB {product.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.countInStock > 30 
                        ? 'bg-green-100 text-green-800' 
                        : product.countInStock > 10 
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.countInStock > 0 ? `In Stock (${product.countInStock})` : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.discountPercentage > 0 
                        ? 'bg-pink-100 text-pink-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {product.discountPercentage > 0 ? `${product.discountPercentage}% OFF` : 'No Discount'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <FiEdit3 className="text-green-500 hover:text-green-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <RiDeleteBin5Line className="text-red-400 hover:text-red-600" />
                      </button>
                      <button
                        onClick={() => handleGetProductDetails(product._id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <FaEye className="text-blue-300 hover:text-blue-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="bg-white px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {indexOfFirstProduct + 1} to {Math.min(indexOfLastProduct, products?.length || 0)} of{' '}
                <span className="font-medium">{products?.length || 0}</span> products
              </div>
              <Pagination
                pageCount={pageCount}
                onPageChange={handlePageChange}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;