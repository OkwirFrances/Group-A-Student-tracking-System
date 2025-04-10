import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditPersonalInfo.css';

const EditPersonalInfo = () => {
    const navigate = useNavigate();

    
    const [formData, setFormData] = useState({
        fullName: localStorage.getItem('userFullName') || '',
        email: localStorage.getItem('userEmail') || '',
        phoneNumber: '',
        gender: '',
    });

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        
        localStorage.setItem('userFullName', formData.fullName);
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userPhoneNumber', formData.phoneNumber);
        localStorage.setItem('userGender', formData.gender);
        
        navigate('/profile');
    };

    return (
        <div className="edit-personal-info-container">
            <h1>Profile &gt; Personal Information</h1>
            <form className="edit-personal-info-form" onSubmit={handleSubmit}>
                <h2>Personal Information</h2>
                <label>
                    Full Name
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                    />
                </label>
                <label>
                    Email Address
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        required
                    />
                </label>
                <label>
                    Phone Number
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                    />
                </label>
                <label>
                    Gender
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="">Select your gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
                <button type="submit" className="save-changes-button">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditPersonalInfo;