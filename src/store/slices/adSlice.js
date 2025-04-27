import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ad_id: ''
};

const adSlice = createSlice({
    name: 'ad_creation',
    initialState,
    reducers: {
        setAd: (state, action) => {
            state.ad_id = action.payload.ad_id ;
        },
        clearAd: (state) => {
            state.ad_id = '';
        },
    }
});

export const { setAd, clearAd } = adSlice.actions;
export default adSlice.reducer;
