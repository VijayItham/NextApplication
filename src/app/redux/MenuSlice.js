import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../common/auth";

const initialState = {
    isLoading: false,
    menuData: [],
}

export const fetchMenu = createAsyncThunk('fetchMenu', async () => {
    const token = getToken();
   
    if (!token) {
        throw new Error('No token found');
    }
    const response = await axios.get('https://devrechargeapi.codetrex.in/api/Menu/getAllMenu', {
        headers:{
             Authorization: `Bearer ${token}`
        }
    });
    return response.data.data;
});

export const addMenu = createAsyncThunk('addMenu', async (menuData) => {
    const token = getToken();
    
    if (!token) {
        throw new Error('No token found');
    }
    const data = {...menuData,
        createdBy: 'd3b07384-d9a3-4e14-a2fc-dc7c4ef3a29f'
    }
    console.log('Data123123', data)
    const response = await axios.post('https://devrechargeapi.codetrex.in/api/Menu/addMenu', data, {
        headers:{
             Authorization: `Bearer ${token}`
        }
    });
    return response.data;
});

export const updateMenu = createAsyncThunk('updateMenu', async (data) => {
    const token = getToken();
    
    if (!token) {
        throw new Error('No token found');
    }
    const updateData = { ...data, "updatedBy": 'd3b07384-d9a3-4e14-a2fc-dc7c4ef3a29f' }
    const response = await axios.post(`https://devrechargeapi.codetrex.in/api/Menu/updateMenu`, updateData, {
        headers:{
             Authorization: `Bearer ${token}`
        }
    });
    return response.data;
});

export const deleteMenu = createAsyncThunk('deleteMenu', async (menuId) => {
    const token = getToken();
    
    if (!token) {
        throw new Error('No token found');
    }
  
    const deleteData = { menuId, "updatedBy": "3fa85f64-5717-4562-b3fc-2c963f66afa6" }
    const response = await axios.post(`https://devrechargeapi.codetrex.in/api/Menu/deleteMenu`, deleteData, {
        headers:{
             Authorization: `Bearer ${token}`
        }
    });
    return response.data;
});

const AppMenuSlice = createSlice({
    name: 'appMenuSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenu.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMenu.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.menuData = action.payload
            })
            .addCase(fetchMenu.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(addMenu.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addMenu.fulfilled, (state, action) => {
                if (action.payload.statusCode == 200) {
                    state.isLoading = false;
                }
            })   
            .addCase(addMenu.rejected, (state) => {
                state.isLoading = false;
            })      
            .addCase(updateMenu.pending, (state) => {
                state.isLoading = true;
            }) 
            .addCase(updateMenu.fulfilled, (state, action) => {
                if (action.payload.statusCode == 200) {
                    state.isLoading = false;
                }
            })
            .addCase(updateMenu.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteMenu.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteMenu.fulfilled, (state, action) => {
                if (action.payload.statusCode == 200) {
                    state.isLoading = false;
                }
            })
            .addCase(deleteMenu.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export default AppMenuSlice.reducer;