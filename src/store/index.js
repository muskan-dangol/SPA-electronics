//central export point

import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export * from './thunks/fetchProducts';