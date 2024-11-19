import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postCreate, postUpdate , postLoginRequest } from "../common/api";
import { doLogin, doLogout } from "../common/auth";

const initialState = {
    isLoading: false,
    appUserData: [],
    userDetail:{},
}

export const onLogout = () => async (dispatch) => {
    doLogout(); 
    dispatch(logout());
};

export const fetchAppUser = createAsyncThunk("fetchAppUser", async () => {
    const data = await getRequest("/AppUser/getAllAppUser");
    return data.data;
  });

export const fetchUserLogin = createAsyncThunk('fetchUserLogin', async (userDetail) => {
    return  await postLoginRequest("/AppUser/loginUser", userDetail);;
});

export const addAppUser = createAsyncThunk('addAppUser', async (userData) => {
    const data = {
        ...userData,
        aadharImageBack:'',
        address2:'',
        middleName:'',
        panImage:''
    }
    return await postCreate("/AppUser/addAppUser", data);
});

export const updateAppUser = createAsyncThunk('updateAppUser', async (data) => {
    return  await postUpdate("/AppUser/updateAppUser", data);
});

export const deleteAppUser = createAsyncThunk('deleteAppUser', async (appUserId) => {
    return await postUpdate("/AppUser/deleteAppUser", {appUserId});
});

const AppUserSlice = createSlice({
    name: 'appUserSlice',
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
                const loginDetail=action?.payload?.getLoginDetails??{}
                if (loginDetail.statusCode == 200) {
                    doLogin(loginDetail.data[0], action.payload.token)
                    state.userDetail = loginDetail.data[0];
                    state.token = action.payload.token
                   
                }
                state.isLoading = false;
            })
            .addCase(fetchUserLogin.rejected, (state) => {
                state.isLoading = false;           
            });
    }
});

export const { logout } = AppUserSlice.actions;

export default AppUserSlice.reducer;