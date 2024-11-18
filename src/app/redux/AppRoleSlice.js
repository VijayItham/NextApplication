import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken, getUserDetails } from "../common/auth";

const initialState = {
  isLoading: false,
  appRoleData: [],
};

export const fetchAppRole = createAsyncThunk("fetchAppRole", async () => {
  const token = getToken();

  if (!token) {
    throw new Error("No token found");
  }
  const response = await axios.get(
    "https://devrechargeapi.codetrex.in/api/AppRole/getAllAppRole",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
});

export const addAppRole = createAsyncThunk("addAppRole", async (appRole) => {
  const token = getToken();
  const user = getUserDetails();
  if (!token) {
    throw new Error("No token found");
  }
  const data = {
    roleName: appRole,
    createdBy: user?.appUserId ?? null,
  };
  const response = await axios.post(
    "https://devrechargeapi.codetrex.in/api/AppRole/addAppRole",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
});

export const updateAppRole = createAsyncThunk("updateAppRole", async (data) => {
  const token = getToken();
  const user = getUserDetails();
  if (!token) {
    throw new Error("No token found");
  }
  const updateData = {
    ...data,
    updatedBy: user?.appUserId ?? null,
  };
  const response = await axios.post(
    `https://devrechargeapi.codetrex.in/api/AppRole/updateAppRole`,
    updateData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
});

export const deleteAppRole = createAsyncThunk("deleteAppRole", async (data) => {
  const token = getToken();
  const user = getUserDetails();
  if (!token) {
    throw new Error("No token found");
  }
  const deleteData = {
    appRoleId: data.appRoleId,
    updatedBy:  user?.appUserId ?? null,
  };
  const response = await axios.post(
    `https://devrechargeapi.codetrex.in/api/AppRole/deleteAppRole`,
    deleteData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
});

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
        (state.isLoading = false), (state.appRoleData = action.payload);
      })
      .addCase(fetchAppRole.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addAppRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAppRole.fulfilled, (state, action) => {
        if (action.payload.statusCode == 200) {
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
        if (action.payload.statusCode == 200) {
          state.isLoading = false;
          const { appRoleId, roleName } = action.meta.arg;
          const appRoleData = current(state.appRoleData);
          const updatedData = appRoleData.map((item) =>
            item.appRoleId === appRoleId ? { appRoleId, roleName } : item
          );
          state.appRoleData = updatedData;
        }
      })
      .addCase(updateAppRole.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAppRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAppRole.fulfilled, (state, action) => {
        if (action.payload.statusCode == 200) {
          state.isLoading = false;
          const { appRoleId, roleName } = action.meta.arg;
          const appRoleData = current(state.appRoleData);
          const filteredData = appRoleData.filter(
            (item) => item.appRoleId != appRoleId
          );
          state.appRoleData = filteredData;
        }
      })
      .addCase(deleteAppRole.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default AppRoleSlice.reducer;
