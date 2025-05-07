import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Base url
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Async thunk to get all products with collection filter
export const getAllProducts = createAsyncThunk("product/getAllProducts", async (
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
    const response = await axios.get(`${BASE_URL}/api/products/${id}`);
    return response.data;
});


// Async thunk to get similar products
export const getSimilarProducts = createAsyncThunk("product/getSimilarProducts", async (id) => {
    const response = await axios.get(`${BASE_URL}/api/products/similar/${id}`);
    return response.data;
});


// Async thunk to best selling products
export const getBestSelling = createAsyncThunk("product/getBestSelling", async () => {
    const response = await axios.get(`${BASE_URL}/api/products/best-selling`);
    return response.data;
});


// Async thunk to get new arrival products
export const getNewArrival = createAsyncThunk("product/getNewArrival", async () => {
    const response = await axios.get(`${BASE_URL}/api/products/new-arrivals`);
    return response.data;
});

// Async thunk get product other categories
export const getProductOtherCategories = createAsyncThunk("product/getProductOtherCategories", async () => {
    const response = await axios.get(`${BASE_URL}/api/products/other-products/`);
    return response.data;
});

// Async thunk to update product

// initial state
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
        collection: '',
        minPrice: '',
        maxPrice: '',
        size: '',
        category: '',
        gender: '',
        color: '',
        material: '',
        limit: '',
        sortBy: '',
    },
}

// slice
const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filter = { ...state.filter, ...action.payload };
        },

        clearFilter: (state) => {
            state.filter = {
                collection: '',
                minPrice: '',
                maxPrice: '',
                size: '',
                category: '',
                gender: '',
                color: '',
                material: '',
                limit: '',
                sortBy: '',
            }
        },


    },

    extraReducers: (builder) => {
        // get all products
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.products = Array.isArray(action.payload) ? action.payload : [];
                state.isLoading = false;
                state.isError = null;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message;
            })

        // get single product details
        builder
            .addCase(getProcuctDetails.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getProcuctDetails.fulfilled, (state, action) => {
                state.selectedProduct = action.payload;
                state.isLoading = false;
                state.isError = null;
            })
            .addCase(getProcuctDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message;
            })

        // get similar products
        builder
            .addCase(getSimilarProducts.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getSimilarProducts.fulfilled, (state, action) => {
                state.similarProducts = Array.isArray(action.payload) ? action.payload : [];
                state.isLoading = false;
                state.isError = null;
            })
            .addCase(getSimilarProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message;
            })

        // get best selling products
        builder
            .addCase(getBestSelling.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getBestSelling.fulfilled, (state, action) => {
                state.bestSelling = action.payload;
                state.isLoading = false;
                state.isError = null;
            })
            .addCase(getBestSelling.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message;
            })

        // get new arrival products
        builder
            .addCase(getNewArrival.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getNewArrival.fulfilled, (state, action) => {
                state.newArrival = Array.isArray(action.payload) ? action.payload : [];
                state.isLoading = false;
                state.isError = null;
            })
            .addCase(getNewArrival.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message;
            })

        // get product other categories
        builder
            .addCase(getProductOtherCategories.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getProductOtherCategories.fulfilled, (state, action) => {
                state.productOtherCategories = Array.isArray(action.payload) ? action.payload : [];
                state.isLoading = false;
                state.isError = null;
            })
            .addCase(getProductOtherCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message;
            })


    }
})


export const { setFilter, clearFilter } = productSlice.actions;
export default productSlice.reducer;