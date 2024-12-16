"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postCreate } from "../pages/api/page";

const initialState = {
  isLoading: false,
  rechargeData:null,
};

export const addRecharge = createAsyncThunk("addRecharge", async (data) => {
  return await postCreate("/Recharge/mobileRecharge", data);
});


const RechargeSlice = createSlice({
  name: "rechargeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(addRecharge.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(addRecharge.fulfilled, (state, action) => {
        state.rechargeData=action.payload;
    })
    .addCase(addRecharge.rejected, (state) => {
      state.isLoading = false;
    })
  }
});

export default RechargeSlice.reducer;
