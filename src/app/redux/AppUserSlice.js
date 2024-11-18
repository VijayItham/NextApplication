import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { doLogin, getToken, doLogout, getUserDetails } from "../common/auth";

const initialState = {
    isLoading: false,
    appUserData: [],
    userDetail:{},
}

export const onLogout = () => async (dispatch) => {
    doLogout(); 
    dispatch(logout());
};

export const fetchAppUser = createAsyncThunk('fetchAppUser', async () => {
    const token = getToken();
    
    if (!token) {
        throw new Error('No token found');
    }
    const response = await axios.get('https://devrechargeapi.codetrex.in/api/AppUser/getAllAppUser', {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    });

    return response.data.data;
});

export const fetchUserLogin = createAsyncThunk('fetchUserLogin', async (userDetail) => {
    const response = await axios.post('https://devrechargeapi.codetrex.in/api/AppUser/loginUser', userDetail);

    return response.data;
});

export const addAppUser = createAsyncThunk('addAppUser', async (userData) => {
    const token = getToken();
    const user = getUserDetails();
    if (!token) {
        throw new Error('No token found');
    }
    const data = {
        ...userData,
        aadharImageBack:'',
        address2:'',
        middleName:'',
        panImage:'',
        createdBy: user?.appUserId ?? null,
    }
    const response = await axios.post('https://devrechargeapi.codetrex.in/api/AppUser/addAppUser', data,{
        headers:{
             Authorization: `Bearer ${token}`
        }
    });
    return response.data;
});

export const updateAppUser = createAsyncThunk('updateAppUser', async (data) => {
    const token = getToken();
    const user = getUserDetails();
    if (!token) {
        throw new Error('No token found');
    }
    
    const updateData = { ...data, updatedBy: user?.appUserId ?? null, }
   const response = await axios.post(`https://devrechargeapi.codetrex.in/api/AppUser/updateAppUser`, updateData, {
    headers:{
         Authorization: `Bearer ${token}`
    }
});
    return response.data;
});

export const deleteAppUser = createAsyncThunk('deleteAppUser', async (appUserId) => {
    const token = getToken();
    const user = getUserDetails();

    if (!token) {
        throw new Error('No token found');
    }
    const deleteData = { appUserId, updatedBy: user?.appUserId ?? null,}
    const response = await axios.post(`https://devrechargeapi.codetrex.in/api/AppUser/deleteAppUser`, deleteData, {
        headers:{
             Authorization: `Bearer ${token}`
        }
    });
    return response.data;
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