import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// URL PRODUCTION CHÍNH XÁC CỦA BẠN
const VERCEL_URL = 'https://my-first-ton-app.vercel.app';

// Tự động tạo manifest từ URL trên
const manifest = {
  url: VERCEL_URL,
  name: 'KittyMint Game',
  iconUrl: `${VERCEL_URL}/icon.png`,
};

// Tạo manifestUrl dưới dạng data URI để không cần dùng file .json riêng
const manifestUrl = `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(manifest))}`;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </TonConnectUIProvider>
);