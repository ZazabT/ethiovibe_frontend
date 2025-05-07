import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Base url
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
// Retrieve users data and token from local storage if available
const user =localStorage.getItem("user") ?  JSON.parse(localStorage.getItem("user")) : null;
const token = localStorage.getItem("token")?  JSON.parse(localStorage.getItem("token")) : null;


// check if guestId is already in local storage and if not create one
const guestId = localStorage.getItem("guestId")?  JSON.parse(localStorage.getItem("guestId")) : `guest-${Date.now()}`;
// set guestId in local storage
localStorage.setItem("guestId", JSON.stringify(guestId));


// initial state
const initialState = {
    user: user,
    token: token,
    guestId: guestId,
    isError: null,
    isLoading: false,
}


// Async thunk for user registration
export const register = createAsyncThunk("auth/register", async (user , {rejectWithValue}) => { 
    try {
        const response =await axios.post(`${BASE_URL}/api/users/register`, user);
        // set user in local storage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response.data.user;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});


// Async thunk for user login
export const login = createAsyncThunk("auth/login", async (user, {rejectWithValue}) => {
    
    try {
        const response = await axios.post(`${BASE_URL}/api/users/login`, user);
        // set user and token in local storage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.accessToken)); 
        return response.data.user;
    }catch (error) {
        return rejectWithValue(error.response.data.message); 
    }
});


// slice
const authSlice = createSlice({
    name: "auth",
    initialState,  
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.guestId = `guest-${Date.now()}` // generate new guestId
            // remove user and token from local storage and set guestId in local storage
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.setItem("guestId", JSON.stringify(state.guestId));
        },

        generateGuestId : (state) => {
            state.guestId = `guest-${Date.now()}`;
            localStorage.setItem("guestId", JSON.stringify(state.guestId));
        }
    },

    extraReducers: (builder) => {
        
    // register
        builder.addCase(register.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.user = action.payload; 
            state.token = null
        });
        builder.addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
            state.user = null; 
        });

    // login
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
            state.isError = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = null;
            state.user = action.payload;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
            state.user = null;
        });
    }
});

export const { logout, generateGuestId } = authSlice.actions;
export default authSlice.reducer;