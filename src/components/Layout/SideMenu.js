import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function SideMenu({ isVisible, toggleMenu }) {
  const location = useLocation();
  const [showArrow, setShowArrow] = useState(false);

  const handleMouseMove = (e) => {
    if (!isVisible && e.clientX <= 20) { // Show arrow when cursor is within 20px of left edge
      setShowArrow(true);
    } else {
      setShowArrow(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible]);

  return (
    <aside className={`side-menu ${isVisible ? 'visible' : 'hidden'}`}>
      <button 
        className={`toggle-button ${isVisible ? 'visible' : ''} ${showArrow ? 'show' : ''}`} 
        onClick={toggleMenu}
      >
        {isVisible ? '◄' : '►'}
      </button>
      <ul>
        <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
        <li><Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>Projects</Link></li>
        <li><Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''}>Blog</Link></li>
        <li><Link to="/report-bug" className={location.pathname === '/report-bug' ? 'active' : ''}>Report Bug</Link></li>
        <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
      </ul>
    </aside>
  );
}

export default SideMenu;
