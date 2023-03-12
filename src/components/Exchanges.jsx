import React, { useState } from "react";
import millify from "millify";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import HTMLReactParser from "html-react-parser";
import styled from "styled-components";

// import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from "./Loader";
import axios from "axios";

const { Text } = Typography;
const { Panel } = Collapse;

export const ExchangeImageWrapper = styled(Avatar)`
  margin: 0px 10px;
`;

export const ExchangeContainerWrapper = styled.div`
  height: 100vh;
`;

const Exchanges = () => {
  // const { data, isFetching } = useGetExchangesQuery();

  const [exchangesList, setExchangesList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  axios
    .get("https://run.mocky.io/v3/dac5adfa-d191-4401-83d3-c876a5c723b1")
    .then((response) => {
      setExchangesList(response.data.data.exchanges);
      setIsFetching(false);
    })
    .catch((err) => {
      setIsFetching(false);
      console.log(err);
    });
  // const exchangesList = data?.data?.exchanges;
  // Note: To access this endpoint you need premium plan
  if (isFetching) return <Loader />;

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
