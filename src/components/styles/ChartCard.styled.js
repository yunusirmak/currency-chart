import styled from "styled-components";

export const ChartCard = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  height: 600px;
  max-width: 700px;
  min-width: 300px;
  background-color: #1e2126;
  border-radius: 10px;
  padding: 30px;
  border: 1px solid darkgray;
  font-size: 1em;
  @media (max-width: 1020px) {
    height: 700px;
  }
`;

export const CandleChart = styled.div`
  flex: 1;
  max-height: 400px;
  max-width: 700px;
  margin-bottom: 40px;
  margin-top: 10px;
  @media (max-width: 740px) {
    max-height: 300px;
  }
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
  @media (max-width: 1020px) {
    flex-direction: column;
    justify-content: space-between;
  }
`;
export const PriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 420px) {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  @media (min-width: 1020px) {
    width: 410px;
  }
`;
export const ChartBottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  @media (max-width: 520px) {
    flex-direction: column;
    justify-content: space-between;
  }
  @media (max-width: 1020px) {
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  margin-top: 20px;

  @media (max-width: 520px) {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-top: 20px;
    width: 100%;
  }
  @media (min-width: 1020px) {
    width: 460px;
    margin: 0;
  }
`;
