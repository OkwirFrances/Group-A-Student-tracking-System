import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={process.env.PUBLIC_URL + '/mak-logo.png'} alt="Makerere University Logo" />
        <span>Academic Issue Tracking System</span>
      </div>
      <div className="navbar-search">
        <input type="search" placeholder="Search for anything" />
      </div>
      <div className="navbar-actions">
        <Link to="/dashboard/settings">Settings</Link>
        <Link to="/dashboard/profile">Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;
