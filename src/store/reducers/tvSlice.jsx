import { createSlice } from "@reduxjs/toolkit";

export const tvSlice = createSlice({
  name: "tv",
  initialState: {
    info: null,
  },
  reducers: {
    loadTV: (state, action) => {
      state.info = action.payload;
    },
    removeTV: (state) => {
      state.info = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadTV, removeTV } = tvSlice.actions;

export default tvSlice.reducer;
