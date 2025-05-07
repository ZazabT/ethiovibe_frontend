import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL from env
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Load from localStorage
const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;
const guestId = localStorage.getItem("guestId")
  ? JSON.parse(localStorage.getItem("guestId"))
  : `guest-${Date.now()}`;

// Always set guestId in localStorage (if new)
localStorage.setItem("guestId", JSON.stringify(guestId));

// Initial state
const initialState = {
  user,
  token,
  guestId,
  isError: null,
  isLoading: false,
};

// Register thunk
export const register = createAsyncThunk(
  "auth/register",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/users/register`, user);
      // Save user to localStorage (no token expected)
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Login thunk
export const login = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/users/login`, user);
      // Save user and token to localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.accessToken));
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.guestId = `guest-${Date.now()}`;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.setItem("guestId", JSON.stringify(state.guestId));
    },
    generateGuestId: (state) => {
      state.guestId = `guest-${Date.now()}`;
      localStorage.setItem("guestId", JSON.stringify(state.guestId));
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isError = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = action.payload;
      });

    // Login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isError = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isError = action.payload;
      });
  },
});

export const { logout, generateGuestId } = authSlice.actions;
export default authSlice.reducer;
