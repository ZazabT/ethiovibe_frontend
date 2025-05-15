import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL 
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Async thunk to fetch all orders
export const getAllOrders = createAsyncThunk('admin/order/getAllOrders', async ( _ ,{ rejectWithValue }) => {

    console.log('Fetching orders...');
    try {

        const token = localStorage.getItem("token");

        if (!token) {
            return rejectWithValue("No token found.");
        }

        const response = await axios.get(`${BASE_URL}/api/admin/orders`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data.orders;
    } catch (error) {
        // Log the error details for debugging
        console.error('Error gettng orders:', error);

        // Optionally, you can use rejectWithValue to pass a custom error message
        return rejectWithValue(
            error.response?.data?.message ||
            error.response?.data?.msg ||
            'Failed to delete order'
        );
    }
});


// Async thunk to update order
export const updateOrder = createAsyncThunk('admin/order/updateOrder', async ({ id, deliveryStatus }, { rejectWithValue }) => {

    try {

        const token = localStorage.getItem("token");

        if (!token) {
            return rejectWithValue("No token found.");
        }

        const response = await axios.put(`${BASE_URL}/api/admin/orders/${id}`, { deliveryStatus },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data.order;
    } catch (error) {
        // Log the error details for debugging
        console.error('Error updating orders:', error);

        // Optionally, you can use rejectWithValue to pass a custom error message
        return rejectWithValue(
            error.response?.data?.message ||
            error.response?.data?.msg ||
            'Failed to delete order'
        );
    }
});


// Async thunk to delete order
export const deleteOrder = createAsyncThunk('admin/order/deleteOrder', async (id, { rejectWithValue }) => {

    try {

        const token = localStorage.getItem("token");

        if (!token) {
            return rejectWithValue("No token found.");
        }

      const response =  await axios.delete(`${BASE_URL}/api/admin/orders/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        return response.data.order;
    } catch (error) {
        // Log the error details for debugging
        console.error('Error updating orders:', error);

        // Optionally, you can use rejectWithValue to pass a custom error message
        return rejectWithValue(
            error.response?.data?.message ||
            error.response?.data?.msg ||
            'Failed to delete order'
        );
    }
});


// initial state
const initialState = {
    orders: [],
    totalOrders: 0,
    totalSells: 0,
    isLoading: false,
    isError: null,
}

// create slice
const adminOrderSlice = createSlice({
    name: 'adminOrder',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get all orders
            .addCase(getAllOrders.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                state.orders = action.payload;
                state.totalOrders = action.payload.length;
                state.totalSells = action.payload.reduce((acc, order) => acc + order.totalPrice, 0);
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload || action.error.message;
            })
            // update order
            .addCase(updateOrder.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                const updatedOrder = action.payload;
                const index = state.orders.findIndex(order => order._id === updatedOrder._id);
                if (index !== -1) {
                    state.orders[index] = updatedOrder;
                }
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload || action.error.message;
            })
            // Delete order
            .addCase(deleteOrder.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                const deletedOrderId = action.payload._id;
                state.orders = state.orders.filter(order => order._id !== deletedOrderId);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload || action.error.message;
            })
    }
})


export default adminOrderSlice.reducer;