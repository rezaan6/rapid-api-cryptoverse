
import React, { useState } from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

// import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';
import axios from 'axios';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  // const { data, isFetching } = useGetExchangesQuery();

  const [exchangesList, setExchangesList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  axios
    .get("https://run.mocky.io/v3/d03505ed-caf6-4c2a-8e45-f2c0ae00f86b")
    .then((response) => {
      setExchangesList(response.data.data.exchanges);
      setIsFetching(false);
    }).catch((err) => {
      setIsFetching(false);
      console.log(err);
    });
  // const exchangesList = data?.data?.exchanges;
  // Note: To access this endpoint you need premium plan
  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row >
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse style={{margin:"5px"}}>
              <Panel
                key={exchange.uuid}
                showArrow={false}
                header={(
                  <Row key={exchange.uuid}>
                    <Col span={6}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchangeImage" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange.volume)}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                  </Row>
                )}
              >
                {HTMLReactParser(exchange.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
