import { configureStore } from "@reduxjs/toolkit";
import chartReducer from "./chartSlice";

export default configureStore({
  reducer: {
    chart: chartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
