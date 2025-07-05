import React, { useEffect, useState } from 'react'
import { Layout, Card, Statistic, List, Typography, Spin, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { getAssets, getCrypto } from '../../api';
import type { ICoin, IAsset } from '../../types';
import { percentDiffernce, capitalaze } from '../../utils';

const siderStyle: React.CSSProperties = {
  padding: '1rem',
};

export default function AppSider() {
  const [crypto, setCrypto] = useState<ICoin[]>([]);
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const preload = async () => {
      setIsLoading(true)
      const cryptoData = await getCrypto();
      const userAssets = await getAssets();

      setAssets(
        userAssets.map(asset => {
          const coin = cryptoData.find(c => c.id === asset.id);
          return {
            grow: asset.price < coin?.price,
            growPercent: percentDiffernce(asset.price, coin?.price),
            totalAmount: asset.amount * coin?.price,
            totalProfit: asset.amount * coin?.price - asset.amount * asset.price,
            ...asset,
          }
        })
      );
      setCrypto(cryptoData);
      setIsLoading(false);
    }
    preload()
  }, [])

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
            precision={0} // Знаков после запятой 
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
