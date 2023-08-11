import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  OrderList: null,
};

export const items = createSlice({
  name: "orderSl",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.OrderList = action.payload;
    },
  },
});
export const { setOrder } = items.actions;
export default items.reducer;
