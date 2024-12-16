"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postCreate, postUpdate } from "../pages/api/page";

const initialState = {
  isLoading: false,
  fundRequestData: [],
};

export const fetchFundRequest = createAsyncThunk("fetchFundRequest", async () => {
  const data = await getRequest("/FundRequest/getAllFundRequest");
  return data.data;
});

export const addFundRequest = createAsyncThunk("addFundRequest", async (fundRequestData) => {
  return await postCreate("/FundRequest/addFundRequest", fundRequestData);
});

export const updateFundRequest = createAsyncThunk(
  "updateFundRequest",
  async (fundRequestData) => {
    return await postUpdate("/FundRequest/updateFundRequest", fundRequestData);
  }
);

export const updateFundRequestByAdmin = createAsyncThunk(
  "updateFundRequestByAdmin",
  async (fundRequestDataByAdmin) => {
    return await postUpdate("/FundRequest/updateFundRequestByAdmin", fundRequestDataByAdmin);
  }
);

export const deleteFundRequest = createAsyncThunk(
  "deleteFundRequest",
  async (fundRequestId) => {
    return await postUpdate("/FundRequest/deleteFundRequest", {fundRequestId});
  }
);

const FundRequestSlice = createSlice({
  name: "appRoleSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFundRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFundRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fundRequestData = action.payload;
      })
      .addCase(fetchFundRequest.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addFundRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFundRequest.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.isLoading = false;
        }
      })
      .addCase(addFundRequest.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateFundRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFundRequest.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.isLoading = false;
        }
      })
      .addCase(updateFundRequest.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateFundRequestByAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFundRequestByAdmin.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.isLoading = false;
        }
      })
      .addCase(updateFundRequestByAdmin.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteFundRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFundRequest.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.isLoading = false;
        }
      })
      .addCase(deleteFundRequest.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default FundRequestSlice.reducer;
