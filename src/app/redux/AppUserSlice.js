import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRequest,
  postCreate,
  postUpdate,
  postRequest
} from "../api/page";

import { doLogin, doLogout, getToken } from "../api/auth";

const initialState = {
  isLoading: false,
  appUserData: [],
  userDetail: {},
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

export const fetchAppUser = createAsyncThunk("fetchAppUser", async () => {
  const data = await getRequest("/AppUser/getAllAppUser");
  return data.data;
});

export const addAppUser = createAsyncThunk("addAppUser", async (userData) => {
  const data = {
    ...userData,
    aadharImageBack: "",
    address2: "",
    middleName: "",
    panImage: "",
  };
  return await postCreate("/AppUser/addAppUser", data);
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
    logout: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAppUser.fulfilled, (state, action) => {
        (state.isLoading = false), (state.appUserData = action.payload);
      })
      .addCase(fetchAppUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addAppUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAppUser.fulfilled, (state, action) => {
        if (action.payload.statusCode == 200) {
          state.isLoading = false;
        }
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

      .addCase(verifyPin.rejected, (state, action) => {
        state.isLoading = false;
        state.pinVerificationSuccess = false;
      })
      .addCase(updatePin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePin.fulfilled, (state, action) => {
        state.isLoading = false;
        const response = action.payload;
        if (response.userDetails?.statusCode === 200) {
          console.log("Pin updated successfully:", response.message);
        }
      })
      .addCase(updatePin.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        if (action.payload.statusCode == 200) {
          doLogin({ userName: action.meta.arg }, action.payload.token);
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
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        const response = action.payload;
      })
      .addCase(updatePassword.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { logout } = AppUserSlice.actions;

export default AppUserSlice.reducer;
