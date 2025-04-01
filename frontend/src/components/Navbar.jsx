import React, { useState } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import search from '../assets/search.png';
import notification from '../assets/notification.png';
import mail from '../assets/mail.png';
import { useNavigate } from 'react-router-dom';
 

const Navbar = ({ badgeCount }) => {

    const [user] = useState({
        fullName: 'Alvin David',
        profilePic: null,
    });

    const navigate = useNavigate();

    

    const getInitials = (name) => {
        return name.charAt(0).toUpperCase();
    };

    const handleNotificationClick = () => {
        const userRole = localStorage.getItem('userRole');
        const basePath = userRole === 'registrar' ? '/registrar-dashboard' : '/app';
        navigate(`${basePath}/notifications`);
    };

    const handleMailClick = () => {
        const userRole = localStorage.getItem('userRole');
        const basePath = userRole === 'registrar' ? '/registrar-dashboard' : '/app';
        navigate(`${basePath}/messages`);
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
                    <img src={notification} alt='notification' className='notification-icon' onClick={handleNotificationClick} />
                    {badgeCount > 0 && <span className='notification-badge'>{badgeCount}</span>}
                    <img 
                    src={mail} 
                    alt='mail' 
                    className='mail-icon'
                    onClick={handleMailClick}
                    />
                        {user.profilePic ? (
                            <img src={user.profilePic} alt='user' className='user-icon' />
                        ) : (
                            <div className='user-initials'>
                                {getInitials(user.fullName)}
                            </div>
                        )}
                    
                </div>
                <span className='user-greeting'>Hi, {user.fullName}</span>
            </nav>
    );
};

export default Navbar;