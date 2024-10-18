// store/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { name: "" },
  reducers: {
    setuser: (state, action) => {
      state.name = action.payload;
    }
  },
});

export const { setuser } = userSlice.actions;
export default userSlice.reducer;
