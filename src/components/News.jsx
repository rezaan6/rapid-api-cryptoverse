import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import styled from "styled-components";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import Loader from "./Loader";

const demoImage = "/demoImage.webp";

const { Text, Title } = Typography;
const { Option } = Select;

export const SelectNewsWrapper = styled(Select)`
  width: 180px;
`;

export const NewsCardWrapper = styled(Card)`
  min-height: 300px;

   {
    color: black;
    margin: 10px 0px;
  }
`;

export const NewsImageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  img {
    width: 100px;
    height: 100px;
  }
`;

export const NewsTitleWrapper = styled(Title)`
  width: 70%;
  padding-inline: 7px;
`;

export const ProviderContainerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ProviderNameWrapper = styled(Text)`
  margin-left: 10px;
`;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  if (!cryptoNews?.value) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <SelectNewsWrapper
            showSearch
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency) => (
              <Option value={currency.name}>{currency.name}</Option>
            ))}
          </SelectNewsWrapper>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <NewsCardWrapper hoverable>
            <a href={news.url} target="_blank" rel="noreferrer">
              <NewsImageWrapper>
                <NewsTitleWrapper level={4}>{news.name}</NewsTitleWrapper>
                <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
              </NewsImageWrapper>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <ProviderContainerWrapper>
                <div>
                  <Avatar
                    src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage}
                    alt="avatar"
                  />
                  <ProviderNameWrapper>{news.provider[0]?.name}</ProviderNameWrapper>
                </div>
                <Text>{moment(news.datePublished).startOf("ss").fromNow()}</Text>
              </ProviderContainerWrapper>
            </a>
          </NewsCardWrapper>
        </Col>
      ))}
    </Row>
  );
};

export default News;
