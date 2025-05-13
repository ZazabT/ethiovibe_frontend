import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL
const BASE_URL = import.meta.env.VITE_BACKEND_URL;


// Async thunk to create checkout

export const createCheckout = createAsyncThunk("checkout/createCheckout", async ({ checkoutItems, firstName, lastName, email, phone, streetAddress, city, country, postalCode, paymentMethod, totalPrice }, { rejectWithValue }) => {

    const token = localStorage.getItem("token");
    if (!token) {
        return rejectWithValue("No token found.");
    }
    try {
        const response = await axios.post(`${BASE_URL}/api/checkouts`,
            {
                checkoutItems, firstName, lastName, email, phone, streetAddress, city, country, postalCode, paymentMethod, totalPrice
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

        return response.data.checkout;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


// slice

const checkoutSlice = createSlice({

    name: 'checkout',
    initialState: {
        checkout: {},
        isLoading: false,
        isError: null,
    },
    

    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(createCheckout.pending, (state) => {
            state.isLoading = true;
            state.isError = null;
        }).
            addCase(createCheckout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = null;
                state.checkout = action.payload;
            }).
            addCase(createCheckout.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message || 'Failed to create checkout';
            })
    }

});



export default checkoutSlice.reducer;