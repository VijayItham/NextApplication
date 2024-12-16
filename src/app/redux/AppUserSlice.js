"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRequest,
  postSetup,
  postUpdate,
  postRequest,
  postReq
} from "../pages/api/page";

import { doLogin, doLogout, getToken,} from "../pages/api/authCookies";

const initialState = {
  isLoading: false,
  addAppUserData :[],
  appUserData: [],
  dashboardData:[],
  userDetail: {},
  menu: [],
};

export const onLogout = () => async (dispatch) => {
  doLogout();
  dispatch(logout());
};

export const fetchUserLogin = createAsyncThunk(
  "fetchUserLogin",
  async (userDetail) => {
    return await postRequest("/Authentication/loginUser", userDetail);
  }
);

export const verifyPin = createAsyncThunk("verifyPin", async (pin) => {
  const data = { pin, token: getToken() };
  return await postRequest("/Authentication/verifyPin", data);
});

export const updatePin = createAsyncThunk("updatePin", async (pin) => {
  const data = { pin, token: getToken() };
  return await postRequest("/Authentication/updatePin", data);
});

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (username) => {
    return await postRequest("/Authentication/getOTP", {username});
  }
);

export const verifyOtp = createAsyncThunk(
  "verifyOtp",
  async ({ username, otp }) => {
    return await postRequest("/Authentication/verifyOTP", {
      username,
      otp,
    });
  }
);

export const updatePassword = createAsyncThunk(
  "updatePassword",
  async ({ username, password }) => {
    return await postRequest("/Authentication/updatePassword", {
      username,
      password,
    });
  }
);

export const getMenuByUserRole = createAsyncThunk(
  "getMenuByUserRole",
  async (data) => {
    return await postReq("/Menu/getMenuByUserRole", data );
  }
);

export const getDashboard = createAsyncThunk(
  "getDashboard",
  async (username) => {
    return await  getRequest(`/Dashboard/getDashboard/${username}`);
  }
);


export const fetchAppUser = createAsyncThunk("fetchAppUser", async () => {
  const response = await getRequest("/AppUser/getAllAppUser");
  return response.data;
});

export const addAppUser = createAsyncThunk("addAppUser", async (finalFormData) => {
  return await postSetup("/AppUser/addAppUser", finalFormData);
});

export const updateAppUser = createAsyncThunk("updateAppUser", async (data) => {
  return await postUpdate("/AppUser/updateAppUser", data);
});

export const deleteAppUser = createAsyncThunk(
  "deleteAppUser",
  async (appUserId) => {
    return await postUpdate("/AppUser/deleteAppUser", {
      appUserId,
    });
  }
);

const AppUserSlice = createSlice({
  name: "appUserSlice",
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAppUser.fulfilled, (state, action) => {
        state.isLoading = false, 
        state.appUserData = action.payload
      })
      .addCase(fetchAppUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addAppUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAppUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addAppUserData = action.payload;
      })
      .addCase(addAppUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateAppUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAppUser.fulfilled, (state, action) => {
        if (action.payload.statusCode == 200) {
          state.isLoading = false;
        }
      })
      .addCase(updateAppUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteAppUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAppUser.fulfilled, (state, action) => {
        if (action.payload.statusCode == 200) {
          state.isLoading = false;
        }
      })
      .addCase(deleteAppUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUserLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        const loginDetail = action?.payload?.loginDetails ?? {};
        if (loginDetail.statusCode == 200) {
          doLogin(loginDetail.data[0], action.payload.token);
          state.userDetail = loginDetail.data[0];
          state.token = action.payload.token;
        }
        state.isLoading = false;
      })
      .addCase(fetchUserLogin.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyPin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyPin.fulfilled, (state, action) => {
        const userDetails = action?.payload?.userDetails ?? {};
        if (userDetails.statusCode == 200) {
          doLogin(userDetails.data[0], action.payload.token);
          state.userDetail = userDetails.data[0];
          state.token = action.payload.token;
        }
        state.isLoading = false;
      })

      .addCase(verifyPin.rejected, (state) => {
        state.isLoading = false;
        state.pinVerificationSuccess = false;
      })
      .addCase(updatePin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePin.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePin.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        if (action.payload.statusCode == 200) {
          state.isLoading = false;
          state.otpSent = true;
        }
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.isLoading = false;
        state.otpSent = false;
      })

      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        const response = action.payload;
        if (response?.statusCode === 200) {
          state.userDetail = response.data;
        }
      })
      .addCase(verifyOtp.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updatePassword.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(getDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardData = action.payload;
      })
      .addCase(getDashboard.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getMenuByUserRole.pending, (state) => {
        state.isLoadingoading = true;
      })
      .addCase(getMenuByUserRole.fulfilled, (state, action) => {
        state.isLoadingoading = false;
        state.menu = action.payload;
      })
      .addCase(getMenuByUserRole.rejected, (state) => {
        state.isLoading = false;
      })

  },
});

export const { logout } = AppUserSlice.actions;

export default AppUserSlice.reducer;
