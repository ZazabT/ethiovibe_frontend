import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import productReducer from "./slices/product.slice";
import cartReducer from "./slices/cart.slice";
import checkOutReducer from './slices/checkout.slice'
import orderReducer from './slices/order.slice'
import subscribeReducer from './slices/subscribe.slice'
// congigure store
const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        cart: cartReducer,
        checkOut: checkOutReducer,
        order:orderReducer,
        subscribe:subscribeReducer
    },
});



export default store;