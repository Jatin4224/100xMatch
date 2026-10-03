import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequest: (state, action) =>
      state ? state.filter((request) => request._id !== action.payload) : state,
    removeRequests: () => null,
  },
});

export const { addRequests, removeRequest, removeRequests } =
  requestSlice.actions;
export default requestSlice.reducer;
