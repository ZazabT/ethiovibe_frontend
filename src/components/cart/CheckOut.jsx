import { h1 } from "framer-motion/client"
import { useState } from "react"
import { FaShoppingBag, FaCreditCard, FaLock } from "react-icons/fa"
import PayPalButton from "./PayPalButton"
import { useNavigate } from "react-router-dom"

const CheckOut = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
    })

    const [checkedOutId , setCheckedOutId]  = useState(null)

    const cart = {
        products: [
            {
                name: "Product 1",
                size: "S",
                price: 20,
                quantity: 2,
                color: "Red",
                image: "/hero1.png"
            },
            {
                name: "Product 2",
                size: "XL",
                price: 40,
                quantity: 1,
                color: "blue",
                image: "/hero1.png"
            }
        ],
        totalPrice: 60,
        totalQuantity: 3
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSuccess = (paymentResult) => {
        console.log(paymentResult);
        navigate("/order-confirmation")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setCheckedOutId(123);
        // You can add form validation here
    }

    return (
        <div className='max-w-5xl mx-auto px-4 py-8 my-10'>
            <div className="flex flex-col-reverse lg:flex-row gap-8">
                {/* Left Side - Shipping Address Form */}
                <div className="flex-1 p-6">
                    {/* Header */}
                    <div className="pb-6 mb-8 border-b border-gray-100">
                        <h2 className="text-3xl font-semibold flex items-center gap-3 text-gray-800">
                            <FaShoppingBag className="text-pink-500" />
                            Checkout
                        </h2>
                        <p className="text-gray-500 mt-2">Complete your purchase by providing your shipping details</p>
                    </div>

                    {/* Shipping Form */}
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Name Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-medium text-gray-700">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 outline-none hover:border-pink-200"
                                        placeholder="John"
                                    />
                                </div>
                               
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 outline-none hover:border-pink-200"
                                        placeholder="Doe"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Contact Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-medium text-gray-700">Contact Details</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 outline-none hover:border-pink-200"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">+251</span>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full pl-16 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 outline-none hover:border-pink-200"
                                            placeholder="912345678"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-medium text-gray-700">Shipping Address</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 outline-none hover:border-pink-200"
                                        placeholder="Enter your street address"
                                    />
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 outline-none hover:border-pink-200"
                                            placeholder="Addis Ababa"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Region/State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 outline-none hover:border-pink-200"
                                            placeholder="Oromia"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 outline-none hover:border-pink-200"
                                            placeholder="1000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 outline-none hover:border-pink-200 bg-white"
                                        >
                                            <option value="">Select Country</option>
                                            <option value="ET">Ethiopia</option>
                                            <option value="KE">Kenya</option>
                                            <option value="ER">Eritrea</option>
                                            <option value="DJ">Djibouti</option>
                                            <option value="SO">Somalia</option>
                                            <option value="SD">Sudan</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                     {/* submit button  */}

                     
                    {/* Place Order Button */}
                    {
                    !checkedOutId ? (
                        <button type="submit" className="w-full mt-6 bg-pink-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-pink-600 transition-colors">
                        <FaLock />
                        Place Order
                    </button> 
                    ) : (
                        // paypal componenet
                        <PayPalButton amount = {cart.totalPrice} onSuccess = {handleSuccess} onError={(err) => alert("Paymenet faild ! try again " + err)}/>
                    )
                    }
                    </form>
                </div>

                {/* Right Side - Order Summary */}
                <div className="lg:w-[380px] p-6">
                    <div className="border-b pb-4 mb-6">
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                            <FaCreditCard className="text-pink-500" />
                            Order Summary
                        </h3>
                    </div>

                    <div className="space-y-4 mb-6">
                        {cart.products.map((product, index) => (
                            <div key={index} className="flex gap-4">
                                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                                <div>
                                    <h4 className="font-medium">{product.name}</h4>
                                    <p className="text-sm text-gray-600">Size: {product.size} | Color: {product.color}</p>
                                    <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                                    <p className="font-medium">${product.price * product.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4 space-y-3">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>${cart.totalPrice}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg">
                            <span className="text-green-500">Total</span>
                            <span className="text-green-500">${cart.totalPrice}</span>
                        </div>
                    </div>

                  

                    <p className="text-sm text-gray-500 text-center mt-4">
                        Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CheckOut