import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosRequest } from "../../../api/axiosRequest";
import toast from "react-hot-toast";

export const getCart = createAsyncThunk(
  "/Cart/get-products-from-cart",
  async () => {
    try {
      const { data } = await axiosRequest.get("/Cart/get-products-from-cart");
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("not cart");
    }
  },
);
export const addToCart = createAsyncThunk(
  "/Cart/add-product-to-cart/",
  async ({ id }, { dispatch }) => {
    try {
      const { data } = await axiosRequest.post(`/Cart/add-product-to-cart/${id}`);
      dispatch(getCart());
      toast.success("Product successfully added to cart");
      return data;
    } catch (error) {
      toast.error("Please login to add to cart");
      console.error(error);
    }
  },
);


export const decreaseFromCart = createAsyncThunk(
  "/Cart/decrease-product-in-cart",
  async ({ id }, { dispatch }) => {
    try {
      const { data } = await axiosRequest.post(
        `/Cart/decrease-product-in-cart/${id}`,
      );
      dispatch(getCart());
      toast.success("Product successfully decreased from cart");
      return data;
    } catch (error) {
      console.error(error);
    }
  },
);

export const clearCart = createAsyncThunk(
  "/Cart/clear-cart",
  async (_, { dispatch }) => {
    try {
      const { data } = await axiosRequest.post(`/Cart/clear-cart`);
      dispatch(getCart());
      return data;
    } catch (error) {}
  },
);

export const deleteProductFromCart = createAsyncThunk(
  "/Cart/delete-product-from-cart",
  async ({ id }, { dispatch }) => {
    try {
      await axiosRequest.delete(`/Cart/delete-product-from-cart/${id}`);
      dispatch(getCart());
      toast.success("Product removed from cart");
      return id;
    } catch (error) {
      console.error(error);
      throw new Error("error.");
    }
  },
);

export const CartSlice = createSlice({
  name: "cart",
  initialState: { carts: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.carts = action.payload;
    });
  },
});

export default CartSlice.reducer;
