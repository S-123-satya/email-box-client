import moduleName, { createSlice } from "@reduxjs/toolkit";

const initialState = {
  receivedMessages: [],
  unReadMessages: 0,
  sentMessages: [],
  messageDetailReceive: false,
  currentEditorMessage: {},
  currentEditorMessageReceiver: "",
};

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    sendMessage(state, action) {
      state.sentMessages.unshift({ ...action.payload });
    },
    receiveMessage(state, action) {
      state.receivedMessages.unshift({ ...action.payload });
      if (!action.payload.readStatus) state.unReadMessages=state.unReadMessages + 1;
    },
    deleteMessage(state, action) {
      if (state.messageDetailReceive) {
        state.receivedMessages = state.receivedMessages.filter(
          (m) => m.id != action.payload.id
        );
      } else {
        state.sentMessages = state.sentMessages.filter(
          (m) => m.id != action.payload.id
        );
      }
    },
    readMessage(state, action) {
      state.receivedMessages = state.receivedMessages.map((m) => {
        if (m.id != action.payload.id) return m;
        else {
          if(!m.readStatus)
          state.unReadMessages = state.unReadMessages - 1;
          return {...m,readStatus:true};
        }
      });
    },
    setCurrentMessage(state, action) {
      console.log(`hii set currrent`);
      console.log(action);
      state.currentEditorMessage = action.payload;
    },
    setCurrentMessageUser(state, action) {
      console.log(`hii set currrent user`);
      console.log(action);
      state.currentEditorMessageReceiver = action.payload;
    },
    setMessageDetailReceive(state) {
      state.messageDetailReceive = true;
    },
    unSetMessageDetailReceive(state) {
      state.messageDetailReceive = false;
    },
  },
});

export default emailSlice;
