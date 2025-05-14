import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Base URL
const BASE_URL = import.meta.env.VITE_BACKEND_URL;


// Async thunk to get all produscts

export const getAllProducts = createAsyncThunk('admin/product/getAllProducts', async ({ rejectWithValue }) => {

    try {
        const token = localStorage.getItem("token");

        if (!token) {
            return rejectWithValue("No token found.");
        }

        const response = axios.get(`${BASE_URL}/api/admin/products`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );

        return response.data.products;
    } catch (error) {
        // Log the error details for debugging
        console.error('Error fetching products:', error);

        // Optionally, you can use rejectWithValue to pass a custom error message
        return rejectWithValue(
            error.response?.data?.message || 'Failed to fetch products'
        );
    }
});


// Async thunk to create product

export const createProduct = createAsyncThunk('/admin/product/createProduct', async (product, { rejectWithValue }) => {

    try {
        const token = localStorage.getItem("token");

        if (!token) {
            return rejectWithValue("No token found.");
        }

        const response = await axios.post(`${BASE_URL}/api/products`, product,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );

        return response.data.product;

    } catch (error) {

        // Log the error details for debugging
        console.error('Error creating products:', error);

        // Optionally, you can use rejectWithValue to pass a custom error message
        return rejectWithValue(
            error.response?.data?.message || 'Failed to create products'
        );
    }
});


// Async thunk to update product

export const updateProduct = createAsyncThunk('/admin/product/updateProduct', async ({ id, product }, { rejectWithValue }) => {

    try {
        const token = localStorage.getItem("token");

        if (!token) {
            return rejectWithValue("No token found.");
        }

        const response = await axios.put(`${BASE_URL}/api/products${id}`, product,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );

        return response.data.product;

    } catch (error) {

        // Log the error details for debugging
        console.error('Error updating products:', error);

        // Optionally, you can use rejectWithValue to pass a custom error message
        return rejectWithValue(
            error.response?.data?.message || 'Failed to update products'
        );
    }
});


// Async thunk to delete product

export const deleteProduct = createAsyncThunk('/admin/product/deleteProduct', async ({ id, product }, { rejectWithValue }) => {

    try {
        const token = localStorage.getItem("token");

        if (!token) {
            return rejectWithValue("No token found.");
        }

        const response = await axios.post(`${BASE_URL}/api/products${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );

        return response.data;

    } catch (error) {

        // Log the error details for debugging
        console.error('Error deleting products:', error);

        // Optionally, you can use rejectWithValue to pass a custom error message
        return rejectWithValue(
            error.response?.data?.message || 'Failed to deleting products'
        );
    }
});


// initial state

const initialState = {
    products: [],
    isLoading: false,
    isError: null,
    totalProducts: 0,
}

// product slice

const adminProductSlice = createSlice({
    name: "adminProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
                state.totalProducts = action.payload.length;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload || action.error.message;
            })
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload || action.error.message;
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedProduct = action.payload;
                const index = state.products.findIndex((product) => product.id === updatedProduct.id);
                if (index !== -1) {
                    state.products[index] = updatedProduct;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload || action.error.message;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                const deletedProductId = action.payload.id;
                state.products = state.products.filter((product) => product.id !== deletedProductId);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload || action.error.message;
            })
    }
})



export default adminProductSlice.reducer; 