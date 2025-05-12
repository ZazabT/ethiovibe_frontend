import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Base URL
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Async thunk to get user orders
export const getUserOrders = createAsyncThunk(
    "order/getUserOrders",
    async (_, { rejectWithValue }) => {

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return rejectWithValue("No token found.");
            }
            const response = await axios.get(`${BASE_URL}/api/orders/my-order`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            return response.data.orders;
        } catch (error) {
            console.error('Error fetching order:', error);
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch order'
            );
        }
    });


// Async thunk to get order detail
export const getOrderDetail = createAsyncThunk(
    "order/getOrderDetail",
    async (orderId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return rejectWithValue("No token found.");
            }
            const response = await axios.get(`${BASE_URL}/api/orders/my-order/${orderId}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            return response.data.order;
        } catch (error) {
            console.error('Error fetching order detail:', error);
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch order detail'
            );
        }
    });


// initial state
const initialState = {
    orders: [],
    orderDetail: {},
    isLoading: false, 
    isError: null,
    totalOrder : 0
}

// Slice
const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers:{},

    extraReducers: (builder) =>{
        builder
        .addCase(getUserOrders.pending, (state) => {
            state.isLoading = true;
            state.isError = null;
        })
        .addCase(getUserOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            const orders = Array.isArray(action.payload) ? action.payload : [];
            state.orders = orders;
            state.totalOrder = orders.length;
            state.isError = null;
        })
        .addCase(getUserOrders.rejected , (state , action)=>{
            state.isLoading = false;
            state.isError = action.payload.message;
        })
        .addCase(getOrderDetail.pending, (state) => {
            state.isLoading = true;
            state.isError = null; 
        })
       .addCase(getOrderDetail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderDetail = action.payload;
            state.isError = null;
        }).
        addCase(getOrderDetail.rejected , (state , action) =>{
            state.isLoading = false;
            state.isError = action.payload.message;
        })
    }
})


export const { } = orderSlice.actions;
export default orderSlice.reducer;