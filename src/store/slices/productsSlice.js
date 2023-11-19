import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../thunks/fetchProducts";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  // using only extra reducers
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const productsReducer = productsSlice.reducer;
