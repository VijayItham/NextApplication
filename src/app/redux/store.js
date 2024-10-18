import { configureStore } from '@reduxjs/toolkit';
import appRoleReducer from './AppRoleSlice'
import countryStateCityReducer from './CountryStateCitySlice'
import appUserReducer from './AppUserSlice'

const store = configureStore({
    reducer:{
        appRoleReducer,
        countryStateCityReducer,
        appUserReducer
    }
});

module.exports = store; 