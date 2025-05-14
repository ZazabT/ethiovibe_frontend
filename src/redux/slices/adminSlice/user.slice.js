import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Base URL
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Async thunc to fetch all users
export const getAllUsers = ('admin/user/getAllUsers', async ({ rejectWithValue }) => {

    try {
        const token = localStorage.getItem("token");

        if (!token) {
            return rejectWithValue("No token found.");
        }

        const response = await axios.get(`${BASE_URL}/api/admin/users` , 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response.data.users
    } catch (error) {
        // Log the error details for debugging
        console.error('Error fetching user:', error);

        // Optionally, you can use rejectWithValue to pass a custom error message
        return rejectWithValue(
            error.response?.data?.message || 'Failed to fetch users'
        );
    }
});


// Async thunc to create user
export const createUser = ('admin/user/createUser', async ( user ,{ rejectWithValue }) => {

    try {
        const token = localStorage.getItem("token");

        if (!token) {
            return rejectWithValue("No token found.");
        }

        const response = await axios.post(`${BASE_URL}/api/admin/users` , user ,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response.data.user
    } catch (error) {
        // Log the error details for debugging
        console.error('Error creating user:', error);

        // Optionally, you can use rejectWithValue to pass a custom error message
        return rejectWithValue(
            error.response?.data?.message || 'Failed to create user'
        );
    }
});


// Async thunc to  \\update user
export const updateUser = ('admin/user/updateUser', async ( {id , user} ,{ rejectWithValue }) => {

    try {
        const token = localStorage.getItem("token");

        if (!token) {
            return rejectWithValue("No token found.");
        }

        const response = await axios.put(`${BASE_URL}/api/admin/users/${id}` , user ,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response.data.user
    } catch (error) {
        // Log the error details for debugging
        console.error('Error Updating user:', error);

        // Optionally, you can use rejectWithValue to pass a custom error message
        return rejectWithValue(
            error.response?.data?.message || 'Failed to update user'
        );
    }
});



// Async thunc to delete user
export const deleteUser = ('admin/user/deleteUser', async ( id ,{ rejectWithValue }) => {

    try {
        const token = localStorage.getItem("token");

        if (!token) {
            return rejectWithValue("No token found.");
        }

        const response = await axios.delete(`${BASE_URL}/api/admin/users/${id}` ,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );
        return response.data.user;
    } catch (error) {
        // Log the error details for debugging
        console.error('Error Deleting user:', error);

        // Optionally, you can use rejectWithValue to pass a custom error message
        return rejectWithValue(
            error.response?.data?.message || 'Failed to delete user'
        );
    }
});


// initial state
const initialState = {
    users: [],
    totalUser : 0,
    isLoading: false,
    isError: null,
}

// user slice

const userSclice = createSlice({

    name: 'user',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        // get users
        builder.
        addCase(getAllUsers.pending , (state) => {
            state.isLoading = true;
            state.isError = null
        }).
        addCase(getAllUsers.fulfilled , ( state , action ) => {
            state.isLoading = false;
            state.isError = null;
            state.users = action.payload;
            state.totalUser = action.payload.length;
        }).
        addCase(getAllUsers.rejected , (state , action) => {
            state.isLoading = false;
            state.isError = action.error.message;
        }).
        // create user

        addCase(createUser.pending , (state) => {
            state.isLoading = true;
            state.isError = null
        }).
        addCase(createUser.fulfilled , ( state , action ) => {
            state.isLoading = false;
            state.isError = null;
            state.users.push(action.payload.user);
        }).
        addCase(createUser.rejected , (state , action) => {
            state.isLoading = false;
            state.isError = action.error.message;
        }).

        // update user

        addCase(updateUser.pending , (state) => {
            state.isLoading = true;
            state.isError = null
        }).
        addCase(updateUser.fulfilled , ( state , action ) => {
            state.isLoading = false;
            state.isError = null;
            const updatedUser = action.payload;
            const index = state.users.findIndex((user) => user._id === updatedUser._id);
            if (index !== -1) {
                state.users[index] = updatedUser;
            }
        }).
        addCase(updateUser.rejected , (state , action) => {
            state.isLoading = false;
            state.isError = action.error.message;
        }).

        // delete user

        addCase(deleteUser.pending , (state) => {
            state.isLoading = true;
            state.isError = null
        }).
        addCase(deleteUser.fulfilled , ( state , action ) => {
            state.isLoading = false;
            state.isError = null;
            const deletedUserId = action.payload._id;
            state.users = state.users.filter((user) => user._id !== deletedUserId);
        }).
        addCase(deleteUser.rejected , (state , action) => {
            state.isLoading = false;
            state.isError = action.error.message;
        });
    }
});


export default userSclice.reducer;