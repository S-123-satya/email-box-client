import moduleName, { createSlice } from '@reduxjs/toolkit';

const initialState={
    receivedMessages:[{
        id:1,
        sender:"xyz@gmail.com",
        receiver:"abc@gmail.com",
        message:"hii",
        time:"2023-12-18",
        readStatus:false,
    }],
    unReadMessages:0,
    sentMessages:[],
    currentEditorMessage:{},
    currentEditorMessageReceiver:'',
}

const emailSlice=createSlice({
    name:"email",
    initialState,
    reducers:{
        sendMessage(state,action){
            state.sentMessages.push({...action.payload})
        },
        receiveMessage(state,action){
            state.receivedMessages.push({...action.payload})
            if(action.payload.readStatus) 
            state.unReadMessages++;
        },
        setCurrentMessage(state,action){
            console.log(`hii set currrent`);
            console.log(action);
            state.currentEditorMessage=action.payload;
        },
        setCurrentMessageUser(state,action){
            console.log(`hii set currrent user`);
            console.log(action);
            state.currentEditorMessageReceiver=action.payload;
        }
    }
})

export default emailSlice;
