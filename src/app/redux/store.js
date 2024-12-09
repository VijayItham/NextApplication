import { configureStore } from '@reduxjs/toolkit';
import appRoleReducer from './AppRoleSlice';
import countryStateCityReducer from './CountryStateCitySlice';
import appUserReducer from './AppUserSlice';  
import menuReducer from './MenuSlice';
import roleMenuReducer from './RoleMenuSlice';
import walletReducer from "./WalletSlice";

const store = configureStore({
    reducer: {
        appRoleReducer,
        countryStateCityReducer,
        appUserReducer,
        menuReducer,
        roleMenuReducer,
        walletReducer
    }
});

export default store;