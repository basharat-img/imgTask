import { configureStore } from "@reduxjs/toolkit";
import calcualteReducer from "../redux/calculateSlice";
export const store = configureStore({
  reducer: {
    calcualteReducer,
  },
});
