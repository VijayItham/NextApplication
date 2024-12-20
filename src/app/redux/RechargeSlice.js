"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postCreate, getRequest } from "../pages/api/page";

const initialState = {
  isLoading: false,
  rechargeData:null,
  getLatestRechargeData:[]
};

export const addRecharge = createAsyncThunk("addRecharge", async (data) => {
  return await postCreate("/Recharge/mobileRecharge", data);
});

export const getLatestRecharge = createAsyncThunk("getLatestRecharge", async(username)=>{
  return  await getRequest(`/Recharge/getLatestRecharge/${username}`)
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
        state.isLoading = false;
    })
    .addCase(addRecharge.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(getLatestRecharge.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getLatestRecharge.fulfilled, (state, action) => {
        state.getLatestRechargeData=action.payload;
        state.isLoading = false;
    })
    .addCase(getLatestRecharge.rejected, (state) => {
      state.isLoading = false;
    })
  }
});

export default RechargeSlice.reducer;
