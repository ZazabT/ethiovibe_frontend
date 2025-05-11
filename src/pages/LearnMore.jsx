import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaLeaf, FaHandHoldingHeart, FaShippingFast, FaUserFriends } from 'react-icons/fa';
import { MdSecurity, MdDesignServices } from 'react-icons/md';

const LearnMore = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[60vh] bg-gradient-to-r from-pink-100 to-pink-50 flex items-center"
      >
        <div className="absolute inset-0 bg-[url('/path/to/pattern.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover Our Story
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Experience the perfect blend of Ethiopian heritage and contemporary fashion
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At EthioVibe, we're committed to delivering quality, sustainability, and authentic Ethiopian fashion
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="text-pink-500 text-3xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From traditional craftsmanship to your doorstep
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl text-pink-500">{step.icon}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Experience Ethiopian Fashion?</h2>
            <p className="mb-8 text-pink-100">
              Join our community and discover unique pieces that tell a story
            </p>
            <div className="space-x-4">
              <Link
                to="/collections/all"
                className="inline-block px-8 py-3 bg-white text-pink-500 font-medium rounded-full hover:bg-pink-50 transition-colors"
              >
                Shop Now
              </Link>
              <Link
                to="/register"
                className="inline-block px-8 py-3 border-2 border-white text-white font-medium rounded-full hover:bg-pink-600 transition-colors"
              >
                Join Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const values = [
  {
    icon: <FaLeaf />,
    title: "Sustainable Practices",
    description: "We prioritize eco-friendly materials and ethical production methods to minimize our environmental impact."
  },
  {
    icon: <FaHandHoldingHeart />,
    title: "Artisan Support",
    description: "Working directly with Ethiopian artisans, ensuring fair wages and preserving traditional craftsmanship."
  },
  {
    icon: <MdDesignServices />,
    title: "Unique Designs",
    description: "Each piece combines traditional Ethiopian patterns with contemporary fashion trends."
  },
  {
    icon: <MdSecurity />,
    title: "Quality Assurance",
    description: "Rigorous quality control ensures every piece meets our high standards."
  },
  {
    icon: <FaShippingFast />,
    title: "Fast Delivery",
    description: "Efficient worldwide shipping with careful packaging to protect your items."
  },
  {
    icon: <FaUserFriends />,
    title: "Customer First",
    description: "Dedicated support team ready to assist you with any questions or concerns."
  }
];

const process = [
  {
    icon: "🎨",
    title: "Design",
    description: "Combining traditional patterns with modern trends"
  },
  {
    icon: "🧵",
    title: "Crafting",
    description: "Skilled artisans bring designs to life"
  },
  {
    icon: "✨",
    title: "Quality Check",
    description: "Thorough inspection of each piece"
  },
  {
    icon: "📦",
    title: "Delivery",
    description: "Careful packaging and swift shipping"
  }
];

export default LearnMore;