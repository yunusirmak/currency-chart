import { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { priceData } from "./mockData/priceData";
// import { areaData } from './areaData';

export default function Chart() {
  const chartContainerRef = useRef(null);
  const chart = useRef(null);
  const resizeObserver = useRef(null);
  var dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const lastDate = Date.parse(priceData[priceData.length - 1].date);
  const [price, setPrice] = useState(priceData[priceData.length - 1].close);
  const [focusedDate, setFocusedDate] = useState(
    new Date(lastDate).toLocaleDateString("tr-TR", dateOptions)
  );
  const [reset, setReset] = useState(false);

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: "#253248",
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
        fontSize: 18,
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
        setPrice(priceData[priceData.length - 1].close);
        setFocusedDate(
          new Date(lastDate).toLocaleDateString("tr-TR", dateOptions)
        );
      } else {
        const date = new Date(time * 1000).toLocaleDateString(
          "tr-TR",
          dateOptions
        );
        setPrice(seriesPrices.get(candleSeries).close);
        setFocusedDate(date);
      }
    });

    // const areaSeries = chart.current.addAreaSeries({
    //   topColor: 'rgba(38,198,218, 0.56)',
    //   bottomColor: 'rgba(38,198,218, 0.04)',
    //   lineColor: 'rgba(38,198,218, 1)',
    //   lineWidth: 2
    // });

    // areaSeries.setData(areaData);

    //const volumeSeries = chart.current.addHistogramSeries({
    //  color: '#182233',
    //  lineWidth: 2,
    //  priceFormat: {
    //    type: 'volume',
    //  },
    //  overlay: true,
    //   scaleMargins: {
    //     top: 0.8,
    //     bottom: 0,
    //   },
    // });

    // volumeSeries.setData(volumeData);
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
  }, []);

  return (
    <>
      <h1>TRY/USD</h1>
      <h2>{price.toFixed(2)} TL</h2>
      <h4>{focusedDate}</h4>
      <button
        onClick={() => {
          setReset(!reset);
        }}
      >
        Reset
      </button>
      <div ref={chartContainerRef} className="chart-container" />
    </>
  );
}
