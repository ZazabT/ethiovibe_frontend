import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Base URL
const BASE_URL = import.meta.env.VITE_BACKEND_URL;


// Asunc thunk to get all subscribers
export const getAllSubscribers = createAsyncThunk(
    "subscriber/getAllSubscribers",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return rejectWithValue("No token found.");
            }
            const response = await axios.get(`${BASE_URL}/api/subscribers`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            // Return the data
            return response.data.subscribers;
        } catch (error) {
            // Log the error details for debugging
            console.error('Error fetching subscribers:', error);
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch subscribers')
        }
    }

);


// Async thunk to delete a subscriber
export const deleteSubscriber = createAsyncThunk(
    "subscriber/deleteSubscriber",
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return rejectWithValue("No token found.");
            } 
            const response = await axios.delete(`${BASE_URL}/api/subscribers/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                } 
            );
            // Return the data
            return response.data.subscriber;
        }catch (error) {
            // Log the error details for debugging
            console.error('Error deleting subscriber:', error);
            return rejectWithValue(error.response?.data?.msg || 'Failed to delete subscriber')
        }
    } 
)


// initial state
const initialState = {
    subscribers : [],
    totalSubscriber:0,
    isLoading: false,
    isError: null,
}

// create slice
const subscriberSlice = createSlice({
    name: "subscriber",
    initialState,  
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getAllSubscribers.pending , (state)=>{
            state.isError = null;
            state.isLoading = true;
        }).addCase(getAllSubscribers.fulfilled , (state ,action)=>{
            state.isLoading = false;
            state.isError = null;
            state.subscribers = action.payload;
            state.totalSubscriber = action.payload.length;
        }).addCase(getAllSubscribers.rejected , (state , action)=>{
            state.isError = action.error.message;
            state.isLoading = false;
        }).addCase(deleteSubscriber.pending, (state)=>{
            state.isError = null;
            state.isLoading = true; 
        }).addCase(deleteSubscriber.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = null;
            state.subscribers = state.subscribers.filter((subscriber)=> subscriber._id !== action.payload._id);
            state.totalSubscriber = state.subscribers.length;
        }).addCase(deleteSubscriber.rejected, (state, action)=>{
            state.isError = action.error.message;
            state.isLoading = false; 
        })
    }
})



export default subscriberSlice.reducer;