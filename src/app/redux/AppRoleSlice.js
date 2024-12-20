"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postCreate, postUpdate } from "../pages/api/page";

const initialState = {
  isLoading: false,
  appRoleData: [],
};

export const fetchAppRole = createAsyncThunk("fetchAppRole", async () => {
  const data = await getRequest("/AppRole/getAllAppRole");
  return data.data;
});

export const addAppRole = createAsyncThunk("addAppRole", async (roleName) => {
  return await postCreate("/AppRole/addAppRole", {roleName});
});

export const updateAppRole = createAsyncThunk(
  "updateAppRole",
  async (appRole) => {
    return await postUpdate("/AppRole/updateAppRole", appRole);
  }
);

export const deleteAppRole = createAsyncThunk(
  "deleteAppRole",
  async (appRoleId) => {
    return await postUpdate("/AppRole/deleteAppRole", appRoleId);
  }
);

const AppRoleSlice = createSlice({
  name: "appRoleSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAppRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.appRoleData = action.payload;
      })
      .addCase(fetchAppRole.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addAppRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAppRole.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.isLoading = false;
          const { id, roleName } = action.payload.data;
          state.appRoleData.push({ appRoleId: id, roleName });
        }
      })
      .addCase(addAppRole.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateAppRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAppRole.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.isLoading = false;
          const {id, appRoleId, roleName } = action.meta.arg;
          state.appRoleData = state.appRoleData.map((item) =>
            item.appRoleId === appRoleId ? { id, appRoleId, roleName } : item
          );
        }
      })
      .addCase(updateAppRole.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAppRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAppRole.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.isLoading = false;
          const { appRoleId } = action.meta.arg;
          state.appRoleData = state.appRoleData.filter(
            (item) => item.appRoleId !== appRoleId
          );
        }
      })
      .addCase(deleteAppRole.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default AppRoleSlice.reducer;
