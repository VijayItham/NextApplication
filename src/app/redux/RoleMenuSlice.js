import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest,  postCreate, postUpdate } from "../api/page";

const initialState = {
    isLoading: false,
    roleMenuData: [],
}

export const fetchRoleMenu = createAsyncThunk('fetchRoleMenu', async () => {
    const response = await getRequest("/RoleMenu/getAllRoleMenu");
    return response.data;
});

export const addRoleMenu = createAsyncThunk('addRoleMenu', async (roleMenuData) => {
    return await postCreate("/RoleMenu/addRoleMenu", roleMenuData);
});

export const updateRoleMenu = createAsyncThunk('updateRoleMenu', async (data) => {
    return await postUpdate("/RoleMenu/updateRoleMenu", data);
});

export const deleteRoleMenu = createAsyncThunk('deleteRoleMenu', async (roleMenuId) => {
    return await postUpdate("/RoleMenu/deleteRoleMenu", {roleMenuId});
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