import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Get all products (with filters)
export const getAllProducts = createAsyncThunk(
    "product/getAllProducts",
    async (filters) => {
        const query = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) query.append(key, value);
        });
        const response = await axios.get(`${BASE_URL}/api/products?${query}`);
        return response.data.products;
    }
);

// Get product details
export const getProductDetails = createAsyncThunk(
    "product/getProductDetails",
    async (id) => {
        const response = await axios.get(`${BASE_URL}/api/products/${id}`);
        return response.data.product;
    }
);

// Get similar products
export const getSimilarProducts = createAsyncThunk(
    "product/getSimilarProducts",
    async (id) => {
        const response = await axios.get(`${BASE_URL}/api/products/similar/${id}`);
        return response.data.similarProducts;
    }
);

// Get best-selling products
export const getBestSelling = createAsyncThunk(
    "product/getBestSelling",
    async () => {
        const response = await axios.get(`${BASE_URL}/api/products/best-selling`);
        return response.data.bestSellingProduct;
    }
);

// Get new arrivals
export const getNewArrival = createAsyncThunk(
    "product/getNewArrival",
    async () => {
        const response = await axios.get(`${BASE_URL}/api/products/new-arrivals`);
        return response.data.newArrivalsProduct;
    }
);

// Get products from other categories
export const getProductOtherCategories = createAsyncThunk(
    "product/getProductOtherCategories",
    async () => {
        const response = await axios.get(`${BASE_URL}/api/products/other-products`);
        return response.data.otherProducts;
    }
);

// Initial state
const initialState = {
    products: [],
    selectedProduct: null,
    similarProducts: [],
    bestSelling: [],
    newArrival: [],
    productOtherCategories: [],
    isLoading: false,
    isError: null,
    filter: {
        collection: "",
        minPrice: "",
        maxPrice: "",
        size: "",
        category: "",
        gender: "",
        color: "",
        material: "",
        limit: "",
        sortBy: "",
    },
};

// Slice
const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filter = { ...state.filter, ...action.payload };
        },
        clearFilter: (state) => {
            Object.keys(state.filter).forEach((key) => {
                state.filter[key] = "";
            });
        },
    },
    extraReducers: (builder) => {
        const handlePending = (state) => {
            state.isLoading = true;
            state.isError = null;
        };
        const handleRejected = (state, action) => {
            state.isLoading = false;
            state.isError = action.error?.message || "Something went wrong";
        };

        builder
            .addCase(getAllProducts.pending, handlePending)
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.products = Array.isArray(action.payload) ? action.payload : [];
                state.isLoading = false;
            })
            .addCase(getAllProducts.rejected, handleRejected)

            .addCase(getProductDetails.pending, handlePending)
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.selectedProduct = action.payload;
                state.isLoading = false;
            })
            .addCase(getProductDetails.rejected, handleRejected)

            .addCase(getSimilarProducts.pending, handlePending)
            .addCase(getSimilarProducts.fulfilled, (state, action) => {
                state.similarProducts = Array.isArray(action.payload) ? action.payload : [];
                state.isLoading = false;
            })
            .addCase(getSimilarProducts.rejected, handleRejected)

            .addCase(getBestSelling.pending, handlePending)
            .addCase(getBestSelling.fulfilled, (state, action) => {
                state.bestSelling = Array.isArray(action.payload) ? action.payload : [];
                state.isLoading = false;
            })
            .addCase(getBestSelling.rejected, handleRejected)

            .addCase(getNewArrival.pending, handlePending)
            .addCase(getNewArrival.fulfilled, (state, action) => {
                state.newArrival = Array.isArray(action.payload) ? action.payload : [];
                state.isLoading = false;
            })
            .addCase(getNewArrival.rejected, handleRejected)

            .addCase(getProductOtherCategories.pending, handlePending)
            .addCase(getProductOtherCategories.fulfilled, (state, action) => {
                state.productOtherCategories = Array.isArray(action.payload) ? action.payload : [];
                state.isLoading = false;
            })
            .addCase(getProductOtherCategories.rejected, handleRejected);
    },
});

export const { setFilter, clearFilter } = productSlice.actions;
export default productSlice.reducer;
