import { createSlice, current } from "@reduxjs/toolkit";
const initialState = {
  seletedMaterials: [],
  superTotal: 0,
};

const calculateSlice = createSlice({
  name: "calculate",
  initialState,
  reducers: {
    seletedMaterialsReducer: (state, { payload }) => {
      state.seletedMaterials = payload;
    },
    removeFromCart: (state, { payload }) => {
      const newArr = state.seletedMaterials.filter((item) => {
        return item.name !== payload;
      });
      const findItem = state.seletedMaterials.find((item) => {
        return item.name === payload;
      });
      
      state.superTotal = state.superTotal - findItem.taxTotal;

      state.seletedMaterials = newArr;
    },
    quantityChange: (state, { payload }) => {
      const calItem = state.seletedMaterials.find((item) => {
        return item.name === payload.name;
      });
      calItem.quantity = payload.inputValue;
      calItem.total = payload.inputValue * calItem.price;
      calItem.taxTotal = (calItem.tax * calItem.total) / 100 + calItem.total;

      state.superTotal = state.seletedMaterials.reduce((acc, cur) => {
        return acc + cur.taxTotal;
      }, 0);
    },

    taxChange: (state, { payload }) => {
      const calItem = state.seletedMaterials.find((item) => {
        return item.name === payload.name;
      });
      calItem.tax = payload.tax;
      calItem.taxTotal = (payload.tax * calItem.total) / 100 + calItem.total;

      state.superTotal = state.seletedMaterials.reduce((acc, cur) => {
        return acc + cur.taxTotal;
      }, 0);
    },
    superTotalAction: (state, { payload }) => {
      state.superTotal = payload;
    },
  },
});

export const {
  seletedMaterialsReducer,
  removeFromCart,
  quantityChange,
  taxChange,
  superTotalAction,
} = calculateSlice.actions;
export default calculateSlice.reducer;
