import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show:false
};
const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    showModel(state) {
      state.show=true;
    },
    hideModel(state) {
        state.show=false;
    },
    
  },
});

export default modelSlice;