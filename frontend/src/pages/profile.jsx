import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './profile.css';
import edit from '../assets/edit.png';

const Profile = () => {
    const navigate = useNavigate();
    const fullName = localStorage.getItem('fullName') || '';

    const [user] = useState({
        fullName: fullName || '',
        address: '',
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
            {user.fullName ? getInitials(user.fullName) : "N/A"}
        </div>
    )}
</div>
                    <button 
                         className='editbutton'
                          onClick={() => navigate('/editprofilepicture')}
                    >
                        Edit
                        <img src={edit} alt='edit' className='edit' />
                    </button>
                </div>
                <div className='personal-information'>
                    <h1>Personal Information </h1>
                    <label className='name'>Full Name:</label>
                    <h2 className='fullname'>{user.fullname}</h2>
                    <label className='address'>Email Address:</label>
                    <h2 className='address'>{user.email}</h2>
                    <label className='phone'>Phone Number:</label>
                    <h2 className='phone-number'>{user.phone}</h2>
                    <label className='gender'>Gender:</label>
                    <h2>{user.gender}</h2>
                    <button 
                         className='personal-information-editbutton'
                        onClick={() => navigate('/editpersonalinfo')}
                    >
                        Edit
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
                    <button 
                         className='academic-information-editbutton'
                            onClick={() => navigate('/editacademicinfo')}
                    
                    >
                        Edit
                        <img src={edit} alt='edit' className='edit' />
                    </button>
                </div>    

            </div>
        </div>
    );
};

export default Profile;