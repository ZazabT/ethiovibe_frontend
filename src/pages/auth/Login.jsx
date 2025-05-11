import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLock, FaGoogle, FaFacebook } from 'react-icons/fa'
import { PiEyeClosedThin, PiEyeThin } from "react-icons/pi";
import { login } from "../../redux/slices/auth.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ImSpinner2 } from "react-icons/im";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(login({ email, password }));
      toast.success('Welcome back!');
      navigate('/');

      // reset states
      setEmail('');
      setPassword('');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }

    // Reset form fields
    setEmail('');
    setPassword('');
  };
  return (
    <div className="min-h-screen flex my-10 bg-gradient-to-br from-pink-100 via-white to-white">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-4xl shadow-sm">
        <div className="text-center space-y-3">
            <h2 className="text-4xl font-bold text-gray-900 mb-2 yuji-font">Welcome Back!</h2>
            <p className="text-gray-600 exo-font">Experience the beauty of Ethiopian culture</p>
            <p className="text-sm text-gray-500">Your fashion journey continues here</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <div className="relative">
                <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Email address"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                {
                  showPassword ? (
                    <PiEyeThin
                      onClick={() => setShowPassword(false)}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"/>
                  ) : (
                    <PiEyeClosedThin
                      onClick={() => setShowPassword(true)}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"/>
                  )
                }
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Password"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-pink-400 rounded border-gray-300"
                />
                <label className="ml-2 text-sm text-gray-600">Remember me</label>
              </div>
              <Link to="/forgot-password" className="text-sm text-pink-400 hover:text-pink-600">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 ${
                isLoading 
                  ? 'bg-pink-300 cursor-not-allowed' 
                  : 'bg-pink-400 hover:bg-pink-600'
              } text-white transition-colors`}
            >
              {isLoading ? (
                <ImSpinner2 className="animate-spin" />
              ) : null}
              {isLoading ? 'Signing in...' : 'Sign in'}
            </motion.button>

            {/* Social Login */}
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

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-pink-500 hover:text-pink-700 font-medium">
                Sign up
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

export default Login