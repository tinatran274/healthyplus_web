import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  status: false,
  error: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logStart: (state) => {
      state.isLoading = true;
      state.error = true;
    },
    logSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = true;
      state.error = false;
      state.message = payload.message;
    },
    logFailure: (state, { payload }) => {
      state.isLoading = false;
      state.status = false;
      state.error = true;
      state.message = payload.message;
    },
  },
});

const { reducer, actions } = authSlice;

export const {
  logStart,
  logSuccess,
  logFailure,
} = actions;

export default reducer;