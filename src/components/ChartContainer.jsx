import {
  ChartCard,
  ChartButton,
  ChartText,
  ChartTopContainer,
  ChartTextContainer,
} from "./styles/ChartCard.styled";
import { updateReset } from "../redux/chartSlice";
import { useDispatch, useSelector } from "react-redux";
import ChartTypeToggler from "./ChartTypeToggler";
import ColumnChart from "./ColumnChart";
import CandleStickChart from "./CandleStickChart";
import AreaChart from "./AreaChart";
import DateToggler from "./DateToggler";
//material ui
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ThemeProvider, createTheme } from "@mui/material/styles";
//react
import { useState } from "react";

export default function ChartContainer() {
  const dispatch = useDispatch();
  const { price, focusedDate, chartType } = useSelector((state) => state.chart);
  const [ticker, setTicker] = useState("usdtry");

  const handleChange = (event) => {
    setTicker(event.target.value);
  };

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
  return (
    <ThemeProvider theme={darkTheme}>
      <ChartCard>
        <ChartTopContainer>
          <ChartTextContainer>
            <ChartText fontSize="1.5em" fontWeight="400">
              USD/TRY
            </ChartText>
            <ChartText fontSize="2em" fontWeight="600">
              {price.toFixed(2)}
            </ChartText>
            <ChartText fontSize="1em" fontWeight="300">
              {focusedDate}
            </ChartText>
          </ChartTextContainer>
          <FormControl>
            <InputLabel>Currency</InputLabel>
            <Select
              value={ticker}
              label="Currency"
              sx={{ width: 120, height: 40 }}
              onChange={handleChange}
            >
              <MenuItem value={"usdtry"}>USD/TRY</MenuItem>
              <MenuItem value={"usdeur"}>USD/EUR</MenuItem>
              <MenuItem value={"usdgbp"}>USD/GBP</MenuItem>
              <MenuItem value={"usdjpy"}>USD/JPY</MenuItem>
              <MenuItem value={"usdcad"}>USD/CAD</MenuItem>
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
