import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaFilter, FaTimes } from 'react-icons/fa';

const Filtersidebar = ({ onClose }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    category: '',
    gender: '',
    size: [],
    color: '',
    material: [],
    minPrice: 0,
    maxPrice: 10000,
  });

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 10000,
  });

  // Categories
  const categories = [
    { id: 1, name: 'topwear' },
    { id: 2, name: 'underwear' },
    { id: 3, name: 'shoes' },
    { id: 4, name: 'other' },
  ];

  // Genders
  const genders = [
    { id: 1, name: 'male' },
    { id: 2, name: 'female' },
    { id: 3, name: 'unisex' },
  ];

  // Brands
  const brands = [
    { id: 1, name: 'Nike' },
    { id: 2, name: 'Adidas' },
    { id: 3, name: 'Puma' },
    { id: 4, name: 'Reebok' },
    { id: 5, name: 'other' },
  ];

  // Sizes
  const sizes = [
    { id: 2, name: 'XS' },
    { id: 2, name: 'S' },
    { id: 3, name: 'M' },
    { id: 4, name: 'L' },
    { id: 5, name: 'XL' },
    { id: 6, name: 'XXL' },
    { id: 7, name: 'XXXL' },
  ];

  // Colors
  const colors = [
    { id: 1, name: 'Red', hex: '#FF4444' },
    { id: 2, name: 'Blue', hex: '#4444FF' },
    { id: 3, name: 'Green', hex: '#44FF44' },
    { id: 4, name: 'Yellow', hex: '#FFFF44' },
    { id: 5, name: 'Black', hex: '#000000' },
    { id: 6, name: 'White', hex: '#FFFFFF' },
    { id: 7, name: 'Brown', hex: '#964B00' },
    { id: 8, name: 'Gray', hex: '#808080' },
  ];

  // Materials
  const materials = [
    { id: 1, name: 'Cotton' },
    { id: 2, name: 'Polyester' },
    { id: 3, name: 'wool' },
    { id: 4, name: 'denim' },
    { id: 5, name: 'leather' },
    { id: 7, name: 'silk' },
    { id: 7, name: 'other' },
  ];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilter({
      category: params.category || '',
      gender: params.gender || '',
      size: params.size ? params.size.split(',') : [],
      color: params.color || '',
      material: params.material ? params.material.split(',') : [],
      minPrice: parseInt(params.minPrice) || 0,
      maxPrice: parseInt(params.maxPrice) || 10000,
    });
    setPriceRange({
      min: parseInt(params.minPrice) || 0,
      max: parseInt(params.maxPrice) || 10000,
    });
  }, [searchParams]);

  const updateParams = (newFilter) => {
    const params = new URLSearchParams();
    
    // Only add non-empty values to URL
    Object.entries(newFilter).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(','));
      } 
      else if (value && !Array.isArray(value)) {
        params.set(key, value);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  const handleFilterChange = (type, value) => {
    let newFilter = { ...filter };

    switch (type) {
      case 'price':
        newFilter.minPrice = value.min;
        newFilter.maxPrice = value.max;
        setPriceRange(value);
        break;
      case 'size':
      case 'material':
        const currentArray = newFilter[type];
        newFilter[type] = currentArray.includes(value)
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value];
        break;
      default:
        newFilter[type] = value;
    }

    setFilter(newFilter);
    updateParams(newFilter);
    console.log('Current Filters:', newFilter);
  };

  const handleClear = () => {
    const resetFilter = {
      category: '',
      gender: '',
      size: [],
      color: '',
      material: [],
      minPrice: 0,
      maxPrice: 10000,
    };
    setFilter(resetFilter);
    setPriceRange({ min: 0, max: 10000 });
    updateParams(resetFilter);
    console.log('Filters Reset:', resetFilter);
  };

  return (
    <div className="p-4 h-full">
      {/* Header */}
      <div className="flex items-center border border-gray-200 justify-between mb-5 bg-gray-100 p-4 rounded-xl">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <FaFilter className="text-pink-500" />
          Filters
        </h2>
        <button 
          onClick={handleClear} 
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-pink-500 hover:bg-white rounded-lg transition-all duration-300"
        >
          <FaTimes />
          Clear all
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-5 border border-gray-200 p-4 rounded-xl">
        <h3 className="text-sm font-medium mb-3 text-gray-700">Price Range</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">ETB {priceRange.min}</span>
            <span className="text-sm text-gray-600">ETB {priceRange.max}</span>
          </div>
          <div className="relative pt-1">
            <div className="h-2 bg-pink-200 rounded-lg"></div>
            <div
              className="absolute h-2 bg-pink-500 rounded-lg top-1"
              style={{
                left: `${(priceRange.min / 10000) * 100}%`,
                right: `${100 - (priceRange.max / 10000) * 100}%`
              }}
            ></div>
            <input
              type="range"
              min="0"
              max="10000"
              value={priceRange.min}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value <= priceRange.max) {
                  handleFilterChange('price', { ...priceRange, min: value });
                }
              }}
              className="absolute w-full h-0 -top-0 appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-md [&::-webkit-slider-thumb]:bg-pink-400 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
            />
            <input
              type="range"
              min="0"
              max="10000"
              value={priceRange.max}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= priceRange.min) {
                  handleFilterChange('price', { ...priceRange, max: value });
                }
              }}
              className="absolute w-full h-0 -top-0 appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-md [&::-webkit-slider-thumb]:bg-pink-400 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-5 border border-gray-200 p-4 rounded-xl">
        <h3 className="text-sm font-medium mb-3 text-gray-700">Sizes</h3>
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((size) => (
            <button
              key={size.id}
              name='size'
              value={size.name}
              onClick={() => handleFilterChange('size', size.name)}
              className={`w-full h-10 rounded-md flex items-center justify-center text-sm font-medium transition-colors ${
                filter.size.includes(size.name)
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="mb-5 border border-gray-200 p-4 rounded-xl">
      
        <h3 className="text-sm font-medium mb-3 text-gray-700">Categories</h3>
        <div className="space-y-1.5">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded-md">
              <input
                type="radio"
                name="category"
                value={category.name}
                checked={filter.category === category.name}
                onChange={() => handleFilterChange('category', category.name)}
                className="text-pink-500 focus:ring-pink-500 h-4 w-4"
              />
              <span className="text-sm text-gray-600">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div className="mb-5 border border-gray-200 p-4 rounded-xl">
        <h3 className="text-sm font-medium mb-3 text-gray-700">Gender</h3>
        <div className="grid grid-cols-3 gap-2">
          {genders.map((gender) => (
            <button
              key={gender.id}
              name="gender"
              value={gender.name}
              onClick={() => handleFilterChange('gender', gender.name)}
              className={`w-full px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filter.gender === gender.name
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {gender.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-5 border border-gray-200 p-4 rounded-xl">
        <h3 className="text-sm font-medium mb-3 text-gray-700">Sizes</h3>
        <div className="grid grid-cols-5 gap-2">
          {sizes.map((size) => (
            <button
              key={size.id}
              onClick={() => handleFilterChange('size', size.name)}
              className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-medium transition-colors ${
                filter.size.includes(size.name)
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="mb-5 border border-gray-200 p-4 rounded-xl">
        <h3 className="text-sm font-medium mb-3 text-gray-700">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => handleFilterChange('color', color.name)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${
                filter.color === color.name 
                  ? 'ring-2 ring-offset-2 ring-pink-500' 
                  : ''
              }`}
              style={{ 
                backgroundColor: color.hex,
                border: color.name === 'White' ? '1px solid #e5e7eb' : 'none'
              }}
              title={color.name}
            >
              {filter.color === color.name && (
                <span className={`text-${color.name === 'White' ? 'black' : 'white'} text-xs`}>
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Materials */}
      <div className="mb-5 border border-gray-200 p-4 rounded-xl">
        <h3 className="text-sm font-medium mb-3 text-gray-700">Materials</h3>
        <div className="flex flex-wrap gap-1.5">
          {materials.map((material) => (
            <button
              key={material.id}
              name="material"
              value={material.name}
              onClick={() => handleFilterChange('material', material.name)}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                filter.material.includes(material.name)
                  ? 'bg-pink-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {material.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filtersidebar;
