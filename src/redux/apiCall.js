//Axios
import axios from "axios";
//Redux
import {
  updateStart,
  updateError,
  updateChartData,
  updatePrice,
  updateFocusedDate,
  updateBase,
} from "./chartSlice";
//Envoirment variables
const baseURL = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const dateOptions = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const updateData = async (
  ticker,
  startDate,
  endDate,
  freq,
  dispatch
) => {
  dispatch(updateStart()); //dispatching the updateStart action. sets the state to pending: true
  try {
    const values = await axios.get(
      `${baseURL}/${ticker}/startDate=${startDate}&endDate=${endDate}&resampleFreq=${freq}&token=${apiKey}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(updateChartData(values.data)); //dispatching the updateChartData action. sets the state to chartData: action.payload, pending: false, error: false
    const priceData = values.data;
    const closeValues = priceData.map((values) => values.close);
    const min = Math.min(...closeValues);
    const max = Math.max(...closeValues);
    const diff = min / max;
    const baseStart = min * diff;
    dispatch(updatePrice(priceData[priceData.length - 1].close));
    dispatch(
      updateFocusedDate(
        new Date(endDate).toLocaleDateString("tr-TR", dateOptions)
      )
    );
    dispatch(updateBase(baseStart));
  } catch (err) {
    dispatch(updateError());
  }
};
