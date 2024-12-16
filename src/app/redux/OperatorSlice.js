"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postCreate, postUpdate } from "../pages/api/page";

const initialState = {
  isLoading: false,
  operatorData: [],
};

export const fetchOperator = createAsyncThunk("fetchOperator", async () => {
  const data = await getRequest("/Operator/getAllOperator");
  return data.data;
});

export const addOperator = createAsyncThunk("addOperator", async (data) => {
  return await postCreate("/Operator/addOperator", data);
});

export const updateOperator = createAsyncThunk(
  "updateOperator",
  async (data) => {
    return await postUpdate("/Operator/updateOperator", data);
  }
);

export const deleteOperator = createAsyncThunk(
  "deleteOperator",
  async (operatorId) => {
    return await postUpdate("/Operator/deleteOperator", {operatorId});
  }
);

const OperatorSlice = createSlice({
  name: "operatorSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOperator.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOperator.fulfilled, (state, action) => {
        state.isLoading = false;
        state.operatorData = action.payload;
      })
      .addCase(fetchOperator.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addOperator.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addOperator.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.isLoading = false;
          const { id, operatorName } = action.payload.data;
          state.operatorData.push({ operatorId: id, operatorName });
        }
      })
      .addCase(addOperator.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateOperator.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOperator.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.isLoading = false;
          const { operatorId, operatorName } = action.meta.arg;
          state.operatorData = state.operatorData.map((item) =>
            item.operatorId === operatorId ? { operatorId, operatorName } : item
          );
        }
      })
      .addCase(updateOperator.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteOperator.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOperator.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.isLoading = false;
          const { operatorId } = action.meta.arg;
          state.operatorData = state.operatorData.filter(
            (item) => item.operatorId !== operatorId
          );
        }
      })
      .addCase(deleteOperator.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default OperatorSlice.reducer;
