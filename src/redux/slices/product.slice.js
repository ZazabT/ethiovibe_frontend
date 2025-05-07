import { createSlice  , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Base url
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Async thunk to get all products with collection filter
export const getAllProducts = createAsyncThunk("product/getAllProducts" , async(
    {
        collection,
        minPrice,
        maxPrice,
        size,
        category,
        gender,
        color,
        material,
        limit,
    }
) => {
    const query = new URLSearchParams();
    if (collection) query.append("collection", collection); 
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (size) query.append("size", size);
    if (category) query.append("category", category);
    if (gender) query.append("gender", gender);
    if (color) query.append("color", color);
    if (material) query.append("material", material);
    if (limit) query.append("limit", limit);

    const response = await axios.get(`${BASE_URL}/api/products?${query.toString()}`);

    return response.data;
});


// Async thunk to get single product details
export const getProcuctDetails = createAsyncThunk("product/getProductDetails", async (id) => {
    const response =await axios.get(`${BASE_URL}/api/products/${id}`);
    return response.data;
});


// Async thunk to get similar products
export const getSimilarProducts = createAsyncThunk("product/getSimilarProducts" , async(id) =>{
    const response = await axios.get(`${BASE_URL}/api/products/similar/${id}`);
    return response.data;
});


// Async thunk to best selling products
export const getBestSelling = createAsyncThunk("product/getBestSelling" , async() =>{
    const response = await axios.get(`${BASE_URL}/api/products/best-selling`);
    return response.data;
});


// Async thunk to get new arrival products
export const getNewArrival = createAsyncThunk("product/getNewArrival", async() =>{
    const response = await axios.get(`${BASE_URL}/api/products/new-arrivals`);
    return response.data;
});

// Async thunk get product other categories
export const getProductOtherCategories = createAsyncThunk("product/getProductOtherCategories", async() =>{
    const response = await axios.get(`${BASE_URL}/api/products/other-products/`);
    return response.data;
});