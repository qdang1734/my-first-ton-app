import { TonConnectButton, useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { toNano } from 'ton-core';

// **** THAY ĐỊA CHỈ VÍ NÓNG CỦA BẠN VÀO ĐÂY ****
const GAME_HOT_WALLET = 'UQDf_BlFDdYBVUudGOVCJ846issTL-mLpW6QfC93lg5MrbiY'; // <-- THAY THẾ!

type WalletPageProps = {
  setPage: (page: 'home' | 'wallet') => void;
};

export function WalletPage({ setPage }: WalletPageProps) {
  const userFriendlyAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  const handleDeposit = async () => {
    if (!userFriendlyAddress) {
      alert('Vui lòng kết nối ví trước khi nạp tiền!');
      return;
    }

    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 600, // Giao dịch hợp lệ trong 10 phút
      messages: [
        {
          address: GAME_HOT_WALLET,
          amount: toNano('0.5').toString(), // Số tiền nạp: 0.5 TON. Bạn có thể thay đổi.
          payload: 'Deposit to KittyMint Game' // Lời nhắn kèm theo (tùy chọn)
        }
      ]
    };

    try {
      await tonConnectUI.sendTransaction(transaction);
      alert('Giao dịch đã được gửi đi! Vui lòng chờ xác nhận trên blockchain.');
    } catch (error) {
      console.error('Lỗi khi gửi giao dịch:', error);
      alert('Đã xảy ra lỗi hoặc người dùng đã hủy giao dịch.');
    }
  };

  return (
    <div className="wallet-page">
      <h2 className="wallet-header">Ví của tôi</h2>

      <div className="wallet-info">
        {userFriendlyAddress ? (
          <>
            <p>Số dư trong game: <strong>0.00 GEM</strong></p>
            <p className="wallet-address">Địa chỉ ví của bạn: {userFriendlyAddress}</p>
          </>
        ) : (
          <p>Vui lòng kết nối ví để xem thông tin.</p>
        )}
        <div className='ton-connect-button'>
            <TonConnectButton />
        </div>
      </div>

      <div className="wallet-actions">
        <button className="action-button" onClick={handleDeposit}>Nạp 0.5 TON</button>
        <button className="action-button" disabled>Rút Tiền</button>
      </div>

      {/* Navigation Bar */}
      <div className="nav-bar">
        <button className="nav-button" onClick={() => setPage('home')}>Home</button>
        {/* ... other nav buttons ... */}
        <button className="nav-button active">Wallet</button>
      </div>
    </div>
  );
}