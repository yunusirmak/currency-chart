import { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { priceData } from "./mockData/priceData";
import { CandleChart } from "./styles/ChartCard.styled";
import { updatePrice, updateFocusedDate } from "../redux/chartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ColumnChart() {
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
          color: "transparent",
        },
        horzLines: {
          color: "#transparent",
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        scaleMargins: {
          top: 0.4,
          bottom: 0,
        },
        borderVisible: false,
      },
      timeScale: {
        borderColor: "transparent",
      },
    });

    console.log(chart.current);

    chart.current.applyOptions({
      watermark: {
        color: "orange",
        visible: true,
        text: "bestcloudfor.me",
        fontSize: 20,
        horzAlign: "right",
        vertAlign: "top",
      },
      timeScale: {
        visible: true,
        timeVisible: true,
        secondsVisible: true,
      },
    });

    const volumeSeries = chart.current.addHistogramSeries({
      color: "#7CE0D6",
      priceFormat: {
        type: "price",
      },
      scaleMargins: {
        top: 0,
        bottom: 0.5,
      },
      lineColor: "#7CE0D6",
      lineWidth: 3,
    });

    volumeSeries.setData(
      priceData.map((prevValue) => {
        return {
          ...prevValue,
          time: Date.parse(prevValue.date) / 1000,
          value: prevValue.close,
        };
      })
    );

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
        dispatch(updatePrice(seriesPrices.get(volumeSeries)));
        dispatch(updateFocusedDate(date));
      }
    });

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
