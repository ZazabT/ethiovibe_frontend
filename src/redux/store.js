import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import productReducer from "./slices/product.slice";
// congigure store
const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
    },
});



export default store;