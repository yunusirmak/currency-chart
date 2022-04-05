// Material UI
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TableChartIcon from "@mui/icons-material/TableChart";
import { ThemeProvider, createTheme } from "@mui/material/styles";
//redux
import { updateChartType } from "../redux/chartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ColorToggleButton() {
  //Material UI theme
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  //Redux hooks
  const dispatch = useDispatch();
  const { chartType } = useSelector((state) => state.chart);
  //Change the chart type depending on the toggle button
  const handleChange = (event, newType) => {
    dispatch(updateChartType(newType));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <ToggleButtonGroup value={chartType} exclusive onChange={handleChange}>
        {/*exclusive means that only one button can be selected at a time*/}
        <ToggleButton value="area">
          <ShowChartIcon />
        </ToggleButton>
        <ToggleButton value="bar">
          <BarChartIcon />
        </ToggleButton>
        <ToggleButton value="candle">
          <CandlestickChartIcon />
        </ToggleButton>
        <ToggleButton value="table">
          <TableChartIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </ThemeProvider>
  );
}
