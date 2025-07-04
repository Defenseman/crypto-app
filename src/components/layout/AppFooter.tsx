import React from 'react';
import { Layout } from 'antd';


const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};

export default function AppFooter() {
  return <Layout.Footer style={footerStyle}>Footer</Layout.Footer>
}
