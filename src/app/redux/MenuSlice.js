import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRequest, postCreate, postUpdate } from "../api/page";

const initialState = {
    isLoading: false,
    menuData: [],
}

export const fetchMenu = createAsyncThunk('fetchMenu', async () => {
  const response = await getRequest("/Menu/getAllMenu");
  return response.data;
});

export const addMenu = createAsyncThunk('addMenu', async (menuData) => {
    return await postCreate("/Menu/addMenu", menuData);
});

export const updateMenu = createAsyncThunk('updateMenu', async (data) => {
    return await postUpdate("/Menu/updateMenu", data);
});

export const deleteMenu = createAsyncThunk('deleteMenu', async (menuId) => {
    return await postUpdate("/Menu/deleteMenu", {menuId});
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