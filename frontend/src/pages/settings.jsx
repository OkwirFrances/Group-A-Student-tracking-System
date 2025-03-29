import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './settings.css';
import logo from '../assets/logo.png';

const Settings = () => {
    return (
        <div className='settings-container'>
            <Sidebar />
            <div className='settings-content'>
                <Navbar />
                <h1>Settings</h1>
                <div className='settings-box'>
                    <div className='settings-tab'>
                        <img src={logo} alt='muk-logo' className='muklogo' />
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Settings;