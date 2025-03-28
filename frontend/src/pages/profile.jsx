import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './profile.css';

const Profile = () => {
    return (
        <div className='profile-container'>
            <Sidebar />
            <div className='profile-content'>
                <Navbar />
                <h1>Profile</h1>
                <div className='profile-section'></div>
            </div>
        </div>
    );
};

export default Profile;