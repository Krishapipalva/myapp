import React, { useEffect } from 'react';
import './Sidebar.css';
import { useDarkMode } from './DarkModeContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const sidebarLinks = [
  { icon: '🏠', label: 'Home Feed', aria: 'Home', to: '/home' },
  { icon: '🔎', label: 'Explore', aria: 'Explore', to: '/explore' },
  { icon: '🗂️', label: 'Categories', aria: 'Categories', to: '/categories' },
  { icon: '📌', label: 'Saved', aria: 'Saved', to: '/saved' },
  { icon: '❤️', label: 'Liked', aria: 'Liked', to: '/liked' },
  { icon: '🚪', label: 'Logout', aria: 'Logout', to: '/login' },
];

const Sidebar = ({ open, onClose, collapsed }) => {
  const { dark, toggleDark } = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();

  // Lock body scroll when sidebar is open (mobile only)
  useEffect(() => {
    if (window.innerWidth <= 767) {
      if (open) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]);

  const handleSidebarLinkClick = (link) => {
    if (link.label === 'Logout') {
      onClose && onClose();
      setTimeout(() => {
        navigate('/login');
      }, 120);
    } else {
      onClose && onClose();
    }
  };

  // Desktop/Tablet Sidebar (unchanged)
  if (window.innerWidth > 767) {
    return (
      <aside className={`Sidebar${collapsed ? ' collapsed' : ''}`}
        tabIndex={0}
        aria-hidden={false}
      >
        <nav className="Sidebar-nav">
          {sidebarLinks.map(link => (
            <button
              key={link.label}
              className={`Sidebar-item${location.pathname === link.to ? ' active' : ''}`}
              aria-label={link.aria}
              onClick={() => handleSidebarLinkClick(link)}
              type="button"
            >
              <span className="Sidebar-icon">{link.icon}</span>
              <span className="Sidebar-label">{link.label}</span>
            </button>
          ))}
          <button className="Sidebar-item Sidebar-darkmode" onClick={toggleDark} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
            <span className="Sidebar-icon">🌙</span>
            <span className="Sidebar-label">Dark Mode</span>
          </button>
        </nav>
      </aside>
    );
  }

  // Mobile Drawer Sidebar
  return (
    <>
      {/* Backdrop */}
      <div
        className={`Sidebar-backdrop${open ? ' open' : ''}`}
        onClick={onClose}
        aria-hidden={!open}
        tabIndex={-1}
      />
      {/* Drawer */}
      <aside className={`Sidebar Drawer${open ? ' open' : ''}`} tabIndex={open ? 0 : -1} aria-hidden={!open}>
        <div className="Sidebar-header">
          <span className="Sidebar-title">Menu</span>
          <button className="Sidebar-close" onClick={onClose} aria-label="Close sidebar">×</button>
        </div>
        <nav className="Sidebar-nav">
          {sidebarLinks.map(link => (
            <button
              key={link.label}
              className={`Sidebar-item${location.pathname === link.to ? ' active' : ''}`}
              aria-label={link.aria}
              onClick={() => handleSidebarLinkClick(link)}
              type="button"
            >
              <span className="Sidebar-icon">{link.icon}</span>
              <span className="Sidebar-label">{link.label}</span>
            </button>
          ))}
          <button className="Sidebar-item Sidebar-darkmode" onClick={toggleDark} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
            <span className="Sidebar-icon">🌙</span>
            <span className="Sidebar-label">Dark Mode</span>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;