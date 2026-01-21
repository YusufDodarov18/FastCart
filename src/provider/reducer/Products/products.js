import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosRequest} from "../../../api/axiosRequest"

export const getProducts=createAsyncThunk('/product/get-products',async()=>{
    try {
        const {data}=await axiosRequest.get("/product/get-products")
        return data
    } catch (error) {
        console.error(error)
        throw new Error("Product not defined")
    }
})

export const Products=createSlice({
    name:"products",
    initialState:{products:[]},
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(getProducts.fulfilled,(state,action)=>{
            state.products=action.payload
        })
    }
})

export default Products.reducer