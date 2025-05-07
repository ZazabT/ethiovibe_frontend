import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
// congigure store
const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});



export default store;