import { createSlice } from "@reduxjs/toolkit";

const loading = createSlice({
  name: "isLoading",
  initialState: false,
  reducers: {
    setLoading: () => {
      return true
    },

    setNotLoading: () => {
      return false
    },

    toggleLoading: (state) => {
      return !state
    },
  },
});

export const { setLoading, setNotLoading, toggleLoading } = loading.actions;
export default loading.reducer;
