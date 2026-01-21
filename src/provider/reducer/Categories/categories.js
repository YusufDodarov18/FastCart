import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosRequest } from "../../../api/axiosRequest";

export const getCategories=createAsyncThunk('/Category/get-category',async()=>{
    try {
        const {data}=await axiosRequest.get(`/Category/get-category`)
        return data.categories
    } catch (error) {
        console.error(error)
        throw new Error("Error Categories")
    }
})

export const Categories=createSlice({
    name:"categories",
    initialState:{categories:[]},
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(getCategories.fulfilled,(state,action)=>{
            state.categories=action.payload
        })
    }
})
export default Categories.reducer