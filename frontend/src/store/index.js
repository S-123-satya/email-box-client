import {configureStore} from '@reduxjs/toolkit'
import authSlice from './auth-slice'
import emailSlice from './emails-slice';

const store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        email:emailSlice.reducer,
    }
})

export const {login,logout,toggleLoginMode,signupMode,loginMode}= authSlice.actions;
export const { receiveMessage,sendMessage}=emailSlice.actions;

export default store;