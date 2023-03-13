import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

import icon from "../images/cryptoCurrency.png";

export const NavContainerWrapper = styled.div`
  position: fixed;
  left: 0;
  margin: 10px;
  height: 100vh;
  margin: 0px;
  background-color: rgb(0, 21, 41);

  @media screen and (max-width: 800px) {
    height: 8vh;
    position: fixed;
    width: 100%;
    z-index: 100;
    background-color: #f9f9f9;
  }
`;

export const LogoContainerWrapper = styled.div`
  background-color: #001529;
  display: flex;
  padding: 20px;
  width: 100%;
`;

export const LogoWrapper = styled.div`
  margin: 0 0 0 15px;
`;

export const LogoLink = styled(Link)`
  color: white !important;
  font-weight: 700;
  font-size: 24px;
  padding-inline: 9px;
  padding-block: 4px;
  border-radius: 4px;
`;

export const MenuControlContainerWrapper = styled(Button)`
  display: none;
  position: absolute;
  right: 10px;
  top: 25px;
  background-color: #f9f9f9;
  border: none;

  @media screen and (max-width: 800px) {
    display: block;
  }
`;

export const MenuWrapper = styled(Menu)`
  padding-inline: 10px;
`;

const Navbar = () => {
  const menuItems = [
    { icon: <HomeOutlined />, key: "/", label: "Home" },
    { icon: <FundOutlined />, key: "/cryptocurrencies", label: "Cryptocurrencies" },
    { icon: <MoneyCollectOutlined />, key: "/exchanges", label: "Exchanges" },
    { icon: <BulbOutlined />, key: "/news", label: "News" },
  ];

  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const [current, setCurrent] = useState("");

  const navigate = useNavigate();

  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };
  const location = useLocation();

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);
  return (
    <NavContainerWrapper>
      <LogoContainerWrapper>
        <Avatar src={icon} size="large" />
        <LogoWrapper>
          <Typography.Title level={2}>
            <LogoLink to="/">CryptoVerse</LogoLink>
          </Typography.Title>
        </LogoWrapper>

        <MenuControlContainerWrapper onClick={() => setActiveMenu(!activeMenu)}>
          <MenuOutlined />
        </MenuControlContainerWrapper>
      </LogoContainerWrapper>
      {activeMenu && (
        <MenuWrapper
          onClick={onClick}
          selectedKeys={[current]}
          theme="dark"
          mode="vertical"
          items={menuItems}
        />
      )}
    </NavContainerWrapper>
  );
};

export default Navbar;
