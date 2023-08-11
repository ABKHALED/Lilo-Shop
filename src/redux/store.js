import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import itemReducer from "./products";
import cartReducer from "./CartSlice";
import orderSlice from "./orderSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemReducer,
    cart: cartReducer,
    order: orderSlice,
  },
});
