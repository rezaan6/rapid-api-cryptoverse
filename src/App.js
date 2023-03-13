import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import styled from "styled-components";

import { Exchanges, Homepage, News, CryptoCurrencies, CryptoDetails, Navbar } from "./components";
import "./App.css";

export const AppWrapper = styled.div`
  display: flex;
  overflow: hidden;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

export const NavbarWrapper = styled.div`
  flex: 0.2;
  min-width: 260px;
  background-color: rgb(0, 21, 41);

  @media screen and (max-width: 800px) {
    flex: 1;
  }
`;

export const MainWrapper = styled.div`
  flex: 0.8;
  width: 100vh;
  min-height: 100vh;

  @media screen and (max-width: 800px) {
    flex: 1;
    margin-top: 90px;
    margin-left: 0px;
    margin-right: 10px;
    width: 100%;
  }
`;

export const RoutesWrapper = styled.div`
  padding: 20px;
`;

export const FooterWrapper = styled.div`
  background-color: #001529;
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
  height: 100%;
`;

const App = () => (
  <AppWrapper>
    <NavbarWrapper>
      <Navbar />
    </NavbarWrapper>
    <MainWrapper>
      <Layout>
        <RoutesWrapper>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/exchanges" element={<Exchanges />} />
            <Route exact path="/cryptocurrencies" element={<CryptoCurrencies />} />
            <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
            <Route exact path="/news" element={<News />} />
          </Routes>
        </RoutesWrapper>
      </Layout>
      <FooterWrapper>
        <Typography.Title level={5} style={{ color: "white", textAlign: "center" }}>
          Copyright ©<Link to="/"> Cryptoverse Inc.</Link> <br />
          This is a Personal Project.
        </Typography.Title>
        <Space>
          <Link to="/">Home</Link>
          <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          <Link to="/exchanges">Exchanges</Link>
          <Link to="/news">News</Link>
        </Space>
      </FooterWrapper>
    </MainWrapper>
  </AppWrapper>
);

export default App;
