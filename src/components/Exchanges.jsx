import React from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";
import styled from "styled-components";
import CrytoExchangeMockData from '../data/CrytoExchangeMockData.json'

// import { useGetExchangesQuery } from '../services/cryptoApi';

const { Text } = Typography;
const { Panel } = Collapse;

export const ExchangeImageWrapper = styled(Avatar)`
  margin: 0px 10px;
`;

export const ExchangeContainerWrapper = styled.div`
  height: 100vh;
`;

const Exchanges = () => {
  // Note: To access this endpoint you need premium plan
  // const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = CrytoExchangeMockData.data?.exchanges;

  return (
    <ExchangeContainerWrapper>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse style={{ margin: "5px" }}>
              <Panel
                key={exchange.uuid}
                showArrow={false}
                header={
                  <Row key={exchange.uuid}>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange.rank}.</strong>
                      </Text>
                      <ExchangeImageWrapper src={exchange.iconUrl} />
                      <Text>
                        <strong>{exchange.name}</strong>
                      </Text>
                    </Col>
                    <Col span={6}>${millify(exchange.volume)}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                  </Row>
                }
              >
                {HTMLReactParser(exchange.description || "")}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </ExchangeContainerWrapper>
  );
};

export default Exchanges;
