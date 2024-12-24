"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postCreate, postUpdate } from "../pages/api/page";

const initialState = {
  isLoading: false,
  userCommissionData: [],
};

export const fetchUserCommission = createAsyncThunk("fetchUserCommission", async () => {
  const data = await getRequest("/UserCommission/GetAllUserCommission");
  return data.data;
});

export const addUserCommission = createAsyncThunk("addUserCommission", async (data) => {
  const response = await postCreate("/UserCommission/addUserCommission", data);
  return response.data;
});

export const updateUserCommission = createAsyncThunk(
  "updateUserCommission",
  async (data) => {
    return await postUpdate("/UserCommission/updateUserCommission", data);
  }
);

export const deleteUserCommission = createAsyncThunk(
  "deleteUserCommission",
  async (userCommissionId) => {
    return await postUpdate("/UserCommission/deleteUserCommission", { userCommissionId });
  }
);

const UserCommissionSlice = createSlice({
  name: "userCommissionSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCommission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserCommission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userCommissionData = action.payload;
      })
      .addCase(fetchUserCommission.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addUserCommission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUserCommission.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.isLoading = false;
          state.userCommissionData = action.payload;
        }
      })
      .addCase(addUserCommission.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUserCommission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserCommission.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.isLoading = false;
          const { userCommissionId, userCommissionName } = action.meta.arg;
          state.userCommissionData = state.userCommissionData.map((item) =>
            item.userCommissionId === userCommissionId ? { userCommissionId, userCommissionName } : item
          );
        }
      })
      .addCase(updateUserCommission.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteUserCommission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserCommission.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.isLoading = false;
          const { userCommissionId } = action.meta.arg;
          state.userCommissionData = state.userCommissionData.filter(
            (item) => item.userCommissionId !== userCommissionId
          );
        }
      })
      .addCase(deleteUserCommission.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default UserCommissionSlice.reducer;
