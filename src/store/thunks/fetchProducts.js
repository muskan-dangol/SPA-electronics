import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await axios.get('https://dummyjson.com/products');
  // await pause(1000); //DEV ONLY
  return response.data.products; 
  // data is automatically assigned to the payload property of the fulfilled action type

});

//DEV ONLY
// const pause = (duration) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, duration);
//   });
// };


export {fetchProducts};



