import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  status: false,
  error: false,
  message: "",
};

const userSlice = createSlice({
  name: "updateInfo",
  initialState,
  reducers: {
    updateStart: (state) => {
      state.isLoading = true;
      state.error = true;
    },
    updateSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = true;
      state.error = false;
      state.message = payload.message;
    },
    updateFailure: (state, { payload }) => {
      state.isLoading = false;
      state.status = false;
      state.error = true;
      state.message = payload.message;
    },
  },
});

const { reducer, actions } = userSlice;

export const {
    updateStart,
    updateSuccess,
    updateFailure,
} = actions;

export default reducer;