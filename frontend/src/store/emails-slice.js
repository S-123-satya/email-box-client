import moduleName, { createSlice } from '@reduxjs/toolkit';

const initialState={
    messages:[{
        id:1,
        sender:"xyz@gmail.com",
        receiver:"abc@gmail.com",
        message:"hii",
        time:"2023-12-18",
        readStatus:false,
    }],
    unReadMessages:0,
    sentMessages:[]

}

const emailSlice=createSlice({
    name:"email",
    initialState,
    reducers:{
        sendMessage(state,action){
            state.sentMessages.push({...action.payload})
        },
        receiveMessage(state,action){
            state.messages.push({...action.payload})
            if(action.payload.readStatus) 
            state.unReadMessages++;
        }
    }
})
 export default emailSlice;
