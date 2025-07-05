import AppHeader from './components/layout/AppHeader';
import AppSider from './components/layout/AppSider';
import { Layout } from 'antd';
import AppContent from './components/layout/AppContent';
import AppFooter from './components/layout/AppFooter';
import { CryptoContexProvider } from './context/CryptoContext';

function App() {
  return (
    <CryptoContexProvider>
      <Layout >
        <AppHeader />
        <Layout>
          <AppSider />
          <AppContent />
        </Layout>
        <AppFooter />
      </Layout>
    </CryptoContexProvider>
  )
};

export default App;