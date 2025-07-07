import React, { useContext, useEffect, useState } from 'react'
import { Layout, Select, Space, Button, Modal } from 'antd';
import CryptoContex from '../../context/CryptoContext';
import { ICoin } from '../../types';

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

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coin, setCoin] = useState<ICoin | null>(null);
  const { crypto } = useContext(CryptoContex);

  const handleSelect = (value: string) => {
    console.log(value);
    setIsModalOpen(true);
    setCoin(crypto?.find(c => c.id === value))
  }

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
      <Modal
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <h1>{coin?.name}</h1>
      </Modal>
    </Layout.Header>
  )
}
