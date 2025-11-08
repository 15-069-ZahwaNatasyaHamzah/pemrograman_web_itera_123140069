import React from 'react';

function BookFilter({ filter, setFilter, searchTerm, setSearchTerm }) {
  return (
    <div className="filter-controls">
      <div className="form-group">
        <label htmlFor="search">Cari Buku (Judul/Penulis)</label>
        <input
          type="text"
          id="search"
          placeholder="Cari..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="filter-status">Filter Berdasarkan Status</label>
        <select
          id="filter-status"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="semua">Semua Status</option>
          <option value="milik">Dimiliki</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="beli">Ingin Dibeli</option>
        </select>
      </div>
    </div>
  );
}

export default BookFilter;