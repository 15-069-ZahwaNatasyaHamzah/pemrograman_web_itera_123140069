import React from 'react';
import useBookStats from '../../hooks/useBookStats';

function Stats() {
  const { total, owned, reading, toBuy } = useBookStats();

  return (
    <div className="card">
      <h2>Statistik Buku</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-number">{total}</div>
          <div className="stat-label">Total Buku</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{owned}</div>
          <div className="stat-label">Buku Dimiliki</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{reading}</div>
          <div className="stat-label">Sedang Dibaca</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{toBuy}</div>
          <div className="stat-label">Ingin Dibeli</div>
        </div>
      </div>
    </div>
  );
}

export default Stats;