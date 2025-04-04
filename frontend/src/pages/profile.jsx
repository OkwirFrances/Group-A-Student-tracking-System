
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './profile.css';
import edit from '../assets/edit.png';

const Profile = () => {
    const [user] = useState({
        fullName: 'Alvin David',
        profilePic: null,  
    });

    const getInitials =(name) => {
        return name.charAt(0).toUpperCase();
    };


    return (
        <div className='profile-container'>
            <Sidebar />
            <div className='profile-content'>
                <Navbar />
                <h1>Profile</h1>
                <div className='profile-section'></div>
                <div className='profile'>
                    <div className="profile-picture-container">
                        {user.profilePic ? (
                            <img src={user.profilePic} alt="Profile" className="profile-picture" />
                        ) : (
                                <div className="profile-initials">
                                    {getInitials(user.fullName)}
                                </div>
                        )}
                        <div className="profile-details">
                            <label className='fullname'>Full Name:</label>
                            <h2 className='name'>{user.fullName}</h2>
                        </div>
                    </div>
                    <button className='editbutton'>Edit
                        <img src={edit} alt='edit' className='edit' />
                    </button>
                </div>
                <div className='personal-information'>
                    <h1>Personal Information </h1>
                </div>

            </div>
        </div>
    );
};

export default Profile;