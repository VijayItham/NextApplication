import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../common/auth";

const initialState = {
    isLoading: false,
    roleMenuData: [],
}

export const fetchRoleMenu = createAsyncThunk('fetchRoleMenu', async () => {
    const token = getToken();
   
    if (!token) {
        throw new Error('No token found');
    }
    const response = await axios.get('https://devrechargeapi.codetrex.in/api/RoleMenu/getAllRoleMenu', {
        headers:{
             Authorization: `Bearer ${token}`
        }
    });
    return response.data.data;
});

export const addRoleMenu = createAsyncThunk('addRoleMenu', async (roleMenuData) => {
    const token = getToken();
   
    if (!token) {
        throw new Error('No token found');
    }
    const data = {...roleMenuData,
        createdBy: 'd3b07384-d9a3-4e14-a2fc-dc7c4ef3a29f'
    }
    const response = await axios.post('https://devrechargeapi.codetrex.in/api/RoleMenu/addRoleMenu', data, {
        headers:{
             Authorization: `Bearer ${token}`
        }
    });
    return response.data;
});

export const updateRoleMenu = createAsyncThunk('updateRoleMenu', async (data) => {
    const token = getToken();
   
    if (!token) {
        throw new Error('No token found');
    }
    const updateData = { ...data, "updatedBy": 'd3b07384-d9a3-4e14-a2fc-dc7c4ef3a29f' }
    const response = await axios.post(`https://devrechargeapi.codetrex.in/api/RoleMenu/updateRoleMenu`, updateData, {
        headers:{
             Authorization: `Bearer ${token}`
        }
    });
    return response.data;
});

export const deleteRoleMenu = createAsyncThunk('deleteRoleMenu', async (roleMenuId) => {
    const token = getToken();
   
    if (!token) {
        throw new Error('No token found');
    }
  
    const deleteData = { roleMenuId, "updatedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6" }
    const response = await axios.post(`https://devrechargeapi.codetrex.in/api/RoleMenu/deleteRoleMenu`, deleteData, {
        headers:{
             Authorization: `Bearer ${token}`
        }
    });
    return response.data;
});

const AppRoleMenuSlice = createSlice({
    name: 'appRoleMenuSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoleMenu.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchRoleMenu.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.roleMenuData = action.payload
            })
            .addCase(fetchRoleMenu.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(addRoleMenu.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addRoleMenu.fulfilled, (state, action) => {
                if (action.payload.statusCode == 200) {
                    state.isLoading = false;
                }
            })   
            .addCase(addRoleMenu.rejected, (state) => {
                state.isLoading = false;
            })      
            .addCase(updateRoleMenu.pending, (state) => {
                state.isLoading = true;
            }) 
            .addCase(updateRoleMenu.fulfilled, (state, action) => {
                if (action.payload.statusCode == 200) {
                    state.isLoading = false;
                }
            })
            .addCase(updateRoleMenu.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteRoleMenu.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteRoleMenu.fulfilled, (state, action) => {
                if (action.payload.statusCode == 200) {
                    state.isLoading = false;
                }
            })
            .addCase(deleteRoleMenu.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export default AppRoleMenuSlice.reducer;