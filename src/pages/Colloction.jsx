import React, { useState, useEffect, useRef } from 'react'
import { MdFilterList } from "react-icons/md";
import Filtersidebar from '../components/product/Filtersidebar'
import ProductCard from '../components/product/ProductCard';
import { useParams, useSearchParams ,useLocation} from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/slices/product.slice';

const Collection = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const sideBarRef = useRef(null)
 const {pathname } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const { collection } = useParams()
  const dispatch = useDispatch()
  const { isLoading, isError, products } = useSelector((state) => state.product)
  
  const queryParams = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    dispatch(getAllProducts({ collection, ...queryParams }));
    // Scroll to top when products are being fetched
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [dispatch, collection, searchParams]);

  // Remove the pathname-based scroll effect since we want to scroll on data fetch
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  useEffect(() => {
    // Add event listener to close the sidebar when clicking outside
    document.addEventListener('mousedown', handleClickOutSide);
  
    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, []);

  // go to topof the page 
  useEffect( () => {
   window.scrollTo(0 ,0 );
  } , [pathname])
  
  const handleClickOutSide = (event) =>{
    // close sidebar when clicking outside
    if(sideBarRef.current && !sideBarRef.current.contains(event.target)){
      setIsFilterOpen(false);
    }
  }

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSortChange = (event) => {
    const newSortBy = event.target.value;
    searchParams.set('sort', newSortBy);
    setSearchParams(searchParams);
  };

  return (
    <div className='min-h-screen'>
      {/* Dark Overlay */}
      <div 
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 lg:hidden ${
          isFilterOpen ? 'opacity-100 z-40' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsFilterOpen(false)}
      />

      <div className='flex flex-col lg:flex-row relative max-w-[1600px] mx-auto'>
        {/* Mobile Filter Button */}
        <button 
          onClick={toggleFilter}
          className='lg:hidden flex items-center mx-4 w-30 gap-2 px-6 py-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-all shadow-md hover:shadow-lg'
        >
          <MdFilterList className='text-xl'/>
          <span className='font-medium'>Filters</span>
        </button>

        {/* Filter Sidebar */}
        <div 
          ref={sideBarRef}
          className={`fixed max-h-[calc(100vh-80px)] overflow-y-auto bg-white lg:sticky top-0 left-0 w-[300px] transform transition-transform duration-300 ease-in-out z-50 lg:z-0 lg:h-screen ${
            isFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="h-full overflow-y-auto py-4">
            <Filtersidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
          </div>
        </div>

        
        {/* Main Content Area */}
        <div className="flex-1 p-4 lg:p-6 lg:pl-8">
          {/* Header and Sort Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">All Products</h2>
                <p className="text-gray-600 mt-1">Showing {products.length} items</p>
              </div>
              <div className="flex items-center border border-gray-300 px-4 py-2 rounded-xl">
                <span className="text-gray-700 font-medium">Sort by:</span>
                <select 
                  className="px-4 py-2 focus:outline-none"
                  value={searchParams.get('sort') || ''}
                  onChange={handleSortChange}
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-span-full h-[50vh] flex justify-center items-center">
                <ImSpinner2 className="animate-spin text-pink-500 text-5xl" />
              </div>
            ) : isError ? (
              <div className="col-span-full  h-[50vh] flex justify-center items-center">
                <h3 className="text-xl font-medium text-red-600">{isError}</h3>
              </div>
            ) : !products?.length ? (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-medium text-gray-600">No products found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters</p>
              </div>
            ) : (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection