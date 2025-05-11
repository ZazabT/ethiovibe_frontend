import React, { useState, useEffect } from 'react';
import { FaStar, FaShoppingCart, FaTruck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import ProductCard from '../product/ProductCard';
import { ImSpinner2 } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { BiCommentError } from 'react-icons/bi';
import { getProductDetails, getSimilarProducts } from '../../redux/slices/product.slice';
import { addToCart }  from '../../redux/slices/cart.slice';
function ProductDetails({ productId }) {
  const { pathname } = useLocation();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { selectedProduct, similarProducts, isLoading, isError } = useSelector((state) => state.product);
  const { user , guestId } = useSelector((state) => state.auth);
  const productFetchId = productId || id;
  useEffect(() => {
    if (productFetchId) {
      dispatch(getProductDetails(productFetchId));
      dispatch(getSimilarProducts(productFetchId));
    }
  }, [dispatch,productFetchId]); 
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Reset selectedImage when selectedProduct changes
  useEffect(() => {
    setSelectedImage(0);
  }, [selectedProduct]);

  // Add isButtonDisabled state
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // add to cart function
  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select both size and color', {
        icon: <FaExclamationCircle className="text-red-700" />
      });
      return;
    }

    if (quantity < 1) {
      toast.error('Please select a valid quantity', {
        icon: <FaExclamationCircle className="text-red-700" />
      });
      return;
    }

    const cartItem = {
      productId: selectedProduct._id,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      userId: user?._id,
      guestId: guestId,
    };

    try {
      setIsButtonDisabled(true);
     dispatch(addToCart(cartItem));
      toast.success('Product added to cart successfully!', {
        icon: <FaCheckCircle className="text-green-700" />
      });
    } catch (error) {
      toast.error(error.message || 'Failed to add product to cart', {
        icon: <FaExclamationCircle className="text-red-700" />
      });
    } finally {
      setIsButtonDisabled(false);
    }
  };

  // increase quantity
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // decrease quantity
  const decreaseQuantity = () => {
    // check if it is not less than 0
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <ImSpinner2 className="animate-spin text-pink-500 text-5xl" />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="text-center py-16 rounded-lg">
        <p className="text-red-500 font-medium text-lg">{isError}</p>
      </div>
    );
  }

  // No product found state
  if (!selectedProduct || !selectedProduct._id) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-lg">
        <p className="text-gray-500 font-medium text-lg">Product not found</p>
        <p className="text-gray-400 mt-2">The product you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left images */}
          {/* Thumbnail */}
          <div className="hidden md:flex flex-col gap-4">
            {selectedProduct.images && selectedProduct.images.length > 0 ? (
              selectedProduct.images.map((img, index) => (
                <div
                  key={img._id || `${img.url}-${index}`}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer ${
                    selectedImage === index ? 'ring-2 ring-pink-500' : ''
                  }`}
                  role="button"
                  aria-label={`Select image ${index + 1}`}
                  title={img.altText || `Product image ${index + 1}`}
                >
                  <img
                    src={img.url || '/fallback-image.jpg'}
                    alt={img.altText || `Product image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center">No images available</div>
            )}
          </div>
          {/* Main Image */}
          <div className="flex-1 max-h-[620px] rounded-xl overflow-hidden">
            {selectedProduct.images && selectedProduct.images.length > 0 ? (
              <img
                src={selectedProduct.images[selectedImage]?.url || '/fallback-image.jpg'}
                alt={selectedProduct.images[selectedImage]?.altText || selectedProduct.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
                No image available
              </div>
            )}
          </div>
          {/* Mobile Thumbnail */}
          <div className="md:hidden py-2 mx-2 flex overflow-x-scroll space-x-6 mb-4 snap-x snap-mandatory">
            {selectedProduct.images && selectedProduct.images.length > 0 ? (
              selectedProduct.images.map((img, index) => (
                <div
                  key={img._id || `${img.url}-${index}`}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer snap-center ${
                    selectedImage === index ? 'ring-2 ring-pink-500' : ''
                  }`}
                  role="button"
                  aria-label={`Select image ${index + 1}`}
                  title={img.altText || `Product image ${index + 1}`}
                >
                  <img
                    src={img.url || '/fallback-image.jpg'}
                    alt={img.altText || `Product image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center">No images available</div>
            )}
          </div>

          {/* Right content */}
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-3xl yuji-font mb-2">{selectedProduct.name}</h1>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < Math.floor(selectedProduct.ratings) ? 'text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  ({selectedProduct.ratings.toFixed(1)}, {selectedProduct.numReviews} reviews)
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <p className="text-3xl font-semibold">${selectedProduct.price.toFixed(2)}</p>
                {selectedProduct.discountPercentage > 0 && (
                  <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">
                    {selectedProduct.discountPercentage}% OFF
                  </span>
                )}
              </div>
              <p className="text-gray-600">{selectedProduct.description}</p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-medium mb-3">Select Size</h3>
              <div className="flex gap-3">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full border ${
                      selectedSize === size
                        ? 'border-pink-500 text-pink-500'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-medium mb-3">Select Color</h3>
              <div className="flex gap-3">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color.toLowerCase(), width: '2rem', height: '2rem' }}
                    className={`rounded-full border ${
                      selectedColor === color
                        ? 'border-pink-500 text-pink-500'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    aria-label={`Select ${color} color`}
                    title={color}
                  ></button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={decreaseQuantity}
                  className={`w-10 h-10 rounded-full border ${
                    quantity <= 1
                      ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="text-xl">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="w-10 h-10 rounded-full border border-gray-300 hover:border-gray-400"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              whileHover={{ scale: isButtonDisabled ? 1 : 1.02 }}
              whileTap={{ scale: isButtonDisabled ? 1 : 0.98 }}
              className={`w-full py-4 rounded-full flex items-center justify-center gap-2 ${
                isButtonDisabled 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-black hover:bg-gray-800'
              } text-white`}
            >
              {isButtonDisabled ? (
                <ImSpinner2 className="animate-spin" />
              ) : (
                <FaShoppingCart />
              )}
              {isButtonDisabled ? 'Adding to Cart...' : 'Add to Cart'}
            </motion.button>
          </div>
        </div>

        {/* Products You May Like Section */}
        <div className="py-16 mx-auto max-w-6xl">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="md:text-4xl text-xl yuji-font font-semibold mb-4">Similar Products</h2>
              <div className="flex items-center justify-center gap-4">
                <span className="w-10 h-[2px] bg-pink-500" />
                <p className="md:text-xl text-sm text-gray-600">You May Also Like</p>
                <span className="w-10 h-[2px] bg-pink-500" />
              </div>
            </div>
            {similarProducts && similarProducts.length > 0 ? (
              <div className="grid cols-1 rounded-4xl-2 lg:grid-cols-4 gap-6">
                {similarProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 max-w-2xl mx-auto border rounded-4xl border-gray-100 shadow-md overflow-hidden">
                <div className="relative flex flex-col items-center justify-center gap-5 px-4">
                  <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center shadow-inner border border-pink-100 transform transition-all duration-500 hover:scale-110">
                    <BiCommentError className="text-pink-500 text-3xl" />
                  </div>
                  <h3 className="text-gray-800 font-semibold text-2xl yuji-font">No Similar Products</h3>
                  <p className="text-gray-600 max-w-md leading-relaxed">
                    This item is truly one of a kind! Explore our other categories to discover more Ethiopian treasures.
                  </p>
                  <div className="mt-4 flex space-x-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-pink-300 animate-pulse"></span>
                    <span className="inline-block w-2 h-2 rounded-full bg-pink-400 animate-pulse delay-100"></span>
                    <span className="inline-block w-2 h-2 rounded-full bg-pink-500 animate-pulse delay-200"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;