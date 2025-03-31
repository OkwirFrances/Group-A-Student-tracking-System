import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/dashboard" className="nav-link">Dashboard</Link>
      <Link to="/dashboard/issues" className="nav-link">Issues</Link>
      <Link to="/dashboard/reports" className="nav-link">Reports</Link>
      <Link to="/dashboard/profile" className="nav-link">Profile</Link>
      <Link to="/dashboard/settings" className="nav-link">Settings</Link>
    </div>
  );
}

export default Sidebar;
