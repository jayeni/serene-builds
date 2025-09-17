import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './layout.css';

function Layout({ children, isSignedIn, setIsSignedIn }) {
  return (
    <div className="layout">
      <Header isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />

      <div className="main">
        <div className={`content-body`}>
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Layout;
