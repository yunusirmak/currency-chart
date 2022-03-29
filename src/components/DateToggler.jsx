//react
import { useEffect, useState } from "react";
//Material UI
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import UpdateIcon from "@mui/icons-material/Update";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import DateRangePicker from "@mui/lab/DateRangePicker";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
//redux
import { updateDateType } from "../redux/chartSlice";
import { useDispatch, useSelector } from "react-redux";
//styled components
import { ChartBottomContainer, ChartButton } from "./styles/ChartCard.styled";
//date-fns
import trLocale from "date-fns/locale/tr";

export default function DateToggler() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });
  const localeMap = {
    tr: trLocale,
  };
  const maskMap = {
    tr: "__.__.____",
  };
  const dispatch = useDispatch();
  const { dateType } = useSelector((state) => state.chart);
  const [lastDay, setLastDay] = useState(new Date());
  const [firstDay, setFirstDay] = useState(new Date(Date.now() - 86400000));
  const [range, setRange] = useState([firstDay, lastDay]);

  useEffect(() => {
    console.log(lastDay.toISOString());
    dateType === "day" && setFirstDay(new Date(lastDay.getTime() - 86400000));
  }, [lastDay]);

  useEffect(() => {
    console.log(firstDay.toISOString());
  }, [firstDay]);

  const handleChange = (event, newType) => {
    dispatch(updateDateType(newType));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <ChartBottomContainer>
        <ToggleButtonGroup value={dateType} exclusive onChange={handleChange}>
          <ToggleButton value="day">
            <CalendarTodayIcon />
          </ToggleButton>
          <ToggleButton value="timeframe">
            <CalendarMonthIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          locale={localeMap["tr"]}
        >
          {dateType === "day" ? (
            <DesktopDatePicker
              label="Tarih"
              value={lastDay}
              minDate={new Date("2005-01-01")}
              maxDate={new Date()}
              onChange={(newValue) => {
                setLastDay(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} sx={{ width: 150 }} />
              )}
              mask={maskMap["tr"]}
            />
          ) : (
            <DateRangePicker
              startText="Başlangıç"
              endText="Bitiş"
              value={range}
              minDate={new Date("2005-01-01")}
              maxDate={new Date()}
              onChange={(newValue) => {
                setRange(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} sx={{ width: 120 }} />
                  <Box sx={{ mx: 1 }}> - </Box>
                  <TextField {...endProps} sx={{ width: 120 }} />
                </>
              )}
            />
          )}
        </LocalizationProvider>
        <Button variant="outlined" size="large" sx={{ color: "white" }}>
          <UpdateIcon />
        </Button>
      </ChartBottomContainer>
    </ThemeProvider>
  );
}
