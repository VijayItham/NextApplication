import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    appRoleData: [],
    // appRole: JSON.parse(localStorage.getItem("appRole")) ? JSON.parse(localStorage.getItem("appRole")) : []
}

export const fetchAppRole = createAsyncThunk('fetchAppRole', async () => {
    const response = await axios.get('https://devrechargeapi.codetrex.in/api/AppRole/getAllAppRole');
    return response.data.data;
});

export const addAppRole = createAsyncThunk('addAppRole', async (appRole) => {
    const data = {
        roleName: appRole,
        createdBy: 'd3b07384-d9a3-4e14-a2fc-dc7c4ef3a29f'
    }
    const response = await axios.post('https://devrechargeapi.codetrex.in/api/AppRole/addAppRole', data);
    return response.data;
});

export const updateAppRole = createAsyncThunk('updateAppRole', async (data) => {
    const updateData = { ...data, "updatedBy": 'd3b07384-d9a3-4e14-a2fc-dc7c4ef3a29f' }
    const response = await axios.post(`https://devrechargeapi.codetrex.in/api/AppRole/updateAppRole`, updateData);
    return response.data;
});

export const deleteAppRole = createAsyncThunk('deleteAppRole', async (data) => {
    const deleteData = { appRoleId: data.appRoleId, "updatedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6" }
    const response = await axios.post(`https://devrechargeapi.codetrex.in/api/AppRole/deleteAppRole`, deleteData);
    return response.data;
});

const AppRoleSlice = createSlice({
    name: 'appRoleSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAppRole.pending, (state) => {
                state.isLoading = true; // Set loading to true when starting to fetch
            })
            .addCase(fetchAppRole.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.appRoleData = action.payload
            })
            .addCase(fetchAppRole.rejected, (state) => {
                state.isLoading = false; // Set loading to false when fetch fails
            })
            .addCase(addAppRole.pending, (state) => {
                state.isLoading = true; // Set loading to true when starting to add
            })
            .addCase(addAppRole.fulfilled, (state, action) => {
                if (action.payload.statusCode == 200) {
                    state.isLoading = false;
                    const { id, roleName } = action.payload.data
                    state.appRoleData.push({ appRoleId: id, roleName })
                }
            })   
            .addCase(addAppRole.rejected, (state) => {
                state.isLoading = false; // Set loading to false when add fails
            })      
            .addCase(updateAppRole.pending, (state) => {
                state.isLoading = true;
            }) 
            .addCase(updateAppRole.fulfilled, (state, action) => {
                if (action.payload.statusCode == 200) {
                    state.isLoading = false;
                    const { appRoleId, roleName } = action.meta.arg
                    const appRoleData = current(state.appRoleData)
                    const updatedData = appRoleData.map((item) => item.appRoleId === appRoleId ? { appRoleId, roleName } : item)
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
                    const { appRoleId, roleName } = action.meta.arg
                    const appRoleData = current(state.appRoleData)
                    const filteredData = appRoleData.filter((item) => item.appRoleId != appRoleId)
                    state.appRoleData = filteredData;
                }
            })
            .addCase(deleteAppRole.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export default AppRoleSlice.reducer;