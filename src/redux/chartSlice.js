import { createSlice } from "@reduxjs/toolkit";
import { priceData } from "../components/mockData/priceData";

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const lastDate = Date.parse(priceData[priceData.length - 1].date);

export const chartSlice = createSlice({
  name: "chart",
  initialState: {
    reset: false,
    price: priceData[priceData.length - 1].close,
    focusedDate: new Date(lastDate).toLocaleDateString("tr-TR", dateOptions),
    chartType: "candle",
  },
  reducers: {
    updateReset: (state) => {
      state.reset = !state.reset;
    },
    updatePrice: (state, action) => {
      state.price = action.payload;
    },
    updateFocusedDate: (state, action) => {
      state.focusedDate = action.payload;
    },
    updateChartType: (state, action) => {
      state.chartType = action.payload;
    },
  },
});

export const { updateReset, updatePrice, updateFocusedDate, updateChartType } =
  chartSlice.actions;
export default chartSlice.reducer;
