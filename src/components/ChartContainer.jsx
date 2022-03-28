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

export default function ChartContainer() {
  const dispatch = useDispatch();
  const { price, focusedDate, chartType } = useSelector((state) => state.chart);
  return (
    <ChartCard>
      <ChartTopContainer>
        <ChartTextContainer>
          <ChartText fontSize="1.5em" fontWeight="500">
            TRY/USD
          </ChartText>
          <ChartText fontSize="2em" fontWeight="600">
            {price.toFixed(2)} TL
          </ChartText>
          <ChartText fontSize="1em" fontWeight="300">
            {focusedDate}
          </ChartText>
        </ChartTextContainer>
        <ChartButton
          onClick={() => {
            dispatch(updateReset());
          }}
        >
          Reset
        </ChartButton>
        <ChartTypeToggler />
      </ChartTopContainer>

      {chartType === "candle" ? <CandleStickChart /> : <ColumnChart />}
    </ChartCard>
  );
}
