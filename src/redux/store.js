import { configureStore } from "@reduxjs/toolkit";
import chartReducer from "./chartSlice";

export default configureStore({
  reducer: {
    chart: chartReducer,
  },
  // By default, Redux will throw an error if it encounters a non-serializable state. But you can override it with the following option.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
