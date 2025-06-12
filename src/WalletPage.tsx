import { TonConnectButton, useTonAddress } from '@tonconnect/ui-react';

type WalletPageProps = {
  setPage: (page: 'home' | 'wallet') => void;
};

export function WalletPage({ setPage }: WalletPageProps) {
  const userFriendlyAddress = useTonAddress();

  return (
    <div className="wallet-page">
      <h2 className="wallet-header">Ví Của Tôi</h2>

      <div className="wallet-info">
        {userFriendlyAddress ? (
          <>
            <p>Số dư: <strong>0.00 TON</strong></p>
            <p className="wallet-address">Địa chỉ: {userFriendlyAddress}</p>
          </>
        ) : (
          <p>Vui lòng kết nối ví để xem thông tin.</p>
        )}
        <div className='ton-connect-button'>
            <TonConnectButton />
        </div>
      </div>

      <div className="wallet-actions">
        <button className="action-button">Nạp TON</button>
        <button className="action-button">Rút TON</button>
      </div>

      {/* Navigation Bar */}
      <div className="nav-bar">
        <button className="nav-button" onClick={() => setPage('home')}>Home</button>
        <button className="nav-button">Stats</button>
        <button className="nav-button">Invite</button>
        <button className="nav-button">Quest</button>
        <button className="nav-button active">Wallet</button>
      </div>
    </div>
  );
}