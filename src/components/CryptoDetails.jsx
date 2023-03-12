import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from "../services/cryptoApi";
import Loader from "./Loader";
import LineChart from "./LineChart";

const { Title, Text } = Typography;
const { Option } = Select;

export const CoinDetailContainerWrapper = styled(Col)`
  margin: 30px;

  @media screen and (max-width: 500px) {
    margin: 0;
  }
`;

export const CoinHeadingContainerWrapper = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-bottom: 1px solid #d9d9d9;
  padding-top: 20px;
  padding-bottom: 20px;
  gap: 10px;

  p {
    font-size: 1rem;
    opacity: 0.9;
    margin-bottom: 20px;
  }
`;

export const CoinNameWrapper = styled(Title)`
  font-weight: 900;
  color: var(#004877);
`;

export const StatsContainerWrapper = styled(Col)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;

  h2 {
    font-weight: 700;
    font-size: 1.4rem;
    margin-top: 20px;
    color: var(#004877);
  }

  @media screen and (max-width: 1000px) {
    flex-direction: column;

    h2 {
      margin-top: 0px;
    }
  }
`;

export const CoinDetailsHeadingWrapper = styled(Title)`
  font-weight: 700;
  margin-top: 20px;
  color: var(#004877);
`;

export const CoinStatsWrapper = styled(Col)`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d9d9d9;
  font-size: 1rem;
  opacity: 0.9;
  padding: 20px;
`;

export const CoinStatsNameWrapper = styled(Col)`
  display: flex;
  gap: 10px;
  font-size: 1rem;
`;

export const StatsWrapper = styled(Text)`
  font-weight: 800;
`;

export const CoinDescLinkWrapper = styled(Col)`
  display: flex;
  gap: 40px;
  margin-top: 40px;
  padding-top: 20px;

  h2 {
    font-weight: 700;
    color: var(#004877);
  }

  p {
    font-size: 1rem;
    opacity: 0.9;
  }

  a {
    color: var(#004877);
  }

  h3 {
    font-weight: 700;
  }

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const CoinValueStatisticsHeadingWrapper = styled(Col)`
  p {
    font-size: 1rem;
    opacity: 0.9;
  }
`;

export const CoinDescWrapper = styled(Row)`
  flex-direction: column;
  flex: 0.5;
  line-height: 2rem;
`;

export const CoinLinksWrapper = styled(Col)`
  flex: 0.5;

  @media screen and (max-width: 500px) {
    padding: 0px;
  }
`;

export const CoinLinkWrapper = styled(Row)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
  padding: 20px;

  a {
    color: var(#004877);
    font-weight: 700;
    font-size: 1rem;
  }
`;

export const LinkNameWrapper = styled(Title)`
  text-transform: capitalize;
  font-size: 1rem;
`;

export const SelectTimeperiodWrapper = styled(Select)`
  width: 200px;
  margin-top: 20px;
`;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState("7d");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });
  const cryptoDetails = data?.data?.coin;
  if (isFetching) return <Loader />;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Approved Supply",
      value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <CoinDetailContainerWrapper>
      <CoinHeadingContainerWrapper>
        <CoinNameWrapper level={2}>
          {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
        </CoinNameWrapper>
        <p>
          {cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and
          supply.
        </p>
      </CoinHeadingContainerWrapper>
      <SelectTimeperiodWrapper
        defaultValue="7d"
        style={{ width: "200px", marginTop: "20px" }}
        placeholder="Select Timeperiod"
        onChange={(value) => setTimeperiod(value)}
      >
        {time.map((date) => (
          <Option key={date}>{date}</Option>
        ))}
      </SelectTimeperiodWrapper>

      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails?.price)}
        coinName={cryptoDetails?.name}
      />
      <StatsContainerWrapper>
        <Col className="coinvalueStatistics">
          <CoinValueStatisticsHeadingWrapper>
            <CoinDetailsHeadingWrapper level={3}>
              {cryptoDetails.name} Value Statistics
            </CoinDetailsHeadingWrapper>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such as the base and quote
              currency, the rank, and trading volume.
            </p>
          </CoinValueStatisticsHeadingWrapper>
          {stats.map(({ icon, title, value }) => (
            <CoinStatsWrapper key={title}>
              <CoinStatsNameWrapper>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </CoinStatsNameWrapper>
              <StatsWrapper>{value}</StatsWrapper>
            </CoinStatsWrapper>
          ))}
        </Col>
        <Col style={{}} className="otherStatsInfo">
          <CoinValueStatisticsHeadingWrapper>
            <CoinDetailsHeadingWrapper level={3}>Other Stats Info</CoinDetailsHeadingWrapper>
            <p>
              Extra info such as Number Of Markets, Number Of Exchanges, Approved Supply, Total
              Supply, Circulating Supply.
            </p>
          </CoinValueStatisticsHeadingWrapper>
          {genericStats.map(({ icon, title, value }) => (
            <CoinStatsWrapper key={title}>
              <CoinStatsNameWrapper>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </CoinStatsNameWrapper>
              <Text className="stats">{value}</Text>
            </CoinStatsWrapper>
          ))}
        </Col>
      </StatsContainerWrapper>
      <CoinDescLinkWrapper>
        <CoinDescWrapper>
          <Title level={3} className="coinDetailsHeading">
            What is {cryptoDetails.name}?
          </Title>
          {HTMLReactParser(cryptoDetails.description)}
        </CoinDescWrapper>
        <CoinLinksWrapper>
          <Title level={3} className="coinDetailsHeading">
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links?.map((link) => (
            <CoinLinkWrapper key={link.name}>
              <LinkNameWrapper level={5}>{link.type}</LinkNameWrapper>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </CoinLinkWrapper>
          ))}
        </CoinLinksWrapper>
      </CoinDescLinkWrapper>
    </CoinDetailContainerWrapper>
  );
};

export default CryptoDetails;
