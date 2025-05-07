import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL
const BASE_URL = import.meta.env.VITE_BACKEND_URL;


// Helper function to get cart items from local storage
const loadCartFromLocalStorage = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : { products: [], };
}


// Helper function to save cart ito local storage
const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
}


// Async thunk to fetch cart for a user or guest
export const fetchCart = createAsyncThunk("cart/fetchCart", async ({ userId, guestId }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/carts`,
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
export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, quantity, size, color, guestId, userId }, { rejectWithValue }) => {

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
});


// Async thunk to update the quantity of a product in the cart
export const updateCartQuantity = createAsyncThunk("cart/updateCartQuantity", async ({ productId, quantity, size, color, guestId, userId }, { rejectWithValue }) => {

    try {
        const response = await axios.put(`${BASE_URL}/api/carts`,
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
});


// Async thunk to remove a product from the cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({ productId, size, color, guestId, userId }, { rejectWithValue }) => {

    try {
        const response = await axios.delete(`${BASE_URL}/api/carts`,
            {
                productId,
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
});


// Async thunk to merge guest cart with user cart
export const mergeGuestCart = createAsyncThunk("cart/mergeGuestCart", async ({ guestId }, { rejectWithValue }) => {

    try {
        const response = await axios.post(`${BASE_URL}/api/carts/merge`,
            {
                guestId,
            },

            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }
        );

        return response.data.cart;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


// initial state
const initialState = {
    cart: loadCartFromLocalStorage(),
    isLoading: false,
    isError: null,
}

// Cart slice
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cart = { products: [], };
            saveCartToLocalStorage(state.cart);
        },
        clearCartError: (state) => {
            state.isError = null;
        },
    },

    extraReducers: (builder) => {
        // Fetch cart
        builder
            .addCase(fetchCart.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload;
                saveCartToLocalStorage(state.cart);
                state.isError = null;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message || 'Failed to fetch cart';
            })

            // Add to cart
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload;
                saveCartToLocalStorage(state.cart);
                state.isError = null;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message || 'Failed to add to cart';
            })

            // Update cart quantity
            .addCase(updateCartQuantity.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload;
                saveCartToLocalStorage(state.cart);
                state.isError = null;
            })
            .addCase(updateCartQuantity.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message || 'Failed to update cart quantity';
            })

            // Remove from cart
            .addCase(removeFromCart.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload;
                saveCartToLocalStorage(state.cart);
                state.isError = null;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message || 'Failed to remove from cart';
            })

            // Merge guest cart
            .addCase(mergeGuestCart.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(mergeGuestCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload;
                saveCartToLocalStorage(state.cart);
                state.isError = null;
            })
            .addCase(mergeGuestCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message || 'Failed to merge guest cart';
            })

    }
});

export const { clearCart , clearCartError } = cartSlice.actions;
export default cartSlice.reducer;