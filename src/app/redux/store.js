import { configureStore } from '@reduxjs/toolkit';
import appRoleReducer from './AppRoleSlice'
import todoReducer from './todoSlice'

const store = configureStore({
    reducer:{
        appRoleReducer,
        toDosData:todoReducer
    }
});

module.exports = store; 