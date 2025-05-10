import { useEffect, useState } from 'react'
import Hero from '../components/layout/Hero'
import Categories from '../components/product/Categories'
import NewArrives from '../components/product/NewArrives'
import ProductDetails from '../components/product/ProductDetails'
import ProductCard from '../components/product/ProductCard'
import Feature from '../components/product/Feature'
import { getBestSelling } from '../redux/slices/product.slice'
import { useDispatch , useSelector } from 'react-redux'
import { ImSpinner2 } from "react-icons/im";
import { BiCommentError } from "react-icons/bi";
import axios from 'axios'
// import { FaStar } from 'react-icons/fa'
const Home = () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();
 
  // States for best selling products
  const [bestSelling, setBestSelling] = useState(null);
  const [isBestSellingLoading, setIsBestSellingLoading] = useState(false);
  const [bestSellingError, setBestSellingError] = useState(null);
  
  // States for other categories
  const [otherCategories, setOtherCategories] = useState([]);
  const [isOtherCategoriesLoading, setIsOtherCategoriesLoading] = useState(false);
  const [otherCategoriesError, setOtherCategoriesError] = useState(null);

  useEffect(() => {
    const fetchBestSelling = async () => {
      setIsBestSellingLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/api/products/best-selling`);
        setBestSelling(response.data.bestSellingProduct);
      } catch (error) {
        setBestSellingError(error.message || 'Failed to fetch best selling products');
      } finally {
        setIsBestSellingLoading(false);
      }
    };

    const fetchOtherCategories = async () => {
      setIsOtherCategoriesLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/api/products/other-products`);
        setOtherCategories(response.data.otherProducts || []);
      } catch (error) {
        setOtherCategoriesError(error.message || 'Failed to fetch other categories');
      } finally {
        setIsOtherCategoriesLoading(false);
      }
    };

    fetchBestSelling();
    fetchOtherCategories();
  }, [baseUrl]);

  return (
    <div>
        {/* Hero */}
        <Hero/>

        {/* Categories */}
        <Categories/>

        {/* New Arrived */}
        <NewArrives/>

        {/* Best Seller */}
        <div className=''>
          {/* Best seller header */}
          <div className="text-center mb-12">
                <h2 className="md:text-4xl text-xl yuji-font font-semibold mb-4">Best Seller</h2>
                <div className="flex items-center justify-center gap-4">
                    <span className="w-10 h-[2px] bg-pink-500"/>
                    <p className=" md:text-xl text-sm text-gray-600">Discover Our Best Selling Product</p>
                    <span className="w-10 h-[2px] bg-pink-500"/>
                </div>
          </div>
          {
          isBestSellingLoading ? (
            <div className="flex justify-center items-center py-20">
              <ImSpinner2 className="animate-spin text-pink-500 text-5xl" />
            </div>
          ) : bestSellingError ? (
            <div className="text-center py-16 rounded-lg">
              <p className="text-red-500 font-medium text-lg">{bestSellingError}</p>
            </div>
          ) : bestSelling && bestSelling._id ? (
            <ProductDetails productId={bestSelling._id} />
          ) : (
            <div className="text-center py-12 max-w-2xl mx-auto border border-gray-100 rounded-4xl shadow-md overflow-hidden">
            {/* Empty state content remains the same */}
          </div>
        )}
      </div>

      {/* Other Categories Section */}
      <div className="py-16 mx-auto max-w-7xl">
        <div className="container mx-auto px-4">
          {/* Header remains the same */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isOtherCategoriesLoading ? (
              <div className="col-span-full flex justify-center items-center py-20">
                <ImSpinner2 className="animate-spin text-pink-500 text-5xl" />
              </div>
            ) : otherCategoriesError ? (
              <div className="col-span-full text-center py-16 rounded-lg">
                <p className="text-red-500 font-medium text-lg">{otherCategoriesError}</p>
              </div>
            ) : otherCategories.length > 0 ? (
              otherCategories.map(product => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No other categories available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Our Feather  */}
      <Feature/>

    </div>
  )
}

export default Home