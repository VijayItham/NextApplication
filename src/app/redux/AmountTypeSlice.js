"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest } from "../api/page";

const initialState = {
  isLoading: false,
  amountTypeData: [],
};

export const fetchAmountType = createAsyncThunk("fetchAmountType", async () => {
  const data = await getRequest("/AmountType/getAllAmountType");
  console.log('data', data)
  return data.data;
});

const AmountTypeSlice = createSlice({
  name: "amountTypeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAmountType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAmountType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.amountTypeData = action.payload;
      })
      .addCase(fetchAmountType.rejected, (state) => {
        state.isLoading = false;
      })
  }
});

export default AmountTypeSlice.reducer;
