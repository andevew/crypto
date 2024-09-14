import "./css/App.css";
import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import {Spin} from 'antd';
import axios from 'axios';
import CurrencyCard from './components/CurrencyCard';

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [currencyId, setCurrencyId] = useState(1);
  const [currencyData, setCurrencyData] = useState(null);

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/cryptocurrencies');
      const currenciesResponse = response.data;

      const childrenItems = currenciesResponse.map((currency) => ({
        key: currency.id.toString(), 
        label: currency.name,
      }));

    
      const menuItems = [
        {
          key: 'sub1',
          label: 'Coins List',
          children: childrenItems,
        },
      ];

      setCurrencies(menuItems);
    } catch (error) {
      console.error('Failed to fetch currencies:', error);
    }
  };

  const fetchCurrency = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/cryptocurrencies/${currencyId}`);
      setCurrencyData(response.data);
    } catch (error) {
      console.error('Failed to fetch currency:', error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    setCurrencyData(null);
    fetchCurrency();
  }, [currencyId]);

  const onClick = (e) => {
    setCurrencyId(parseInt(e.key)); // Встановлюємо числовий id валюти
  };

  return (
    <div className='wrapper'>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']} // Початково вибираємо Bitcoin (id=1)
        defaultOpenKeys={['sub1']} // Відкриваємо підменю
        mode="inline"
        items={currencies}
        className="menu"
      /> 
      {currencyData ? <CurrencyCard currency={currencyData}/> : <Spin className="spin" size="large"/>}
    </div>
  );
};

export default App;
