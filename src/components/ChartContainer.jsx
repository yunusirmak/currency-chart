//Chart components
import ChartTypeToggler from "./ChartTypeToggler";
import ColumnChart from "./charts/ColumnChart";
import CandleStickChart from "./charts/CandleStickChart";
import AreaChart from "./charts/AreaChart";
import DateToggler from "./DateToggler";
//Styled Components
import {
  ChartCard,
  ChartText,
  ChartTopContainer,
  ChartTextContainer,
  PriceContainer,
} from "./styles/ChartCard.styled";
//API call
import { updateData } from "../redux/apiCall";
//Material UI
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ThemeProvider, createTheme } from "@mui/material/styles";
//React
import { useEffect, useState } from "react";
//Redux
import { updateTicker } from "../redux/chartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ChartContainer() {
  //Redux hooks
  const dispatch = useDispatch();
  const {
    price,
    focusedDate,
    chartType,
    firstDate,
    lastDate,
    range,
    ticker,
    freq,
    error,
    dateType,
    pending,
  } = useSelector((state) => state.chart);

  //Update current ticker (currency)
  const handleChange = (event) => {
    dispatch(updateTicker(event.target.value));
  };

  //Material UI theme
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
  //Ticker name on first load
  const [tickerName, setTickerName] = useState("USD/TRY");

  //Change the ticker name depending on the currency
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

  //Turn the time data into a ISO string for the API call
  function toIsoString(date) {
    var tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? "+" : "-",
      pad = function (num) {
        return (num < 10 ? "0" : "") + num;
      };

    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes()) +
      ":" +
      pad(date.getSeconds()) +
      dif +
      pad(Math.floor(Math.abs(tzo) / 60)) +
      ":" +
      pad(Math.abs(tzo) % 60)
    );
  }

  //If the date type is daily, send a daily request. If it is a range, send a range request.
  useEffect(() => {
    dateType === "day"
      ? updateData(
          ticker,
          toIsoString(firstDate),
          toIsoString(lastDate),
          freq,
          dispatch
        )
      : updateData(
          ticker,
          toIsoString(range[0]),
          toIsoString(range[1]),
          freq,
          dispatch
        );
    changeTickerName(ticker);
  }, [ticker]);

  return (
    <ThemeProvider theme={darkTheme}>
      <ChartCard>
        <ChartTopContainer>
          <PriceContainer>
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
          </PriceContainer>
          <ChartTypeToggler />
        </ChartTopContainer>
        {/* If there is an error, display the error message. If the request is pending, display the loading message. If everything is fine, display the selected chart */}
        {error ? (
          <h2
            style={{
              height: 500,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Verilen Tarih Aralığında Veri Bulunamadı...
          </h2>
        ) : pending ? (
          <h2
            style={{
              height: 500,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Yükleniyor...
          </h2>
        ) : chartType === "candle" ? (
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
