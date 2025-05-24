import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    isAdmin: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;   
            state.token = action.payload.token;
            state.isAdmin = action.payload.isAdmin;
        },
        clearUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.isAdmin = false;
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        }

    }
});

export const { setUser, clearUser, updateUser } = authSlice.actions;
export default authSlice.reducer;
