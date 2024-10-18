import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    appUserData: [],
}

export const fetchAppUser = createAsyncThunk('fetchAppUser', async () => {
    const response = await axios.get('https://devrechargeapi.codetrex.in/api/AppUser/getAllAppUser');
    return response.data.data;
});

export const addAppUser = createAsyncThunk('addAppUser', async (userData) => {
    const data = {
        ...userData,
        aadharImageBack:'',
        address2:'',
        middleName:'',
        panImage:'',
        createdBy: 'd3b07384-d9a3-4e14-a2fc-dc7c4ef3a29f'
    }
    const response = await axios.post('https://devrechargeapi.codetrex.in/api/AppUser/addAppUser', data);
    return response.data;
});

export const updateAppUser = createAsyncThunk('updateAppUser', async (data) => {
    const updateData = { ...data, "updatedBy": 'd3b07384-d9a3-4e14-a2fc-dc7c4ef3a29f' }
   const response = await axios.post(`https://devrechargeapi.codetrex.in/api/AppUser/updateAppUser`, updateData);
    return response.data;
});

export const deleteAppUser = createAsyncThunk('deleteAppUser', async (appUserId) => {
    console.log('appUserId123',appUserId)
    const deleteData = { appUserId, "updatedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6" }
    console.log('deleteData', deleteData)
    const response = await axios.post(`https://devrechargeapi.codetrex.in/api/AppUser/deleteAppUser`, deleteData);
    return response.data;
});

const AppUserSlice = createSlice({
    name: 'appUserSlice',
    initialState,
    reducers: {
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
            });
    }
});

export default AppUserSlice.reducer;