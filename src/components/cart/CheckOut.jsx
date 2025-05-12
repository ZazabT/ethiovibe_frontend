import { useEffect, useState } from "react";
import { FaShoppingBag, FaCreditCard, FaLock } from "react-icons/fa";
import PayPalButton from "./PayPalButton";
import ChapaButton from "./ChapaButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ImSpinner2 } from "react-icons/im";
import axios from "axios";
import { createCheckout } from '../../redux/slices/checkout.slice';
import { toast } from "sonner";
import { clearCart } from '../../redux/slices/cart.slice';

const CheckOut = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const { cart, isLoading, isError } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

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
        paymentMethod: 'paypal',
    });

    const [checkedOutId, setCheckedOutId] = useState(() => {
        return localStorage.getItem('checkoutId') || null;
    });

    useEffect(() => {
        // Only redirect to home if there's no checkout ID and cart is empty
        if (!checkedOutId && (!cart || !cart.products || cart.products.length === 0)) {
            navigate('/');
        }
    }, [cart, navigate, checkedOutId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSuccess = async (paymentResult) => {
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `${BASE_URL}/api/checkouts/${checkedOutId}/pay`,
                {
                    paymentStatus: 'paid',
                    paymentDetail: paymentResult,
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            await handleFinalize(checkedOutId);
        } catch (error) {
            console.error("Payment Error →", error);
            toast.error(`${formData.paymentMethod} payment failed. Please try again.`);
            setSubmitError(error.message || 'Payment processing failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFinalize = async (checkoutId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${BASE_URL}/api/checkouts/${checkoutId}/finalize`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            // Clear cart and checkout ID after successful order
            dispatch(clearCart());
            localStorage.removeItem('checkoutId');
            
            // Navigate to order confirmation page
            navigate('/order-confirmation');
            toast.success('Order placed successfully!');
        } catch (error) {
            toast.error('Failed to finalize order. Please contact support.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        if (cart && cart.products && cart.products.length > 0) {
            try {
                const { firstName, lastName, email, phone, address, city, state, country, postalCode, paymentMethod } = formData;
                const totalPrice = cart.totalPrice;

                const response = await dispatch(
                    createCheckout({
                        checkoutItems: cart.products,
                        firstName,
                        lastName,
                        email,
                        phone,
                        streetAddress: address,
                        city,
                        state,
                        country,
                        postalCode,
                        paymentMethod,
                        totalPrice
                    })
                ).unwrap();

                if (response && response._id) {
                    setCheckedOutId(response._id);
                    localStorage.setItem('checkoutId', response._id);
                } else {
                    throw new Error('Failed to get checkout ID');
                }
            } catch (error) {
                console.error("Checkout Submit Error →", error);
                setSubmitError(error.message || 'Failed to create checkout');
                toast.error('Failed to create checkout. Please try again.');
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setIsSubmitting(false);
            toast.error('Your cart is empty');
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ImSpinner2 className="animate-spin text-pink-500 text-4xl" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center text-red-500 py-8">
                {isError}
            </div>
        );
    }

    return (
        <div className='max-w-5xl mx-auto px-4 py-8 my-10'>
            <div className="flex flex-col-reverse lg:flex-row gap-8">
                {/* Left Side - Form */}
                <div className="flex-1 p-6">
                    <div className="pb-6 mb-8 border-b border-gray-100">
                        <h2 className="text-3xl font-semibold flex items-center gap-3 text-gray-800">
                            <FaShoppingBag className="text-pink-500" />
                            Checkout
                        </h2>
                        <p className="text-gray-500 mt-2">Complete your purchase by providing your shipping details</p>
                    </div>

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
                                            <option value="Ethiopia">Ethiopia</option>
                                            <option value="Kenya">Kenya</option>
                                            <option value="Eritrea">Eritrea</option>
                                            <option value="Djibouti">Djibouti</option>
                                            <option value="Somalia">Somalia</option>
                                            <option value="Sudan">Sudan</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {!checkedOutId ? (
                            <>
                                <div className="space-y-6">
                                    <h3 className="text-lg font-medium text-gray-700">Select Payment Method</h3>
                                    <div className="flex items-center gap-4">
                                        <label className={`flex-1 py-3 px-4 rounded-xl border cursor-pointer ${formData.paymentMethod === 'paypal'
                                                ? 'border-pink-500 bg-pink-50 text-pink-500'
                                                : 'border-gray-200 hover:border-pink-200'
                                            }`}>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="paypal"
                                                checked={formData.paymentMethod === 'paypal'}
                                                onChange={handleInputChange}
                                                className="hidden"
                                            />
                                            PayPal
                                        </label>
                                        <label className={`flex-1 py-3 px-4 rounded-xl border cursor-pointer ${formData.paymentMethod === 'chapa'
                                                ? 'border-lime-500 bg-lime-50 text-lime-600'
                                                : 'border-gray-200 hover:border-lime-200'
                                            }`}>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="chapa"
                                                checked={formData.paymentMethod === 'chapa'}
                                                onChange={handleInputChange}
                                                className="hidden"
                                            />
                                            Chapa
                                        </label>
                                    </div>
                                </div>

                                {submitError && <div className="text-red-500 text-sm">{submitError}</div>}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full mt-6 bg-pink-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-pink-600 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                        }`}
                                >
                                    {isSubmitting ? <ImSpinner2 className="animate-spin text-white" /> : <FaLock />}
                                    {isSubmitting ? 'Processing...' : 'Place Order'}
                                </button>
                            </>
                        ) : (
                            <div className="space-y-6 mt-4">
                                {formData.paymentMethod === 'paypal' ? (
                                    <PayPalButton
                                        amount={cart.totalPrice}
                                        onSuccess={handleSuccess}
                                        onError={(err) => {
                                            console.error("PayPal error →", err);
                                            toast.error("PayPal payment failed. Please try again.");
                                        }}
                                    />
                                ) : (
                                    <ChapaButton
                                        amount={cart.totalPrice}
                                        email={formData.email}
                                        firstName={formData.firstName}
                                        lastName={formData.lastName}
                                        txRef={`ethiovibe-${Date.now()}`}
                                    />
                                )}
                            </div>
                        )}
                    </form>
                </div>

                {/* Right Side - Summary */}
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
                                    <p className="font-medium">br{parseFloat(product.price * product.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4 space-y-3">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>br{parseFloat(cart.totalPrice).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg">
                            <span className="text-green-500">Total</span>
                            <span className="text-green-500">br{parseFloat(cart.totalPrice).toFixed(2)}</span>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 text-center mt-4">
                        Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
