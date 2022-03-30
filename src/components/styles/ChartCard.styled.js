import styled from "styled-components";

export const ChartCard = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  height: 600px;
  max-width: 700px;
  background-color: #1e2126;
  border-radius: 10px;
  padding: 30px;
  border: 1px solid darkgray;
  font-size: 1em;
`;

export const CandleChart = styled.div`
  flex: 1;
  max-height: 400px;
  max-width: 700px;
  margin-bottom: 40px;
  margin-top: 10px;
`;

export const ChartButton = styled.div`
  font-weight: bold;
  padding: 5px;
  width: 100px;
  height: 50px;
  text-align: center;
  border-radius: 10px;
  border: 1px solid darkgray;
  cursor: pointer;
  &:hover {
    background-color: floralwhite;
    color: black;
  }
`;

export const ChartText = styled.p`
  font-size: ${(props) => props.fontSize || "1em"};
  font-weight: ${(props) => props.fontWeight || "bold"};
  margin: 0;
`;
export const ChartTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 150px;
`;
export const ChartTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0;
`;
export const ChartBottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0;
`;
