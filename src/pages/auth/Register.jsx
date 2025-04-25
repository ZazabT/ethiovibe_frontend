import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLock, FaGoogle, FaFacebook, FaUser  } from 'react-icons/fa'
import { PiEyeClosedThin, PiEyeThin } from "react-icons/pi";
import { GiConfirmed } from "react-icons/gi";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle registration logic here
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-pink-100 via-white to-white">
      {/* Left Side - Registration Form */}
      <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-bold text-gray-900 mb-2 yuji-font">Begin Your Journey</h2>
            <p className="text-gray-600 exo-font">Discover authentic Ethiopian fashion and culture</p>
            <p className="text-sm text-gray-500">Join thousands of fashion enthusiasts in our community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div className="relative">
              <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Username"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-pink-400"
                placeholder="Email address"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-pink-400"
                placeholder="Password"
              />
              {showPassword ? (
                <PiEyeThin
                  onClick={() => setShowPassword(false)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                />
              ) : (
                <PiEyeClosedThin
                  onClick={() => setShowPassword(true)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                />
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <GiConfirmed className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:outline-none focus:ring-pink-400"
                placeholder="Confirm Password"
              />
              {showConfirmPassword ? (
                <PiEyeThin
                  onClick={() => setShowConfirmPassword(false)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                />
              ) : (
                <PiEyeClosedThin
                  onClick={() => setShowConfirmPassword(true)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                />
              )}
            </div>

            {/* Register Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full bg-pink-400 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors"
            >
              Create Account
            </motion.button>

            {/* Social Registration */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <FaGoogle className="text-red-400 mr-2" />
                  Google
                </button>
                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <FaFacebook className="text-blue-400 mr-2" />
                  Facebook
                </button>
              </div>
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-pink-500 hover:text-pink-700 font-medium">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 bg-cover bg-center overflow-hidden m-6" 
        style={{
          backgroundImage: `url('/hero1.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        <div className="h-full w-full bg-black/30 backdrop-blur-[2px] flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h2 className="text-5xl font-bold mb-4 yuji-font">EthioVibe</h2>
            <p className="text-xl exo-font">Join Our Ethiopian Fashion Community</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register