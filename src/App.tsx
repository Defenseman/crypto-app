import { CryptoContexProvider } from './context/CryptoContext';
import { AppLayout } from './components/layout/AppLayout';

function App() {
  return (
    <CryptoContexProvider>
      <AppLayout />
    </CryptoContexProvider>
  )
};

export default App;