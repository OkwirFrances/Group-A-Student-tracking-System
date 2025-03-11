import React, { useState } from 'react';
import './Navbar.css';
import logo from '../icons/logo.png';
import search from '../icons/search.png';
import notification from '../icons/notification.png';
import mail from '../icons/mail.png'; 

const Navbar = () => {
    const [user] = useState({
        fullName: 'Waluube Alvin David',
        profilePic: null,
    });

    const getInitials = (name) => {
        return name.charAt(0).toUpperCase();
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
                    <img src={notification} alt='notification' className='notification-icon' />
                    <img src={mail} alt='mail' className='mail-icon' />
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