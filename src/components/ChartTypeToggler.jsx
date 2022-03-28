import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { ThemeProvider, createTheme } from "@mui/material/styles";
//redux
import { updateChartType } from "../redux/chartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ColorToggleButton() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const dispatch = useDispatch();
  const { chartType } = useSelector((state) => state.chart);

  const handleChange = (event, newType) => {
    dispatch(updateChartType(newType));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <ToggleButtonGroup value={chartType} exclusive onChange={handleChange}>
        <ToggleButton value="candle">
          <CandlestickChartIcon />
        </ToggleButton>
        <ToggleButton value="bar">
          <BarChartIcon />
        </ToggleButton>
        <ToggleButton value="area">
          <ShowChartIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </ThemeProvider>
  );
}
