import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ isSignedIn, setIsSignedIn }) {
  const location = useLocation();

  return (
    <header className="header">
      <Link to="/" className="header-title">
        <h1 className="combined-bubble-text" data-text="ISE DAYO">ISE DAYO</h1>
      </Link>
    </header>
  );
}

export default Header;
