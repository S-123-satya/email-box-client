import moduleName, { createSlice } from '@reduxjs/toolkit';

const initialState={
    receivedMessages:[],
    unReadMessages:0,
    sentMessages:[],
    messageDetailReceive:false,
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
        },
        setMessageDetailReceive(state){
            state.messageDetailReceive=true;
        },
        unSetMessageDetailReceive(state){
            state.messageDetailReceive=false;
        }
    }
})

export default emailSlice;
