import { createSlice } from "@reduxjs/toolkit";

const medicineSlice = createSlice({
  name: "medicines",
  initialState: {
    medicine: [],
  },
  reducers: {
    addMedicine: (state, action) => {
      state.medicine.push(action.payload);
    },
    deleteMedicine: (state, action) => {
      state.medicine = state.medicine.filter(
        (med) => med.medId !== action.payload.medId
      );
    },
    getMedicineSuccess: (state, action) => {
      state.medicine = action.payload;
    },
  },
});

export const { addMedicine, deleteMedicine, getMedicineSuccess } = medicineSlice.actions;
export default medicineSlice.reducer;
