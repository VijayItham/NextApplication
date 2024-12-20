"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postCreate, postUpdate } from "../pages/api/page";

const initialState = {
  isLoading: false,
  operatorTypeData: [],
};

export const fetchOperatorType = createAsyncThunk("fetchOperatorType", async () => {
  const data = await getRequest("/OperatorType/getAllOperatorType");
  return data.data;
});

export const addOperatorType = createAsyncThunk("addOperatorType", async (operatorTypeName) => {
  return await postCreate("/OperatorType/addOperatorType", {operatorTypeName});
});

export const updateOperatorType = createAsyncThunk(
  "updateOperatorType",
  async (operatorType) => {
    return await postUpdate("/OperatorType/updateOperatorType", operatorType);
  }
);

export const deleteOperatorType = createAsyncThunk(
  "deleteOperatorType",
  async (operatorTypeId) => {
    return await postUpdate("/OperatorType/deleteOperatorType", operatorTypeId);
  }
);

const OperatorTypeSlice = createSlice({
  name: "operatorTypeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOperatorType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOperatorType.fulfilled, (state, action) => {
        state.isLoading = false;
        state.operatorTypeData = action.payload;
      })
      .addCase(fetchOperatorType.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addOperatorType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addOperatorType.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.isLoading = false;
          const { id, operatorTypeName } = action.payload.data;
          state.operatorTypeData.push({ operatorTypeId: id, operatorTypeName });
        }
      })
      .addCase(addOperatorType.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateOperatorType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOperatorType.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.isLoading = false;
          const {id, operatorTypeId, operatorTypeName } = action.meta.arg;
          state.operatorTypeData = state.operatorTypeData.map((item) =>
            item.operatorTypeId === operatorTypeId ? { id, operatorTypeId, operatorTypeName } : item
          );
        }
      })
      .addCase(updateOperatorType.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteOperatorType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOperatorType.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.isLoading = false;
          const { operatorTypeId } = action.meta.arg;
          state.operatorTypeData = state.operatorTypeData.filter(
            (item) => item.operatorTypeId !== operatorTypeId
          );
        }
      })
      .addCase(deleteOperatorType.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default OperatorTypeSlice.reducer;
