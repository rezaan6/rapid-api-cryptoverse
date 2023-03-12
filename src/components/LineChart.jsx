import React from "react";
import { Col, Row, Typography } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styled from "styled-components";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const ChartHeaderWrapper = styled(Row)`
  display: flex;
  justify-content: space-between;
  gap: 50px;
  color: #0071bd;
`;

export const ChartTitleWrapper = styled(Typography.Title)`
  display: flex;
  justify-content: space-between;
  gap: 50px;
  color: #0071bd;
`;

export const PriceContainerWrapper = styled(Col)`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
`;

export const PriceChangeWrapper = styled(Typography.Title)`
  font-weight: 900;
`;

export const CurrentPriceWrapper = styled(Typography.Title)`
  margin-top: 0px;
  font-weight: 900;
`;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
  }
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <>
      <ChartHeaderWrapper>
        <ChartTitleWrapper level={2}>{coinName} Price Chart </ChartTitleWrapper>
        <PriceContainerWrapper>
          <PriceChangeWrapper level={5}>Change: {coinHistory?.data?.change}%</PriceChangeWrapper>
          <CurrentPriceWrapper level={5}>
            Current {coinName} Price: $ {currentPrice}
          </CurrentPriceWrapper>
        </PriceContainerWrapper>
      </ChartHeaderWrapper>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
