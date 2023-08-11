import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "../utils/fetchLocelstoreg";
const initialState = {
  value: fetchUser(),
};

export const userLoged = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { login, logout } = userLoged.actions;

export default userLoged.reducer;
