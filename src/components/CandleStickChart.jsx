import { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { priceData } from "./mockData/priceData";
import { CandleChart } from "./styles/ChartCard.styled";
import { updatePrice, updateFocusedDate } from "../redux/chartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function CandleStickChart() {
  const chartContainerRef = useRef(null);
  const chart = useRef(null);
  const resizeObserver = useRef(null);
  const dispatch = useDispatch();
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const lastDate = Date.parse(priceData[priceData.length - 1].date);
  const { reset } = useSelector((state) => state.chart);

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: "#1e2126",
        textColor: "rgba(255, 255, 255, 0.9)",
      },
      grid: {
        vertLines: {
          color: "#334158",
        },
        horzLines: {
          color: "#334158",
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      priceScale: {
        borderColor: "#485c7b",
      },
      timeScale: {
        borderColor: "#485c7b",
      },
    });

    console.log(chart.current);

    const candleSeries = chart.current.addCandlestickSeries({
      upColor: "#4bffb5",
      downColor: "#ff4976",
      borderDownColor: "#ff4976",
      borderUpColor: "#4bffb5",
      wickDownColor: "#838ca1",
      wickUpColor: "#838ca1",
    });

    candleSeries.setData(
      priceData.map((prevValue) => {
        return {
          ...prevValue,
          time: Date.parse(prevValue.date) / 1000,
        };
      })
    );

    chart.current.applyOptions({
      watermark: {
        color: "orange",
        visible: true,
        text: "bestcloudfor.me",
        fontSize: 20,
        horzAlign: "right",
        vertAlign: "bottom",
      },
      timeScale: {
        visible: true,
        timeVisible: true,
        secondsVisible: true,
      },
    });

    chart.current.subscribeCrosshairMove(({ time, seriesPrices, point }) => {
      if (
        point === undefined ||
        !time ||
        point.x < 0 ||
        point.x > chart.current.width ||
        point.y < 0 ||
        point.y > chart.current.height
      ) {
        dispatch(updatePrice(priceData[priceData.length - 1].close));
        dispatch(
          updateFocusedDate(
            new Date(lastDate).toLocaleDateString("tr-TR", dateOptions)
          )
        );
      } else {
        const date = new Date(time * 1000).toLocaleDateString(
          "tr-TR",
          dateOptions
        );
        dispatch(updatePrice(seriesPrices.get(candleSeries).close));
        dispatch(updateFocusedDate(date));
      }
    });

    // const areaSeries = chart.current.addAreaSeries({
    //   topColor: "rgba(38,198,218, 0.56)",
    //   bottomColor: "rgba(38,198,218, 0.04)",
    //   lineColor: "rgba(38,198,218, 1)",
    //   lineWidth: 2,
    // });

    // areaSeries.setData(
    //   priceData.map((prevValue) => {
    //     return {
    //       ...prevValue,
    //       time: Date.parse(prevValue.date) / 1000,
    //       value: prevValue.close,
    //     };
    //   })
    // );

    // const volumeSeries = chart.current.addHistogramSeries({
    //   color: "#182233",
    //   lineWidth: 2,
    //   priceFormat: {
    //     type: "volume",
    //   },
    //   overlay: true,
    //   scaleMargins: {
    //     top: 0.9,
    //     bottom: 0,
    //   },
    // });

    // volumeSeries.setData(
    //   priceData.map((prevValue) => {
    //     return {
    //       ...prevValue,
    //       time: Date.parse(prevValue.date) / 1000,
    //       value: prevValue.close,
    //     };
    //   })
    // );
    return () => {
      chart.current.remove();
    };
  }, [reset]);

  // Resize chart on container resizes.
  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, [reset]);

  return <CandleChart ref={chartContainerRef} />;
}
