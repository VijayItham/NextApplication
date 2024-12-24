"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postCreate, postUpdate } from "../pages/api/page";

const initialState = {
  isLoading: false,
  userWalletSummaryData: [],
};

export const fetchAllUserWalletSummary = createAsyncThunk(
  "fetchAllUserWalletSummary",
  async () => {
    const data = await getRequest("/UserWalletSummary/getAllUserWalletSummary");
    return data.data;
  }
);

export const addUserWalletSummary = createAsyncThunk(
  "addUserWalletSummary",
  async (data) => {
    return await postCreate("/UserWalletSummary/addUserWalletSummary", data);
  }
);

export const updateUserWalletSummary = createAsyncThunk(
  " updateUserWalletSummary",
  async (data) => {
    return await postUpdate("/UserWalletSummary/updateUserWalletSummary", data);
  }
);

export const deleteUserWalletSummary = createAsyncThunk(
  "deleteUserCommission",
  async (userWalletSummaryId) => {
    return await postUpdate("/UserWalletSummary/deleteUserWalletSummary", {
      userWalletSummaryId,
    });
  }
);

const UserCommissionSlice = createSlice({
  name: "userWalletSummarySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUserWalletSummary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUserWalletSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userWalletSummaryData = action.payload;
      })
      .addCase(fetchAllUserWalletSummary.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addUserWalletSummary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUserWalletSummary.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.isLoading = false;
          const { id, userWalletSummaryName } = action.payload.data;
          state.userWalletSummaryData.push({
            walletId: id,
            userWalletSummaryName,
          });
        }
      })
      .addCase(addUserWalletSummary.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUserWalletSummary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserWalletSummary.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.isLoading = false;
          const { id, appRoleId, roleName } = action.meta.arg;
          state.appRoleData = state.appRoleData.map((item) =>
            item.appRoleId === appRoleId ? { id, appRoleId, roleName } : item
          );
        }
      })
      .addCase(updateUserWalletSummary.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteUserWalletSummary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserWalletSummary.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.isLoading = false;
          const { userWalletSummaryId } = action.meta.arg;
          state.userWalletSummaryData = state.userWalletSummaryData.filter(
            (item) => item.userWalletSummaryId !== userWalletSummaryId
          );
        }
      })
      .addCase(deleteUserWalletSummary.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default UserCommissionSlice.reducer;
