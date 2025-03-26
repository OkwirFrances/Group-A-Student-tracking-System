

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search from '../../assets/search.png';
import notification from '../../assets/notification.png';
import mail from '../../assets/mail.png';


const Navbar = ({ badgeCount }) => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole')?.toLowerCase();
  const userFullName = localStorage.getItem('userFullName') || 'User';

  const getInitials = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const handleNotificationClick = () => {
    navigate(`/${userRole}/notifications`);
  };

  const handleProfileClick = () => {
    navigate(`/${userRole}/profile`);
  };

  return (
    <nav className='navbar'>
      <div className='navbar-logo'>
        <img src={logo} alt='muk-logo' className='makerere-logo' />
        <span className='navbar-logo-text'>Academic Issue Tracking System</span>
        <div className='search-container'>
          <input
            type='text'
            className='search-input'
            placeholder='Search for anything...'
          />
          <img src={search} alt='search' className='search-icon' />
        </div>
        <img 
          src={notification} 
          alt='notification' 
          className='notification-icon' 
          onClick={handleNotificationClick} 
        />
        {badgeCount > 0 && <span className='notification-badge'>{badgeCount}</span>}
        <div className='user-profile' onClick={handleProfileClick}>
          <div className='user-initials'>
            {getInitials(userFullName)}
          </div>
        </div>
      </div>
      <span className='user-greeting'>Hi, {userFullName} ({userRole})</span>
    </nav>
  );
};

export default Navbar;