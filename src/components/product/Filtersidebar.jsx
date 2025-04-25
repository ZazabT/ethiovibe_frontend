import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { FaFilter, FaTimes } from 'react-icons/fa';

const Filtersidebar = ({ onClose }) => {
  const [searchParams] = useSearchParams();

  const [filter, setFilter] = useState({
    category: '',
    gender: '',
    brand: [],
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
    { id: 1, name: 'Tops' },
    { id: 2, name: 'Bottoms' },
    { id: 3, name: 'Shoes' },
    { id: 4, name: 'other' },
    { id: 5, name: 'Kids' },
  ];

  // Genders
  const genders = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Men' },
    { id: 3, name: 'Women' },
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
    { id: 1, name: 'S' },
    { id: 2, name: 'M' },
    { id: 3, name: 'L' },
    { id: 4, name: 'XL' },
    { id: 5, name: 'XXL' },
    { id: 6, name: 'XXXL' },
  ];

  // Colors
  // Update the colors array with specific color values
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
    { id: 3, name: 'Silk' },
    { id: 4, name: 'other' },
  ];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilter({
      category: params.category || '',
      gender: params.gender || '',
      brand: params.brand ? params.brand.split(',') : [],
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

  return (
    <div className="  bg-white p-6">
      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-medium mb-4">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange({ ...priceRange, min: e.target.value })
              }
              className="w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              placeholder="Min"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: e.target.value })
              }
              className="w-24 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="font-medium mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={filter.category === category.name}
                onChange={() => setFilter({ ...filter, category: category.name })}
                className="text-pink-500 focus:ring-pink-500"
              />
              <span className="text-gray-700">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div className="mb-6">
        <h3 className="font-medium mb-4">Gender</h3>
        <div className="flex gap-2">
          {genders.map((gender) => (
            <button
              key={gender.id}
              onClick={() => setFilter({ ...filter, gender: gender.name })}
              className={`px-4 py-2 rounded-lg ${
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
      <div className="mb-6">
        <h3 className="font-medium mb-4">Sizes</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size.id}
              onClick={() => {
                const newSizes = filter.size.includes(size.name)
                  ? filter.size.filter((s) => s !== size.name)
                  : [...filter.size, size.name];
                setFilter({ ...filter, size: newSizes });
              }}
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
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

      {/* Colors Section */}
      <div className="mb-6">
        <h3 className="font-medium mb-4">Colors</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => setFilter({ ...filter, color: color.name })}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
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
                <span className={`text-${color.name === 'White' ? 'black' : 'white'}`}>
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Materials */}
      <div className="mb-6">
        <h3 className="font-medium mb-4">Materials</h3>
        <div className="flex flex-wrap gap-2">
          {materials.map((material) => (
            <button
              key={material.id}
              onClick={() => {
                const newMaterials = filter.material.includes(material.name)
                  ? filter.material.filter(m => m !== material.name)
                  : [...filter.material, material.name];
                setFilter({ ...filter, material: newMaterials });
              }}
              className={`px-4 py-2 rounded-lg ${
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

      {/* Reset and Apply Buttons */}
      <div className="flex gap-3 mt-8">
        <button
          onClick={() => {
            setFilter({
              category: '',
              gender: '',
              brand: [],
              size: [],
              color: '',
              material: [],
              minPrice: 0,
              maxPrice: 10000,
            });
            setPriceRange({ min: 0, max: 10000 });
          }}
          className="flex-1 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Reset All
        </button>
        <button
          onClick={() => {
            // Apply filters logic here
            onClose?.();
          }}
          className="flex-1 bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filtersidebar;
