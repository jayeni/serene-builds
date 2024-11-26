import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ isSignedIn, setIsSignedIn }) {
  const location = useLocation();

  const handleSignInToggle = () => {
    setIsSignedIn(!isSignedIn);
  };

  return (
    <header className="header">
      <h1>Serene Build</h1>
      <nav>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Home
        </Link>
        <Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>
          Projects
        </Link>
        <Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>
          Blog
        </Link>
        <Link to="/report-bug" className={location.pathname === '/report-bug' ? 'active' : ''}>
          Report Bug
        </Link>
        <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
          Contact
        </Link>
        <button 
          onClick={handleSignInToggle}
          className="sign-in-button"
        >
          {isSignedIn ? 'Sign Out' : 'Sign In'}
        </button>
      </nav>
    </header>
  );
}

export default Header;
