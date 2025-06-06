import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ isSignedIn, setIsSignedIn }) {
  const location = useLocation();

  return (
    <header className="header">
      <Link to="/" className="header-title">
        <h1>Serene Build</h1>
      </Link>
      <nav>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Home
        </Link>
        <Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>
          Projects
        </Link>
        <Link to="/report-bug" className={location.pathname === '/report-bug' ? 'active' : ''}>
          Report Bug
        </Link>
      </nav>
    </header>
  );
}

export default Header;
