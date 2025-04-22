import React, { useState, useEffect } from 'react';
import './signup.css';
import Otp from './otp';
import logo from '../assets/logo.png';
import person from '../assets/person.png';
import mail from '../assets/mail.png';
import padlock from '../assets/padlock.png';

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        role: '',
        termsAccepted: false,
    });

    const [showOtpScreen, setShowOtpScreen] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const isFormValid = () => {
        const { fullName, email, password, role, termsAccepted } = formData;

        if (!fullName.trim()) return false;
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false; // Email format check
        if (!password || password.length < 8) return false;
        if (!role) return false;
        if (!termsAccepted) return false;

        return true;
    };

    useEffect(() => {
        const formError = isFormValid();
        setError(formError);
    }, [formData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);

        if (!isFormValid()) {
            setError('Please fill out the form correctly.');
            return;
        }

        
        console.log('Signup Successful:', formData);

        
        localStorage.setItem('userFullName', formData.fullName);
        localStorage.setItem('userEmail', formData.email);
        localStorage.setItem('userRole', formData.role);

       
        setShowOtpScreen(true);
    };

    if (showOtpScreen) {
        return <Otp email={formData.email} onResendOtp={() => {}} />;
    }

    return (
        <div className='signup-container'>
            <div className='signup-left'>
                <img className='muk' src={logo} alt='muk logo' />
                <h1 className='system-title'>Welcome to the<br /> Academic Issue Tracking System<br /> AITS</h1>
            </div>
            <div className='signup-right'>
                <form className='signup-right-form' onSubmit={handleSubmit}>
                    <h2 className='title'>Create An Account</h2>
                    <p className='sub-title'>Please fill in all the fields below</p>
                    <label>
                        Full Name
                        <div className='input-container'>
                            <input
                                className='full-name'
                                type='text'
                                name='fullName'
                                placeholder='Enter your Full Name'
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                            <img src={person} alt='person' className='person-icon' />
                        </div>
                    </label>
                    <label>
                        Email Address
                        <div className='input-container'>
                            <input
                                className='email-address'
                                type='email'
                                name='email'
                                placeholder='Enter your Email Address'
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <img src={mail} alt='mail' className='mailicon' />
                        </div>
                    </label>
                    <label>
                        Password
                        <div className='input-container'>
                            <input
                                className='password'
                                type='password'
                                name='password'
                                placeholder='Enter your Password (min - 8 characters)'
                                value={formData.password}
                                onChange={handleChange}
                                minLength={8}
                            />
                            <img src={padlock} alt='padlock' className='padlockicon' />
                        </div>
                    </label>
                    <label>
                        Role
                        <div className='dropdown'>
                            <select
                                className='role-select'
                                name='role'
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value=''>Select Role</option>
                                <option value="student">Student</option>
                                <option value="lecturer">Lecturer</option>
                                <option value="registrar">Registrar</option>
                            </select>
                        </div>
                    </label>
                    <label className='terms'>
                        <input
                            type='checkbox'
                            className='terms-checkbox'
                            name='termsAccepted'
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                        />
                        I have read and accepted all the AITS terms and conditions.
                    </label>
                    <button
                        className='signup-button'
                        disabled={!isFormValid()}
                    >
                        SIGN UP
                    </button>
                    <p className='signin-text'>
                        Already have an account? <a href='signin' className='signin-link'>Sign In</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;