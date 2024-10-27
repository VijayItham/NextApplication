import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { doLogin, getToken, doLogout } from "../common/auth";

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
    console.log('response122',response)
    return response.data;
});

export const addAppUser = createAsyncThunk('addAppUser', async (userData) => {
    const token = getToken();
    
    if (!token) {
        throw new Error('No token found');
    }
    const data = {
        ...userData,
        aadharImageBack:'',
        address2:'',
        middleName:'',
        panImage:'',
        createdBy: 'd3b07384-d9a3-4e14-a2fc-dc7c4ef3a29f'
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
    
    if (!token) {
        throw new Error('No token found');
    }
    
    const updateData = { ...data, "updatedBy": 'd3b07384-d9a3-4e14-a2fc-dc7c4ef3a29f' }
   const response = await axios.post(`https://devrechargeapi.codetrex.in/api/AppUser/updateAppUser`, updateData, {
    headers:{
         Authorization: `Bearer ${token}`
    }
});
    return response.data;
});

export const deleteAppUser = createAsyncThunk('deleteAppUser', async (appUserId) => {
    const token = getToken();
    
    if (!token) {
        throw new Error('No token found');
    }
    console.log('appUserId123',appUserId)
    const deleteData = { appUserId, "updatedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6" }
    console.log('deleteData', deleteData)
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
                console.log('fetchUserLogin', state,'actiopmn', action)
                const loginDetail=action?.payload?.getLoginDetails??{}
                console.log('loginDeta111il', action)
                if (loginDetail.statusCode == 200) {
                    console.log('loginDetail.data[0]', loginDetail.data[0])
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