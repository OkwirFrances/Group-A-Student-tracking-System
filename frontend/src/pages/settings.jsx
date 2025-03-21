import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './settings.css';
import logo from '../assets/logo.png';
import settings from '../assets/settings.png';

const Settings = () => {
    return (
        <div className='settings-container'>
            <Sidebar />
            <div className='settings-content'>
                <Navbar />
                <h1>Settings</h1>
                <div className='settings-box'>
                    <img src={settings} alt='settings' className='settings' />
                    <h2>Tap one of the tabs to appear here</h2>
                    <div className='settings-tab'>
                        <img src={logo} alt='muk-logo' className='muklogo' />
                        <button className='change-password'>Change Password</button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Settings;