import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../../api/axiosRequest";

export const getProductsById = createAsyncThunk("/product/get-product-by-id",async (id)=>{
    try {
         const token = localStorage.getItem("token"); 
         const { data } = await axiosRequest.get(`/product/get-product-by-id/${id}`, {
           headers: token ? { Authorization: `Bearer ${token}` } : {}
         });
      return data;
    } catch (error) {
        console.error(error)
        throw new Error("error")
    }
});

const productByIdSlice = createSlice({
  name: "productById",
  initialState: { selectedProduct: null },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProductsById.fulfilled, (state, action) => {
      state.selectedProduct = action.payload;
    });
  }
});

export default productByIdSlice.reducer;
