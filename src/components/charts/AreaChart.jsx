import { useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { CandleChart } from "../styles/ChartCard.styled";
import { updatePrice, updateFocusedDate } from "../../redux/chartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function AreaChart() {
  const chartContainerRef = useRef(null);
  const chart = useRef(null);
  const resizeObserver = useRef(null);
  const dispatch = useDispatch();
  const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const { chartData, lastDate } = useSelector((state) => state.chart);

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

      timeScale: {
        borderColor: "transparent",
      },
    });

    chart.current.applyOptions({
      watermark: {
        color: "#eb872e",
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

    const areaSeries = chart.current.addAreaSeries({
      topColor: "rgba(75,255,181,0.56)",
      bottomColor: "rgba(75,255,181,0.04)",
      lineColor: "rgba(75,255,181,1)",
      lineWidth: 2,
    });

    areaSeries.setData(
      chartData.map((prevValue) => {
        return {
          time: Date.parse(prevValue.date) / 1000,
          value: prevValue.close,
        };
      })
    );

    chart.current.subscribeCrosshairMove(({ time, seriesPrices, point }) => {
      // if point is out of range, display the last value. if not, display the value of the point.
      if (
        point === undefined ||
        !time ||
        point.x < 0 ||
        point.x > chart.current.width ||
        point.y < 0 ||
        point.y > chart.current.height
      ) {
        dispatch(updatePrice(chartData[chartData.length - 1].close));
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
        dispatch(updatePrice(seriesPrices.get(areaSeries)));
        dispatch(updateFocusedDate(date));
      }
    });
    return () => {
      chart.current.remove();
    };
    // eslint-disable-next-line
  }, [chartData]);

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
  }, [chartData]);

  return <CandleChart ref={chartContainerRef} />;
}
