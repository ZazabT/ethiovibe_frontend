import React from 'react'
import Hero from '../components/layout/Hero'
import Categories from '../components/product/Categories'
import NewArrives from '../components/product/NewArrives'
import ProductDetails from '../components/product/ProductDetails'
import ProductCard from '../components/product/ProductCard'
import Feature from '../components/product/Feature'
// import { FaStar } from 'react-icons/fa'
const Home = () => {
 // Similar Products Array
 const recommendedProducts = [
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
];

  // Top Other Categories Array
  const otherCategories = [
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
           <ProductDetails/>
        </div>

        {/* Products You May Like Section */}
      <div className="py-16 mx-auto max-w-6xl">
        <div className="container mx-auto px-4">
        <div className="text-center mb-12">
                <h2 className="md:text-4xl text-xl yuji-font font-semibold mb-4">Similar Products</h2>
                <div className="flex items-center justify-center gap-4">
                    <span className="w-10 h-[2px] bg-pink-500"/>
                    <p className=" md:text-xl text-sm text-gray-600">You May Also Like</p>
                    <span className="w-10 h-[2px] bg-pink-500"/>
                </div>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>

       {/* Top oters catagories */}
       <div className="py-16 mx-auto max-w-7xl">
        <div className="container mx-auto px-4">
          {/* Header */}
         <div className="text-center mb-12">
                <h2 className="md:text-4xl text-xl yuji-font font-semibold mb-4">Other Products</h2>
                <div className="flex items-center justify-center gap-4">
                    <span className="w-10 h-[2px] bg-pink-500"/>
                    <p className=" md:text-xl text-sm text-gray-600">Our Defferent Categories</p>
                    <span className="w-10 h-[2px] bg-pink-500"/>
                </div>
          </div>
         
      
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherCategories.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Our Feather  */}
      <Feature/>

    </div>
  )
}

export default Home