import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import icon from '../images/cryptoCurrency.png';

const Navbar = () => {
  // const menuItems = [
  //   { icon: <HomeOutlined />, link: '/', label: 'Home' },
  //   { icon: <FundOutlined />, link: '/cryptocurrencies', label: 'Cryptocurrencies' },
  //   { icon: <MoneyCollectOutlined />, link: '/exchanges', label: 'Exchanges' },
  //   { icon: <BulbOutlined />, link: '/news', label: 'News' },
  // ];

  // const menuItems = [
  //   { icon: <HomeOutlined />, key: <a href="/">Home</a>, label: 'Home' },
  //   { icon: <FundOutlined />, key: <a href="/cryptocurrencies">CryptoCurrencies</a>, label: 'CryptoCurrencies' },
  //   { icon: <MoneyCollectOutlined />, key: <a href="/exchanges">Exchanges</a>, label: 'Exchanges' },
  //   { icon: <BulbOutlined />, key: <a href="/news">News</a>, label: 'News' },
  // ];

  const menuItems = [
    { icon: <HomeOutlined />, key: '/', label: 'Home' },
    { icon: <FundOutlined />, key: '/cryptocurrencies', label: 'Cryptocurrencies' },
    { icon: <MoneyCollectOutlined />, key: '/exchanges', label: 'Exchanges' },
    { icon: <BulbOutlined />, key: '/news', label: 'News' },
  ];

  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const [current, setCurrent] = useState('');


  const navigate = useNavigate();

  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key);

  };
  const location = useLocation();

  useEffect(() => {
    setCurrent(location.pathname);

  }, [location])
  return (
    <div className="navContainer">
      <div className="logoContainer">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo"><Link to="/">Cryptoverse</Link></Typography.Title>
        <Button className="menuControlContainer" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
      </div>
      {activeMenu && (
        <Menu onClick={onClick} selectedKeys={[current]} theme="dark" mode="vertical" items={menuItems} />
      )}
    </div>
  );
};

export default Navbar;