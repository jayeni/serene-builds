import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ isSignedIn, setIsSignedIn }) {
  const location = useLocation();

  return (
    <header className="header">
      <Link to="/" className="header-title">
        <h1 className="combined-bubble-text" data-text="ISE DAYO">ISE DAYO</h1>
      </Link>
      <nav>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Home
        </Link>
        <Link to="/journeys" className={location.pathname === '/journeys' ? 'active' : ''}>
          Journeys
        </Link>
        <Link to="/report-bug" className={location.pathname === '/report-bug' ? 'active' : ''}>
          Report Bug
        </Link>
      </nav>
    </header>
  );
}

export default Header;
