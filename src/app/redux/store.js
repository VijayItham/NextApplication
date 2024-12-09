import { configureStore } from '@reduxjs/toolkit';
import appRoleReducer from './AppRoleSlice';
import countryStateCityReducer from './CountryStateCitySlice';
import appUserReducer from './AppUserSlice';  // Ensure this is correct
import menuReducer from './MenuSlice';
import roleMenuReducer from './RoleMenuSlice';
import fundRequestReducer from './FundRequestSlice';
import operatorTypeReducer from './OperatorTypeSlice';

const store = configureStore({
    reducer: {
        appRoleReducer,
        operatorTypeReducer,
        countryStateCityReducer,
        appUserReducer,
        menuReducer,
        roleMenuReducer,
        fundRequestReducer
    }
});

export default store;