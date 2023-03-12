import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import styled from "styled-components";

import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

export const SearchCryptoWrapper = styled.div`
  margin: 20px auto 30px auto;
  width: 250px;
`;

export const CryptoCardContainerWrapper = styled(Row)`
  min-height: 65vh;
`;

export const CryptoCardWrapper = styled(Col)`
  min-width: 250px;
`;

export const CryptoImageWrapper = styled.img`
  width: 35px;
`;

const CryptoCurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <SearchCryptoWrapper>
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </SearchCryptoWrapper>
      )}
      <CryptoCardContainerWrapper gutter={[32, 32]}>
        {cryptos?.map((currency) => (
          <CryptoCardWrapper xs={24} sm={12} lg={6} key={currency.uuid}>
            {/* Note: Change currency.id to currency.uuid  */}
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<CryptoImageWrapper alt="crypto" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </CryptoCardWrapper>
        ))}
      </CryptoCardContainerWrapper>
    </>
  );
};

export default CryptoCurrencies;
