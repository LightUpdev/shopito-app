import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/Features/auth/authSlice";
import productReducer from "../Redux/Features/product/productSlice";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

export const store = configureStore(
  {
    reducer: {
      auth: authReducer,
      product: productReducer,
    },
  },
  applyMiddleware(thunk)
);
