import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useGetCryptosQuery } from "../services/cryptoApi";
import CryptoCurrencies from "./CryptoCurrencies";
import News from "./News";
import Loader from "./Loader";

const { Title } = Typography;

export const HomeTitleWrapper = styled(Title)`
  @media screen and (max-width: 800px) {
    font-size: 1.4rem;
  }
`;

export const ShowMoreWrapper = styled(Title)`
  margin-top: 0px;
  @media screen and (max-width: 800px) {
    font-size: 1.3rem;
  }
`;

export const HeadingWrapper = styled(Title)`
  @media screen and (max-width: 500px) {
    margin-top: 20px;
  }
`;

export const HomeHeadingContainerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

export const LinkWrapper = styled(Link)`
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  text-transform: uppercase;
`;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <>
      <HeadingWrapper level={2}>Global Crypto Stats</HeadingWrapper>
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Statistic title="Total CryptoCurrencies" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap:" value={`$${millify(globalStats.totalMarketCap)}`} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volume" value={`$${millify(globalStats.total24hVolume)}`} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} />
        </Col>
      </Row>
      <HomeHeadingContainerWrapper>
        <HomeTitleWrapper level={2}>Top 10 Cryptos In The World</HomeTitleWrapper>
        <ShowMoreWrapper level={3}>
          <LinkWrapper to="/cryptocurrencies">Show more</LinkWrapper>
        </ShowMoreWrapper>
      </HomeHeadingContainerWrapper>
      <CryptoCurrencies simplified />
      <HomeHeadingContainerWrapper>
        <HomeTitleWrapper level={2}>Latest Crypto News</HomeTitleWrapper>
        <Title level={3}>
          <LinkWrapper to="/news">Show more</LinkWrapper>
        </Title>
      </HomeHeadingContainerWrapper>
      <News simplified />
    </>
  );
};

export default Homepage;
