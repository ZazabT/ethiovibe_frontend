import React, { useState, useEffect , useRef } from 'react'
import { BsFilterLeft } from "react-icons/bs";
import Filtersidebar from '../components/product/Filtersidebar'
import ProductCard from '../components/product/ProductCard';
const Collection = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState('newest')
  const sideBarRef = useRef(null)

  // Sort products based on selected option
  const sortProducts = (products, sortType) => {
    const sortedProducts = [...products]
    switch (sortType) {
      case 'price-low':
        return sortedProducts.sort((a, b) => a.price - b.price)
      case 'price-high':
        return sortedProducts.sort((a, b) => b.price - a.price)
      case 'rating':
        return sortedProducts.sort((a, b) => b.rating - a.rating)
      case 'popular':
        return sortedProducts.sort((a, b) => b.reviews - a.reviews)
      default:
        return sortedProducts
    }
  }

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
        const Products = [
            {
              _id: "p002",
              name: "Traditional Habesha Dress",
              price: 199.99,
              description: "Elegant traditional Ethiopian dress",
              images: [
                "https://images.unsplash.com/photo-1594633313593-bab3825d0caf",
                "https://images.unsplash.com/photo-1594633313593-bab3825d0caf",
              ],
              rating: 4.6,
              reviews: 89,
              discount: {
                percentage: 10,
                validUntil: "2024-03-01"
              }
            },
            {
              _id: "p003",
              name: "Ethiopian Jewelry Set",
              price: 149.99,
              description: "Traditional Ethiopian jewelry set",
              images: [
                "https://images.unsplash.com/photo-1602173574767-37ac01994b2a",
                "https://images.unsplash.com/photo-1602173574767-37ac01994b2a",
              ],
              rating: 4.9,
              reviews: 156,
            },
            {
              _id: "p004",
              name: "Handwoven Scarf",
              price: 79.99,
              description: "Traditional Ethiopian cotton scarf",
              images: [
                "https://images.unsplash.com/photo-1601244005535-a48d21d951ac",
                "https://images.unsplash.com/photo-1601244005535-a48d21d951ac",
              ],
              rating: 4.7,
              reviews: 92,
              discount: {
                percentage: 15,
                validUntil: "2024-03-01"
              }
            },
            {
              _id: "p005",
              name: "Traditional Shoes",
              price: 89.99,
              description: "Handcrafted Ethiopian leather shoes",
              images: [
                "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
                "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
              ],
              rating: 4.8,
              reviews: 78,
            },
            {
                _id: "c001",
                name: "Ethiopian Electronics",
                price: 299.99,
                description: "Modern electronics with Ethiopian design",
                images: [
                  "https://images.unsplash.com/photo-1468495244123-6c6c332eeece",
                  "https://images.unsplash.com/photo-1468495244123-6c6c332eeece",
                ],
                rating: 4.5,
                reviews: 65,
                discount: {
                  percentage: 20,
                  validUntil: "2024-03-01"
                }
              },
              {
                _id: "c002",
                name: "Traditional Hats",
                price: 59.99,
                description: "Authentic Ethiopian headwear",
                images: [
                  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
                  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
                ],
                rating: 4.7,
                reviews: 43,
              },
              {
                _id: "c003",
                name: "Silver Chain Set",
                price: 199.99,
                description: "Handcrafted Ethiopian silver chains",
                images: [
                  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
                  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
                ],
                rating: 4.9,
                reviews: 91,
                discount: {
                  percentage: 10,
                  validUntil: "2024-03-01"
                }
              },
              {
                _id: "c004",
                name: "Home Decor",
                price: 149.99,
                description: "Ethiopian traditional home decorations",
                images: [
                  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
                  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
                ],
                rating: 4.6,
                reviews: 87,
              },
              {
                _id: "p002",
                name: "Traditional Habesha Dress",
                price: 199.99,
                description: "Elegant traditional Ethiopian dress",
                images: [
                  "https://images.unsplash.com/photo-1594633313593-bab3825d0caf",
                  "https://images.unsplash.com/photo-1594633313593-bab3825d0caf",
                ],
                rating: 4.6,
                reviews: 89,
                discount: {
                  percentage: 10,
                  validUntil: "2024-03-01"
                }
              },
              {
                _id: "p003",
                name: "Ethiopian Jewelry Set",
                price: 149.99,
                description: "Traditional Ethiopian jewelry set",
                images: [
                  "https://images.unsplash.com/photo-1602173574767-37ac01994b2a",
                  "https://images.unsplash.com/photo-1602173574767-37ac01994b2a",
                ],
                rating: 4.9,
                reviews: 156,
              },
              {
                _id: "p004",
                name: "Handwoven Scarf",
                price: 79.99,
                description: "Traditional Ethiopian cotton scarf",
                images: [
                  "https://images.unsplash.com/photo-1601244005535-a48d21d951ac",
                  "https://images.unsplash.com/photo-1601244005535-a48d21d951ac",
                ],
                rating: 4.7,
                reviews: 92,
                discount: {
                  percentage: 15,
                  validUntil: "2024-03-01"
                }
              },
              {
                _id: "p005",
                name: "Traditional Shoes",
                price: 89.99,
                description: "Handcrafted Ethiopian leather shoes",
                images: [
                  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
                  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
                ],
                rating: 4.8,
                reviews: 78,
              },
              {
                  _id: "c001",
                  name: "Ethiopian Electronics",
                  price: 299.99,
                  description: "Modern electronics with Ethiopian design",
                  images: [
                    "https://images.unsplash.com/photo-1468495244123-6c6c332eeece",
                    "https://images.unsplash.com/photo-1468495244123-6c6c332eeece",
                  ],
                  rating: 4.5,
                  reviews: 65,
                  discount: {
                    percentage: 20,
                    validUntil: "2024-03-01"
                  }
                },
                {
                  _id: "c002",
                  name: "Traditional Hats",
                  price: 59.99,
                  description: "Authentic Ethiopian headwear",
                  images: [
                    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
                    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
                  ],
                  rating: 4.7,
                  reviews: 43,
                },
                {
                  _id: "c003",
                  name: "Silver Chain Set",
                  price: 199.99,
                  description: "Handcrafted Ethiopian silver chains",
                  images: [
                    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
                    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
                  ],
                  rating: 4.9,
                  reviews: 91,
                  discount: {
                    percentage: 10,
                    validUntil: "2024-03-01"
                  }
                },
                {
                  _id: "c004",
                  name: "Home Decor",
                  price: 149.99,
                  description: "Ethiopian traditional home decorations",
                  images: [
                    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
                    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
                  ],
                  rating: 4.6,
                  reviews: 87,
                },
          ];
      
      setProducts(Products);
      setLoading(false);
    }, 1500); // 1.5 second delay to simulate network request
  }, []);


  useEffect(() => {
    // Add event listener to close the sidebar when clicking outside
    document.addEventListener('mousedown', handleClickOutSide);
  
    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, []);
  
  const handleClickOutSide = (event) =>{
    // close sidebar when clicking outside
    if(sideBarRef.current && !sideBarRef.current.contains(event.target)){
      setIsFilterOpen(false);
    }
  }

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // const handleFilterChange = (e) =>{
  //   const {name , value , checked} = e.target ;
  //   let newFilter =
  // }

  const displayProducts = sortProducts(products, sortBy)


  return (
    <div className='min-h-screen'>
      <div className='flex flex-col lg:flex-row relative max-w-[1600px] mx-auto'>
        {/* Mobile Filter Button */}
        <button 
          onClick={toggleFilter}
          className='lg:hidden flex items-center gap-2 mx-auto my-4 px-6 py-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-all shadow-md hover:shadow-lg'
        >
          <BsFilterLeft className='text-xl'/>
          <span className='font-medium'>Filters</span>
        </button>

        {/* Filter Sidebar */}
        <div 
          ref={sideBarRef}
          className={`top-0 h-screen left-0 w-[280px]  shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:z-0 overflow-hidden ${
            isFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
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
              <select 
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none bg-white shadow-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
            {loading ? (
              <div className="col-span-full h-64 flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent"></div>
              </div>
            ) : displayProducts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-medium text-gray-600">No products found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters</p>
              </div>
            ) : (
              displayProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collection