import { configureStore } from '@reduxjs/toolkit';
import appRoleReducer from './AppRoleSlice'
import countryStateCityReducer from './CountryStateCitySlice'

const store = configureStore({
    reducer:{
        appRoleReducer,
        countryStateCityReducer
    }
});

module.exports = store; 