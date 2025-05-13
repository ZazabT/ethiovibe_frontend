import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaLeaf, FaHandHoldingHeart, FaShippingFast,
  FaUserFriends, FaArrowRight
} from 'react-icons/fa';
import { MdSecurity, MdDesignServices } from 'react-icons/md';

const LearnMore = () => {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[60vh] bg-gradient-to-r from-pink-100 to-pink-50 flex items-center"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Our Story
            </h1>
            <p className="text-xl text-gray-700">
              Honoring Ethiopian tradition through modern fashion.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Header
            title="Our Values"
            subtitle="Timeless craftsmanship, sustainable purpose, and people first."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
            {values.map((value, idx) => (
              <Card key={idx} icon={value.icon} title={value.title} description={value.description} delay={idx * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <Header
            title="How We Work"
            subtitle="From design to delivery, we ensure authenticity every step of the way."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-12">
            {process.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center text-2xl text-pink-600">
                  {step.icon}
                </div>
                <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-pink-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-4">Join the EthioVibe Movement</h2>
            <p className="mb-8 text-pink-100">
              Explore our exclusive collections and be part of a vibrant community.
            </p>
            <div className="space-x-4">
              <CTAButton to="/collections/all" label="Shop Now" white />
              <CTAButton to="/register" label="Join Us" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

/* Components */

const Header = ({ title, subtitle }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    className="text-center"
  >
    <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
    <p className="text-gray-600 max-w-xl mx-auto">{subtitle}</p>
  </motion.div>
);

const Card = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition"
  >
    <div className="text-pink-500 text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const CTAButton = ({ to, label, white = false }) => (
  <Link
    to={to}
    className={`inline-flex items-center px-6 py-3 rounded-full font-medium transition-colors ${
      white
        ? 'bg-white text-pink-500 hover:bg-pink-50'
        : 'border border-white text-white hover:bg-white hover:text-pink-600'
    }`}
  >
    {label} <FaArrowRight className="ml-2" />
  </Link>
);

/* Data */

const values = [
  {
    icon: <FaLeaf />,
    title: "Sustainability",
    description: "We use eco-conscious materials and ethical production methods."
  },
  {
    icon: <FaHandHoldingHeart />,
    title: "Fair Trade",
    description: "We work directly with Ethiopian artisans and pay fair wages."
  },
  {
    icon: <MdDesignServices />,
    title: "Distinct Design",
    description: "Our styles merge cultural identity with modern fashion."
  },
  {
    icon: <MdSecurity />,
    title: "Quality First",
    description: "Every product passes strict quality checks before delivery."
  },
  {
    icon: <FaShippingFast />,
    title: "Fast Shipping",
    description: "We ship globally with secure, eco-friendly packaging."
  },
  {
    icon: <FaUserFriends />,
    title: "Customer Focused",
    description: "We’re here to help every step of the way."
  }
];

const process = [
  { icon: "🎨", title: "Design", description: "Inspired by Ethiopian culture and modern fashion." },
  { icon: "🧵", title: "Craft", description: "Handcrafted with precision by local artisans." },
  { icon: "✅", title: "Review", description: "We inspect every item for quality and durability." },
  { icon: "🚚", title: "Deliver", description: "We ship quickly and securely, worldwide." }
];

export default LearnMore;
