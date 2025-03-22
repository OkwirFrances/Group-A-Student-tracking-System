import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './settings.css';
import logo from '../assets/logo.png';
import settings from '../assets/settings.png';

const Settings = () => {
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChangePasswordClick = () => {
        setShowChangePassword(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const isFormComplete = () => {
        return (
            formData.oldPassword.trim() !== '' &&
            formData.newPassword.trim() !== '' &&
            formData.confirmPassword.trim() !== '' &&
            formData.newPassword === formData.confirmPassword
        );
    };

    return (
        <div className='settings-container'>
            <Sidebar />
            <div className='settings-content'>
                <Navbar />
                <h1>Settings</h1>
                <div className='settings-box'>
                    <div className='settings-left'>
                    {!showChangePassword && (
                        <>
                            <img src={settings} alt='settings' className='settings' />
                            <h2>Tap one of the tabs to appear here</h2>
                        </>
                    )}
                        <div className='settings-tab'>
                            <img src={logo} alt='muk-logo' className='muklogo' />
                            <button 
                            className='change-password'
                            onClick={handleChangePasswordClick}>Change Password</button>
                            <button className='preferences'>Preferences</button>
                            <button className='help-support'>Help & Support</button>
                            <button className='delete-account'>Delete Account</button>
                        </div>
                    </div>
                    {showChangePassword && (
                        <div className='settings-right'>
                        <label>
                            Old Password
                            <input 
                            type='password'
                            name='oldPassword'
                            placeholder='Enter Your Old Password'
                            className='old-password'
                            value={formData.oldPassword}
                            onChange={handleInputChange}
                            minLength={8}
                            />
                        </label>
                        <label className='newpassword'>
                            New Password
                            <input 
                            type='password'
                            name='newPassword'
                            value={formData.newPassword}
                            placeholder='Enter Your New Password'
                            className='new-password'
                            onChange={handleInputChange}
                            minLength={8}/>
                        </label>
                        <label className='confirmpassword'>
                            Confirm Password
                            <input 
                            type='password'
                            name='confirmPassword'
                            value={formData.confirmPassword}
                            placeholder='Confirm Your New Password'
                            className='confirm-password'
                            onChange={handleInputChange}
                            minLength={8}/>
                        </label>
                        <button 
                        className='save-changes'
                        disabled={!isFormComplete()}
                        >Save Changes</button>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;