import { div } from 'framer-motion/client'
import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import newMen1 from '../../assets/newMen1.jpg'
import newMen2 from '../../assets/newMen2.jpg'
import newMen3 from '../../assets/newMen3.jpg'
const NewArrives = () => {
    const newArrives = [
        {
            _id: "na001",
            name: "Ethiopian Modern Dress",
            price: 129.99,
            image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95",
            altMessage: "Traditional Ethiopian dress with modern twist"
        },
        {
            _id: "na002",
            name: "Habesha Kemis",
            price: 189.99,
            image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1",
            altMessage: "Traditional Habesha Kemis dress"
        },
        {
            _id: "na003",
            name: "Modern Tilfi Suit",
            price: 249.99,
            image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f",
            altMessage: "Contemporary Ethiopian men's suit"
        },
        {
            _id: "na004",
            name: "Embroidered Shemma",
            price: 159.99,
            image: "https://images.unsplash.com/photo-1603487742131-4160ec999306",
            altMessage: "Hand-embroidered Ethiopian shemma"
        },
        {
            _id: "na005",
            name: "Ethiopian Blazer",
            price: 179.99,
            image: newMen1,
            altMessage: "Modern Ethiopian style blazer"
        },
        {
            _id: "na006",
            name: "Axum Collection Dress",
            price: 219.99,
            image: newMen2,
            altMessage: "Axum inspired modern dress"
        },
        {
            _id: "na007",
            name: "Lalibela Modern Set",
            price: 299.99,
            image: newMen3,
            altMessage: "Contemporary Lalibela inspired outfit"
        },
        {
            _id: "na008",
            name: "Gondar Evening Dress",
            price: 269.99,
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8",
            altMessage: "Elegant Gondar style evening dress"
        }
    ]
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
                <Slider {...settings}>
                    {newArrives.map(product => (
                        <div key={product._id} className="px-3">
                            <div className="group cursor-pointer">
                                <div className="relative overflow-hidden rounded-lg mb-4">
                                    <img 
                                        src={product.image} 
                                        alt={product.altMessage}
                                        className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <span className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                                        New
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium exo-font truncate">{product.name}</h3>
                                    <p className="text-pink-500 yuji-font">${product.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default NewArrives