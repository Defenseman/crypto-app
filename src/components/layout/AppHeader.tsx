import React, { useContext, useEffect, useState } from 'react'
import { Layout, Select, Space, Button } from 'antd';
import CryptoContex from '../../context/CryptoContext';

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#4096ff',
};


const handleSelect = (value: string) => {
  console.log(value);
}

export default function AppHeader() {
  const [select, setSelect] = useState(false)
  const { crypto } = useContext(CryptoContex)
  
  useEffect(() => {
    const keypress = (event) => {
      if(event.key === '/') {
        setSelect(prev => !prev)
      }  
    }
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  }, [])
  
  return (
    <Layout.Header style={headerStyle}>
      <Select
        value='press / to open'
        style={{width: 250, textAlign: 'start'}}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect(prev => !prev)}
        options={crypto?.map(coin => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => ( // ant design сам оборачивает всё в options.data
      <Space>
        <img style={{width: '20px'}} src={option.data.icon} alt={option.data.label} /> {option.data.label}
      </Space>
    )}
      />
      <Button type='primary'>Add Asset</Button>
    </Layout.Header>
  )
}
