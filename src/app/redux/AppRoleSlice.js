import { createSlice, nanoid, current, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    appRoleData: [],
    appRole: JSON.parse(localStorage.getItem("appRole")) ? JSON.parse(localStorage.getItem("appRole")) : []
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
    const response = await axios.post('http://devrechargeapi.codetrex.in/api/AppRole/addAppRole', data);
    return response.data;
});

export const updateAppRole = createAsyncThunk('updateAppRole', async (data) => {
    const updateData = { ...data, "updatedBy": 'd3b07384-d9a3-4e14-a2fc-dc7c4ef3a29f' }
    const response = await axios.post(`http://devrechargeapi.codetrex.in/api/AppRole/updateAppRole`, updateData);
    return response.data;
});

export const deleteAppRole = createAsyncThunk('deleteAppRole', async (data) => {
    const deleteData = { appRoleId: data.appRoleId, "updatedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6" }
    const response = await axios.post(`http://devrechargeapi.codetrex.in/api/AppRole/deleteAppRole`,deleteData);
    return response.data;
});

const AppRoleSlice = createSlice({
    name: 'appRoleSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAppRole.fulfilled, (state, action) => {
                state.isloading = false,
                    state.appRoleData = action.payload
            }).addCase(addAppRole.fulfilled, (state, action) => {
                if (action.payload.statusCode == 200) {
                    const { id, roleName } = action.payload.data
                    state.appRoleData.push({ appRoleId: id, roleName })
                }
            }).addCase(updateAppRole.fulfilled, (state, action) => {
                if (action.payload.statusCode == 200) {
                    const { appRoleId, roleName } = action.meta.arg
                    const appRoleData = current(state.appRoleData)
                    const updatedData = appRoleData.map((item) => item.appRoleId === appRoleId ? { appRoleId, roleName } : item)
                    state.appRoleData = updatedData;
                }
            }).addCase(deleteAppRole.fulfilled, (state, action) => {
                if (action.payload.statusCode == 200) {
                    const { appRoleId, roleName } = action.meta.arg
                    const appRoleData = current(state.appRoleData)
                    const filteredData = appRoleData.filter((item)=>item.appRoleId!=appRoleId)
                    state.appRoleData=filteredData;
                }
            })
    }
});

export default AppRoleSlice.reducer;