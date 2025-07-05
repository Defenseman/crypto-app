import React, { useContext } from 'react'
import { Layout, Card, Statistic, List, Typography, Spin, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import CryptoContex from '../../context/CryptoContext';
import { capitalaze } from '../../utils';
import type { IContextType } from '../../types';

const siderStyle: React.CSSProperties = {
  padding: '1rem',
};

export default function AppSider() {
  const {assets, isLoading} = useContext<IContextType>(CryptoContex)
  
  if(isLoading) {
    return <Spin fullscreen />
  }

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map(asset => (
        <Card key={asset.id} style={{marginBottom: '1rem'}}>
          <Statistic 
            title={capitalaze(asset.id)}
            value={asset.totalAmount}
            precision={0}
            valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
        <List
          size='small'
          bordered
          dataSource={[
            {title: 'Total profit', value: asset.totalProfit, withTag: true},
            {title: 'Asset amount', value: asset.amount, isPlain: true},
          ]}
          renderItem={(item) => (
          <List.Item>
            <span>{item.title}</span>
            <span>
              {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}
              {item.isPlain && <span>{item.value}</span>}
              {!item.isPlain &&
                  <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                  {item.value?.toFixed(2)}$
                  </Typography.Text>
              }
            </span>
          </List.Item>
        )}
        />
        </Card>
      ))}
    </Layout.Sider>
    )
}
