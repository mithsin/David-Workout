import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'userState',
    initialState: {
        userName: '',
        eMail: '',
        password: '',
        historyList: [],
        date: '',
        isAuthorized: false,
    },
    reducers: {
        setVerifiedUser: (state, action) => {
            state.isAuthorized = action.payload;
        },
        setEnterCredentials: (state, action) => {
            state.noCredentials = action.payload;
        },
        setSignedState: (state, action) => {
            state.isSigned = action.payload;
        },
    },
});

export const {
    setEnterCredentials, setSignedState, setVerifiedUser
} = userSlice.actions;

export const userName = state => state.userState.userName;
export const eMail = state => state.userState.eMail;
export const historyList = state => state.userState.historyList;
export const date = state => state.userState.date;
export const noCredentials = state => state.userState.noCredentials;
export const isAuthorized = state => state.userState.isAuthorized;

export default userSlice.reducer;