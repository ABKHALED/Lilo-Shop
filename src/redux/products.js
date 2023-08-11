import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jewelryItems: null,
};

export const items = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.jewelryItems = action.payload;
    },
  },
});
export const { setItems } = items.actions;
export default items.reducer;
