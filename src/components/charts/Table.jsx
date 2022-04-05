import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const columns = [
  { field: "date", headerName: "Tarih", width: 200 },
  { field: "open", headerName: "Açılış", width: 120 },
  { field: "close", headerName: "Kapanış", width: 120 },
  { field: "high", headerName: "Yüksek", width: 120 },
  { field: "low", headerName: "Düşük", width: 120 },
];

export default function DataTable() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const { chartData } = useSelector((state) => state.chart);
  const dateOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <div
        style={{ height: 400, width: "100%", marginTop: 25, marginBottom: 25 }}
      >
        <DataGrid
          getRowId={(chartData) => chartData.date}
          rows={chartData.map((prevValue) => {
            return {
              date: new Date(prevValue.date).toLocaleDateString(
                "tr-TR",
                dateOptions
              ),
              open: prevValue.open.toFixed(2),
              close: prevValue.close.toFixed(2),
              high: prevValue.high.toFixed(2),
              low: prevValue.low.toFixed(2),
            };
          })}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </ThemeProvider>
  );
}
