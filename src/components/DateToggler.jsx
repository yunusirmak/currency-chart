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
import MobileDatePicker from "@mui/lab/DesktopDatePicker";
import MobileDateRangePicker from "@mui/lab/DateRangePicker";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
//redux
import {
  updateDateType,
  updateFirstDate,
  updateRange,
  updateLastDate,
  updateFreq,
} from "../redux/chartSlice";
import { useDispatch, useSelector } from "react-redux";
//styled components
import { ChartBottomContainer, DateContainer } from "./styles/ChartCard.styled";
//date-fns
import trLocale from "date-fns/locale/tr";
//api call
import { updateData } from "../redux/apiCall";

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
  const dispatch = useDispatch();
  const {
    price,
    dateType,
    focusedDate,
    chartType,
    chartData,
    firstDate,
    lastDate,
    range,
    ticker,
    freq,
  } = useSelector((state) => state.chart);

  useEffect(() => {
    dateType === "day" &&
      dispatch(updateFirstDate(new Date(lastDate.getTime() - 86400000)));
  }, [lastDate]);

  // useEffect(() => {
  //   dateType === "day" && dispatch(updateRange([firstDate, lastDate]));
  // }, [firstDate]);

  useEffect(() => {
    if (dateType === "day") {
      dispatch(updateFreq("15min"));
    } else {
      dispatch(updateFreq("12hour"));
    }
  }, [dateType]);

  const handleChange = (event, newType) => {
    dispatch(updateDateType(newType));
  };

  function handleSubmit(event) {
    event.preventDefault();
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
  }
  const [dateError, setDateError] = useState(false);

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
        <DateContainer>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            locale={localeMap["tr"]}
          >
            {dateType === "day" ? (
              <MobileDatePicker
                label="Tarih"
                value={lastDate}
                minDate={new Date("2020-01-01")}
                maxDate={new Date()}
                onChange={(newValue, error) => {
                  error ? setDateError(true) : setDateError(false);
                  dateError === false && dispatch(updateLastDate(newValue));
                }}
                renderInput={(params) => (
                  <TextField {...params} sx={{ width: 150 }} />
                )}
                mask={maskMap["tr"]}
              />
            ) : (
              <MobileDateRangePicker
                startText="Başlangıç"
                endText="Bitiş"
                showClearButton={true}
                value={range}
                minDate={new Date("2005-01-01")}
                maxDate={new Date()}
                mask={maskMap["tr"]}
                onError={(error) => {
                  error ? setDateError(true) : setDateError(false);
                }}
                onChange={(newValue, error) => {
                  error ? setDateError(true) : setDateError(false);
                  dateError === false && dispatch(updateRange(newValue));
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
          <Button
            onClick={(e) => handleSubmit(e)}
            variant="outlined"
            size="large"
            sx={{ color: "white" }}
          >
            <UpdateIcon />
          </Button>
        </DateContainer>
      </ChartBottomContainer>
    </ThemeProvider>
  );
}
