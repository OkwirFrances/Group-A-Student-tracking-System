import React, { useState , useEffect } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import search from '../assets/search.png';
import notification from '../assets/notification.png';
import mail from '../assets/mail.png';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ badgeCount, setBadgeCount }) => {
    const [profilePic, setProfilePic] = useState(null);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        fullName: '',
        profilePic: null,
    });
    
    useEffect(() => {
    const userFullName = localStorage.getItem('userFullName') || 'Guest User';
        setUser((prevUser) => ({
            ...prevUser,
            fullName: userFullName,
        }));
        const savedProfilePic = localStorage.getItem('profilePic');
        if (savedProfilePic) {
            setProfilePic(savedProfilePic);
            };
        }
    , []);

    const getInitials = (name) => {
        if (!name) return '';
        return name.charAt(0).toUpperCase();
    };

    const handleNotificationClick = () => {
        const userRole = localStorage.getItem('userRole');
        const basePath = userRole === 'registrar' ? '/registrar-dashboard' : '/app';
        navigate(`${basePath}/notifications`);

        if (userRole === 'registrar') {
            setBadgeCount(0);
        }
    };

    const handleMailClick = () => {
        const userRole = localStorage.getItem('userRole');
        const basePath = userRole === 'registrar' ? '/registrar-dashboard' : '/app';
        navigate(`${basePath}/messages`);
    };

    return (
            <nav className='navbar'>
                <div className='navbar-logo'>
                    <img 
                    src={logo} alt='muk-logo' 
                    className='makerere-logo' />
                    <span className='navbar-logo-text'>Academic Issue Tracking System</span>
                    <div className='search-container'>
                        <input
                        type='text'
                        className='search-input'
                        placeholder='Search for anything...'
                        />
                    <img src={search} alt='search' className='search-icon' />
                    </div>
                    <div className='notifications-container'>
                        <img 
                            src={notification} 
                            alt='notification' 
                            className='notification-icon' 
                            onClick={handleNotificationClick}
                        />
                        {badgeCount > 0 && <span className='notification-badge'></span>}
                    </div>
                    <img 
                        src={mail} 
                        alt='mail' 
                        className='mail-icon'
                        onClick={handleMailClick}
                    />
                        {user.profilePic ? (
                            <img 
                               src={profilePic} 
                               alt='Profile' 
                               className='navbar-profile-picture' />
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