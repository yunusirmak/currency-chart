import { createSlice } from "@reduxjs/toolkit";

export const chartSlice = createSlice({
  name: "chart",
  initialState: {
    reset: false,
    price: 0,
    focusedDate: "",
    chartType: "area",
    base: 0,
    dateType: "day",
    chartData: [],
    ticker: "usdtry",
    firstDate: new Date(Date.now() - 86400000),
    lastDate: new Date(),
    freq: "15min",
    range: [new Date(Date.now() - 86400000), new Date()],
    pending: false,
    error: false,
  },
  reducers: {
    updateStart: (state) => {
      state.pending = true;
    },
    updateError: (state) => {
      state.error = true;
      state.pending = false;
    },
    updateChartData: (state, action) => {
      state.chartData = action.payload;
      state.pending = false;
      action.payload === [] ? (state.error = true) : (state.error = false);
    },
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
    updateDateType: (state, action) => {
      state.dateType = action.payload;
    },
    updateBase: (state, action) => {
      state.base = action.payload;
    },
    updateTicker: (state, action) => {
      state.ticker = action.payload;
    },
    updateFirstDate: (state, action) => {
      state.firstDate = action.payload;
    },
    updateLastDate: (state, action) => {
      state.lastDate = action.payload;
    },
    updateFreq: (state, action) => {
      state.freq = action.payload;
    },
    updateRange: (state, action) => {
      state.range = action.payload;
    },
  },
});

export const {
  updateReset,
  updatePrice,
  updateFocusedDate,
  updateChartType,
  updateDateType,
  updateStart,
  updateError,
  updateChartData,
  updateBase,
  updateTicker,
  updateFirstDate,
  updateLastDate,
  updateFreq,
  updateRange,
} = chartSlice.actions;
export default chartSlice.reducer;
