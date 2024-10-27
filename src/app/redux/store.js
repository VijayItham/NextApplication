import { configureStore } from '@reduxjs/toolkit';
import appRoleReducer from './AppRoleSlice';
import countryStateCityReducer from './CountryStateCitySlice';
import appUserReducer from './AppUserSlice';  // Ensure this is correct
import menuReducer from './MenuSlice';
import roleMenuReducer from './RoleMenuSlice';

const store = configureStore({
    reducer: {
        appRoleReducer,
        countryStateCityReducer,
        appUserReducer,
        menuReducer,
        roleMenuReducer
    }
});

export default store;