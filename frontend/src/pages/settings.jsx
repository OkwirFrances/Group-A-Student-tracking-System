import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './settings.css';

const Settings = () => {
    return (
        <div className='settings-container'>
            <Sidebar />
            <div className='settings-content'>
                <Navbar />
                <h1>Settings</h1>
                <div className='settings-box'>

                </div>
            </div>
        </div>
    );
};

export default Settings;