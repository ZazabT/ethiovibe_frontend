import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

// Base URL
const BASE_URL = import.meta.env.VITE_BACKEND_URL;


// Helper function to get cart items from local storage
const loadCartFromLocalStorage = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : { products: [],};
}


// Helper function to save cart ito local storage
const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
}


// Async thunk to fetch cart for a user or guest
export const fetchCart = createAsyncThunk("cart/fetchCart" , async ({userId , guestId} , { rejectWithValue }) =>{
    try {
        const response = await axios.get(`${BASE_URL}/api/carts` , 
            {
                params: {
                    userId,
                    guestId,
                },
            }
        );
        return response.data.cart;
    } catch (error) {
       return rejectWithValue(error.response.data);
    }
});


// Async thunk to add a product to the cart
export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, quantity, size, color, guestId, userId}, { rejectWithValue }) => {
    
    try {
        const response = await axios.post(`${BASE_URL}/api/carts`,
            {
                productId,
                quantity,
                size,
                color,
                guestId,
                userId,
            }
        );

        return response.data.cart;
    } catch (error) {
       return rejectWithValue(error.response.data); 
    }
})