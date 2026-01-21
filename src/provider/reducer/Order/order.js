import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../../api/axiosRequest";
import toast from "react-hot-toast";

export const addOrder = createAsyncThunk("/order/add-order", async (order) => {
  const { data } = await axiosRequest.post("/order/add-order", order);
  toast.success(
    "Your order has been successfully completed. The site administrator will contact you shortly.",
  );
  return data;
});
