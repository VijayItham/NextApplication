import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    countryList: [],
    stateList: [],
    cityList: []
}

export const fetchCountry = createAsyncThunk('fetchCountry', async () => {
    const response = await axios.get('https://devrechargeapi.codetrex.in/api/CountryStateCity/getAllCountry');
    return response.data.data;
});

export const fetchState = createAsyncThunk('fetchState', async (id) => {
    const response = await axios.get(`https://devrechargeapi.codetrex.in/api/CountryStateCity/getAllState/` + id);
    return response.data;
});

export const fetchCity = createAsyncThunk('fetchCity', async (id) => {
    const response = await axios.get(`https://devrechargeapi.codetrex.in/api/CountryStateCity/getAllCity/` + id);
    return response.data;
});

const CountryStateCitySlice = createSlice({
    name: 'CountryStateCitySlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountry.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCountry.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.countryList = action.payload
            })
            .addCase(fetchCountry.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchState.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchState.fulfilled, (state, action) => {
                if (action.payload.statusCode == 200) {
                    state.isLoading = false,
                        state.stateList = action.payload.data
                }
            })
            .addCase(fetchState.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchCity.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCity.fulfilled, (state, action) => {
                if (action.payload.statusCode == 200) {
                    state.isLoading = false,
                        state.cityList = action.payload.data
                }
            })
            .addCase(fetchCity.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

export default CountryStateCitySlice.reducer;