import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import adReducer from './slices/adSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        ad: adReducer
    },
});

export default store;
