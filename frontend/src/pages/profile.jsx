
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './profile.css';
import edit from '../assets/edit.png';

const Profile = () => {
    const [user] = useState({
        fullName: '',
        phoneNumber: '',
        gender: '',
        registrationNumber: '',
        studentNumber: '',
        course: '',
        semester: '',
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
                    <label className='phone'>Phone Number:</label>
                    <h2 className='phone-number'>{user.phone}</h2>
                    <label className='gender'>Gender:</label>
                    <h2>{user.gender}</h2>
                    <button className='personal-information-editbutton'>Edit
                        <img src={edit} alt='edit' className='edit' />
                    </button>
                </div>
                <div className='academic-information'>
                    <h1>Academic Information</h1>
                    <label className='registration'>Registration Number:</label>
                    <h2 className='registration-number'>{user.registrationNumber}</h2>
                    <label className='student'>Student Number:</label>
                    <h2 className='student-number'>{user.studentNumber}</h2>
                    <label className='course'>Course:</label>
                    <h2 className='course-name'>{user.course}</h2>
                    <label className='semester'>Semester:</label>
                    <h2 className='semester-name'>{user.semester}</h2>
                    <button className='academic-information-editbutton'>Edit
                        <img src={edit} alt='edit' className='edit' />
                    </button>
                </div>    

            </div>
        </div>
    );
};

export default Profile;