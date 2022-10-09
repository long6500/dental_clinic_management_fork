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
    updateMedicine: (state, action) => {
      state.medicine.map((med) => {
        if (med.medId === action.payload.medId) {
          med.name = action.payload.name;
          med.url = action.payload.url;
          med.quantity = action.payload.quantity;
          med.price = action.payload.price;
          med.purchasePrice = action.payload.purchasePrice;
          med.unit = action.payload.unit;
          med.usage = action.payload.usage;
          med.expireDay = action.payload.expireDay;
        }
      });
    },
  },
});

export const {
  addMedicine,
  deleteMedicine,
  getMedicineSuccess,
  updateMedicine,
} = medicineSlice.actions;
export default medicineSlice.reducer;
