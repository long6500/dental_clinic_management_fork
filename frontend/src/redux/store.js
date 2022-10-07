import medicineSlice from "./reducer/medicineSlice";
import loading from './reducer/loading'

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    med: medicineSlice,
    loading: loading,
  },
});
