import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Stats from './pages/Stats/Stats.jsx';

function App() {
  return (
    <>
      <header className="app-header">
        <nav className="app-nav">
          <h1>Manajemen Buku</h1>
          <ul>
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/stats" className={({ isActive }) => (isActive ? 'active' : '')}>
                Statistik
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </main>
    </>
  );
}

export default App;