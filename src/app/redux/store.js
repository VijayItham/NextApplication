import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice'
import todoReducer from './todoSlice'

const store = configureStore({
    reducer:{
        usersData:userReducer,
        toDosData:todoReducer
    }
});

module.exports = store; 