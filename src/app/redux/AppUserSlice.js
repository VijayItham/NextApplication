import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getRequest,
  postRequest,
  postCreate,
  postUpdate,
  postLoginRequest,
  verifyPinRequest,
  updatePinRequest,
  forgotPasswordRequest,
  verifyOtpRequest,
  updatePasswordRequest,
} from "../api/page";

import { doLogin, doLogout } from "../api/auth";

const initialState = {
  isLoading: false,
  appUserData: [],
  userDetail: {},
  dashboardData:[],
  menu: [],
};

export const onLogout = () => async (dispatch) => {
  doLogout();
  dispatch(logout());
};

export const fetchUserLogin = createAsyncThunk(
  "fetchUserLogin",
  async (userDetail) => {
    return await postLoginRequest("/Authentication/loginUser", userDetail);
  }
);

export const verifyPin = createAsyncThunk("verifyPin", async (pin) => {
  return await verifyPinRequest("/Authentication/verifyPin", pin);
});

export const updatePin = createAsyncThunk("updatePin", async (pin) => {
  return await updatePinRequest("/Authentication/updatePin", pin);
});

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (username) => {
    return await forgotPasswordRequest("/Authentication/getOTP", username);
  }
);

export const verifyOtp = createAsyncThunk(
  "verifyOtp",
  async ({ username, otp }) => {
    return await verifyOtpRequest("/Authentication/verifyOTP", {
      username,
      otp,
    });
  }
);

export const updatePassword = createAsyncThunk(
  "updatePassword",
  async ({ username, password }) => {
    return await updatePasswordRequest("/Authentication/updatePassword", {
      username,
      password,
    });
  }
);

export const getMenuByUserRole = createAsyncThunk(
  "getMenuByUserRole",
  async (username ) => {
    return await postRequest("/Menu/getMenuByUserRole", username );
  }
);

export const getDashboard = createAsyncThunk(
  "getDashboard",
  async (username) => {
    return await  getRequest(`/Dashboard/getDashboard/${username}`);
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
    return await postUpdate("/AppUser/deleteAppUser", { appUserId });
  }
);

const AppUserSlice = createSlice({
  name: "appUserSlice",
  initialState,
  reducers: {
    logout: (state) => {
      // Reset state to the initial state
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
          console.log('loginDetail', loginDetail.data[0], 'action.payload', action.payload.token)
          doLogin(loginDetail.data[0], action.payload.token);
          state.userDetail = loginDetail.data[0];
          state.token = action.payload.token;
        }
        state.isLoading = false;
      })
      .addCase(fetchUserLogin.rejected, (state) => {
        state.isLoading = false;
      }).addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      }).addCase(verifyPin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyPin.fulfilled, (state) => {
        state.isLoading = false;
        state.pinVerificationSuccess = true;
      })

      .addCase(verifyPin.rejected, (state, action) => {
        state.isLoading = false;
        state.pinVerificationSuccess = false;
        console.error("Verification Error:", action.payload || "Unknown error");
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
          console.log('action===forgotPassword', action.meta.arg)
          //doLogin({userName:action.meta.arg}, action.payload.token);
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
        console.log(response);

        if (response?.statusCode === 200) {
          console.log("OTP verified successfully:", response.message);
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
      })
      .addCase(getMenuByUserRole.pending, (state) => {
        state.isLoadingoading = true;
      })
      .addCase(getMenuByUserRole.fulfilled, (state, action) => {
        state.isLoadingoading = false;
        state.menu = action.payload;
      })
      .addCase(getMenuByUserRole.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(getDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardData = action.payload;
        console.log("done ->", state.dashboardData.data);
      })
      
      .addCase(getDashboard.rejected, (state, action) => {
        state.isLoading = false;
      });

  },
});

export const { logout } = AppUserSlice.actions;

export default AppUserSlice.reducer;
