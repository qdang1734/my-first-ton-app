import { useState } from 'react';
import './App.css';
import { HomePage } from './HomePage';
import { WalletPage } from './WalletPage';

function App() {
  const [page, setPage] = useState<'home' | 'wallet'>('home');

  return (
    <>
      {page === 'home' && <HomePage setPage={setPage} />}
      {page === 'wallet' && <WalletPage setPage={setPage} />}
    </>
  )
}

export default App