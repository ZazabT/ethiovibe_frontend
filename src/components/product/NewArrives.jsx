import {useEffect , useState} from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import {useDispatch , useSelector} from 'react-redux'
import { getNewArrival } from '../../redux/slices/product.slice'
import ProductCard from '../product/ProductCard'
import { ImSpinner2 } from "react-icons/im";
import { BiCommentError } from "react-icons/bi";

const ProductSkeleton = () => (
    <div className="px-2">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Skeleton height={192} /> 
            <div className="p-4 space-y-3">
                <Skeleton width="75%" height={16} />
                <Skeleton width="50%" height={16} />
                <Skeleton width="25%" height={24} />
            </div>
        </div>
    </div>
);
const NewArrives = () => {
    const {newArrival, isLoading, isError} = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const NextArrow = ({ onClick }) => (
        <button
            onClick={onClick}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-pink-500 hover:text-white transition-all"
        >
            <FaChevronRight size={20} />
        </button>
    )

    const PrevArrow = ({ onClick }) => (
        <button
            onClick={onClick}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-pink-500 hover:text-white transition-all"
        >
            <FaChevronLeft size={20} />
        </button>
    )

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    }


    // Fetch newArrival
    useEffect(() => {
       dispatch(getNewArrival());
    }, [dispatch])

    return (
        <div className="container mx-auto px-4 py-16">
            {/* Header  */}
            <div className="text-center mb-12">
                <h2 className="md:text-4xl text-xl yuji-font font-semibold mb-4">New Arrivals</h2>
                <div className="flex items-center justify-center gap-4">
                    <span className="w-10 h-[2px] bg-pink-500"/>
                    <p className=" md:text-xl text-sm text-gray-600">Discover Our Latest Collection</p>
                    <span className="w-10 h-[2px] bg-pink-500"/>
                </div>
            </div>

            <div className="relative px-10">
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <ImSpinner2 className="animate-spin text-pink-500 text-5xl" />
                    </div>
                ) : isError ? (
                    <div className="text-center py-16 rounded-lg">
                        <p className="text-red-500 font-medium text-lg">{isError ||"Something went wrong. Please try again later."}</p>
                    </div>
                ): !newArrival ? (
                    <Slider {...settings}>
                        {[1,2,3,4].map((item) => (
                            <ProductSkeleton key={item} />
                        ))}
                    </Slider>
                ) : newArrival.length === 0 ? (
                    <div className="text-center py-12 max-w-2xl mx-auto rounded-4xl border border-gray-100 shadow-md overflow-hidden">
                        <div className="relative flex flex-col items-center justify-center gap-5 px-4">
                            <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center shadow-inner border border-pink-100 transform transition-all duration-500 hover:scale-110">
                                <BiCommentError className="text-pink-500 text-3xl" />
                            </div>
                            <h3 className="text-gray-800 font-semibold text-2xl yuji-font">No new arrivals yet</h3>
                            <p className="text-gray-600 max-w-md leading-relaxed">We're working on adding exciting new products to our collection. Check back soon for fresh Ethiopian treasures!</p>
                            <div className="mt-4 flex space-x-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-pink-300 animate-pulse"></span>
                                <span className="inline-block w-2 h-2 rounded-full bg-pink-400 animate-pulse delay-100"></span>
                                <span className="inline-block w-2 h-2 rounded-full bg-pink-500 animate-pulse delay-200"></span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Slider {...settings}>
                        {newArrival.map(product => (
                            <div key={product._id} className="px-2">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </Slider>
                )}
            </div>
        </div>
    )
}

export default NewArrives