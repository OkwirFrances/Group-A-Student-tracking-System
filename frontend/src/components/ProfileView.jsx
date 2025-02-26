import React from 'react';
import './ProfileView.css';
import userimage from '../icons/userimage.png';
import edit from '../icons/edit.png';

function ProfileView() {
    return(
        <>
            <div className='profile-section'>
                    <h1 className='profile-name'>Profile</h1>
                    <div className='profile-view-container'>
                        <div className="profile-view">
                            <img className="profile-pic"src={userimage} alt="userimage" />
                            <div className='profile-info'>
                                <p className="detail" ><strong>Full Name:</strong>Alvin</p>
                                <p className="detail" ><strong>Role:</strong>Student</p>
                            </div>
                            <button className='edit-button' ><img src={edit} alt="edit logo" className='edit' />Edit</button>
                        </div>
                    </div>
            </div>
            <div>
                <h2>Personal Information</h2>
                <div>
                    <p>Full Name:</p>
                    <p>Email Address:</p>
                    <p>Phone Number:</p>
                    <p>Gender:</p>
                    <botton><img src={edit} alt="edit logo" />Edit</botton>
                </div>
            </div>
        </>
    );
};

export default ProfileView;