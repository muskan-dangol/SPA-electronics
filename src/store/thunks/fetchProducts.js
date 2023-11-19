import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await axios.get('https://dummyjson.com/products');

  return response.data; 
  // data is automatically assigned to the payload property of the fulfilled action type
});



export {fetchProducts};


//three properties are automatically added to the fetchProducts variable
//fetchProducts.pending === products/fetch/pending
// fetchProducts.fulfilled === products/fetch/fulfilled 
// fetchProducts.rejected === products/fetch/rejected
