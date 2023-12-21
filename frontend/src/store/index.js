import {configureStore} from '@reduxjs/toolkit'
import authSlice from './auth-slice'
import emailSlice from './emails-slice';
import modelSlice from './model-slice.';

const store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        email:emailSlice.reducer,
        model:modelSlice.reducer,
    }
})

export const {login,logout,toggleLoginMode,signupMode,loginMode}= authSlice.actions;
export const { receiveMessage,sendMessage,setCurrentMessage,setCurrentMessageUser,setMessageDetailReceive,deleteMessage,unSetMessageDetailReceive}=emailSlice.actions;
export const {showModel,hideModel} = modelSlice.actions;

export default store;