type HomePageProps = {
  setPage: (page: 'home' | 'wallet') => void;
};

export function HomePage({ setPage }: HomePageProps) {
  return (
    <div className="app-container">
      {/* Header */}
      <div className="header">
        <div className="user-info">
          <h2>Quang Dang</h2>
          <p>Golden Gladiator</p>
        </div>
        <span>KittyMint</span>
      </div>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-item">
          <h3>5.7788</h3>
          <p>Total Reward</p>
        </div>
        <div className="stat-item">
          <h3>0.0000</h3>
          <p>Daily Reward</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <p style={{fontSize: '80px', margin: '20px'}}>🎁</p>
        <button className="action-button">0.1 💎 What's Inside?</button>
      </div>

      {/* Navigation Bar */}
      <div className="nav-bar">
        <button className="nav-button active">Home</button>
        <button className="nav-button">Stats</button>
        <button className="nav-button">Invite</button>
        <button className="nav-button">Quest</button>
        <button className="nav-button" onClick={() => setPage('wallet')}>Wallet</button>
      </div>
    </div>
  );
}