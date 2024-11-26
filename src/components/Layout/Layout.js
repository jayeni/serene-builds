import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';
import './layout.css';

function Layout({ children, isSignedIn, setIsSignedIn }) {
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  return (
    <div className="layout">
      <Header isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />

      <div className="main">
        {/* Pass visibility state and toggle function to SideMenu */}
        <SideMenu isVisible={isMenuVisible} toggleMenu={toggleMenu} />

        {/* Adjust content layout based on menu visibility */}
        <div className={`content-body ${isMenuVisible ? 'menu-visible' : 'menu-hidden'}`}>
          {children}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Layout;
