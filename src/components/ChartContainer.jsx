import {
  ChartCard,
  ChartText,
  ChartTopContainer,
  ChartTextContainer,
} from "./styles/ChartCard.styled";
import { useDispatch, useSelector } from "react-redux";
import ChartTypeToggler from "./ChartTypeToggler";
import ColumnChart from "./ColumnChart";
import CandleStickChart from "./CandleStickChart";
import AreaChart from "./AreaChart";
import DateToggler from "./DateToggler";
//api call
import { updateData } from "../redux/apiCall";
//material ui
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ThemeProvider, createTheme } from "@mui/material/styles";
//react
import { useEffect, useState } from "react";
//redux
import {
  updateChartData,
  updateFirstDate,
  updateLastDate,
  updateRange,
  updateTicker,
} from "../redux/chartSlice";

export default function ChartContainer() {
  const dispatch = useDispatch();
  const {
    price,
    focusedDate,
    chartType,
    chartData,
    firstDate,
    lastDate,
    range,
    ticker,
    freq,
  } = useSelector((state) => state.chart);

  const handleChange = (event) => {
    dispatch(updateTicker(event.target.value));
  };
  const [tickerName, setTickerName] = useState("USD/TRY");

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
      typography: {
        allVariants: {
          fontFamily: "Maven Pro",
        },
      },
    },
  });

  function changeTickerName(ticker) {
    if (ticker === "usdtry") {
      setTickerName("USD/TRY");
    } else if (ticker === "usdjpy") {
      setTickerName("USD/JPY");
    } else if (ticker === "usdcad") {
      setTickerName("USD/CAD");
    } else if (ticker === "usdchf") {
      setTickerName("USD/CHF");
    } else if (ticker === "usdpln") {
      setTickerName("USD/PLN");
    } else {
      setTickerName("USD/MXN");
    }
  }

  useEffect(() => {
    updateData(
      ticker,
      firstDate.toISOString(),
      lastDate.toISOString(),
      freq,
      dispatch
    );
    changeTickerName(ticker);
  }, [ticker]);

  return (
    <ThemeProvider theme={darkTheme}>
      <ChartCard>
        <ChartTopContainer>
          <ChartTextContainer>
            <ChartText fontSize="1em" fontWeight="400">
              {tickerName}
            </ChartText>
            <ChartText fontSize="2em" fontWeight="600">
              {price.toFixed(2)}
            </ChartText>
            <ChartText fontSize="0.8em" fontWeight="300">
              {focusedDate}
            </ChartText>
          </ChartTextContainer>
          <FormControl>
            <InputLabel>Currency</InputLabel>
            <Select
              value={ticker}
              label="Currency"
              sx={{ width: 130, height: 40 }}
              onChange={handleChange}
            >
              <MenuItem value={"usdtry"}>USD/TRY</MenuItem>
              <MenuItem value={"usdjpy"}>USD/JPY</MenuItem>
              <MenuItem value={"usdcad"}>USD/CAD</MenuItem>
              <MenuItem value={"usdchf"}>USD/CHF</MenuItem>
              <MenuItem value={"usdpln"}>USD/PLN</MenuItem>
              <MenuItem value={"usdmxn"}>USD/MXN</MenuItem>
            </Select>
          </FormControl>

          {/* <ChartButton
          onClick={() => {
            dispatch(updateReset());
          }}
        >
          Reset
        </ChartButton> */}
          <ChartTypeToggler />
        </ChartTopContainer>

        {chartType === "candle" ? (
          <CandleStickChart />
        ) : chartType === "bar" ? (
          <ColumnChart />
        ) : (
          <AreaChart />
        )}
        <DateToggler />
      </ChartCard>
    </ThemeProvider>
  );
}
