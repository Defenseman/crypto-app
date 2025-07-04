import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { GetCoins } from '../../api';
import type { ICoin } from '../../types';

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
};


export default function AppContent() {
  const [coins, setCoins] = useState<ICoin[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetCoins();
      setCoins(data);
    }
    fetchData()
  }, [])

  return (
    <Layout.Content style={contentStyle}> 
      {coins.map((coin) => (
        <li key={coin.id}>{coin.name}</li>
      ))}
    </Layout.Content>
)}
