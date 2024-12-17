"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postCreate, postUpdate } from "../pages/api/page";

const initialState = {
  isLoading: false,
  operatorCommissionData: [],
};

export const fetchOperatorCommission = createAsyncThunk("fetchOperatorCommission", async () => {
  const data = await getRequest("/OperatorCommission/getAllOperatorCommission");
  return data.data;
});

export const addOperatorCommission = createAsyncThunk("addOperatorCommission", async (data) => {
  return await postCreate("/OperatorCommission/addOperatorCommission", data);
});

export const updateOperatorCommission = createAsyncThunk(
  "updateOperatorCommission",
  async (data) => {
    return await postUpdate("/OperatorCommission/updateOperatorCommission", data);
  }
);

export const deleteOperatorCommission = createAsyncThunk(
  "deleteOperatorCommission",
  async (operatorCommissionId) => {
    return await postUpdate("/OperatorCommission/deleteOperatorCommission", {operatorCommissionId});
  }
);

const OperatorCommissionSlice = createSlice({
  name: "operatorCommissionSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOperatorCommission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOperatorCommission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.operatorCommissionData = action.payload;
      })
      .addCase(fetchOperatorCommission.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addOperatorCommission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addOperatorCommission.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.isLoading = false;
          const { id, operatorCommissionName } = action.payload.data;
          state.operatorCommissionData.push({ operatorCommissionId: id, operatorCommissionName });
        }
      })
      .addCase(addOperatorCommission.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateOperatorCommission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOperatorCommission.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.isLoading = false;
          const { operatorCommissionId, operatorCommissionName } = action.meta.arg;
          state.operatorCommissionData = state.operatorCommissionData.map((item) =>
            item.operatorCommissionId === operatorCommissionId ? { operatorCommissionId, operatorCommissionName } : item
          );
        }
      })
      .addCase(updateOperatorCommission.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteOperatorCommission.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOperatorCommission.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.isLoading = false;
          const { operatorCommissionId } = action.meta.arg;
          state.operatorCommissionData = state.operatorCommissionData.filter(
            (item) => item.operatorCommissionId !== operatorCommissionId
          );
        }
      })
      .addCase(deleteOperatorCommission.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default OperatorCommissionSlice.reducer;
