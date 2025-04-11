import React, { useState } from 'react';
import './signup.css';
import Otp from './otp';
import logo from '../assets/logo.png';
import person from '../assets/person.png';
import mail from '../assets/mail.png';
import padlock from '../assets/padlock.png';
import { authAPI } from '../services/api';

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        termsAccepted: false,
    });

    const [showOtpScreen, setShowOtpScreen] = useState(false);
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const isFormValid = () => {
        const { fullName, email, password, confirmPassword, role, termsAccepted } = formData;
        if (!fullName || !email || !password || !confirmPassword || !role || !termsAccepted || password !== confirmPassword || password.length < 8) {
            setError('Please fill in all the required fields correctly and accept the terms.');
            return false;
        }
        setError('');
        return true;
    };

    const generateOtp = () => {
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedOtp(otp);
        console.log('Generated OTP:', otp);
        console.log('Sending OTP to:', formData.email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid()) {
            return;
        }

        try {
            // Call the backend API
            const data = await authAPI.signup(
                formData.email,
                formData.fullName,
                formData.password,
                formData.role
            );

            console.log('Signup Successful:', data);

            // Generate OTP and show OTP screen
            generateOtp();
            setShowOtpScreen(true);

            // Store user role in localStorage
            localStorage.setItem('userRole', formData.role);
        } catch (error) {
            console.error('Signup Failed:', error);
            setError(error.message || 'Unable to connect to the server. Please try again later.');
        }
    };

    if (showOtpScreen) {
        return <Otp email={formData.email} generatedOtp={generatedOtp} />;
    }

    return (
        <div className='signup-container'>
            <div className='signup-left'>
                <img className='muk' src={logo} alt='muk logo' />
                <h1 className='system-title'>Welcome to the Academic Issue Tracking System AITS</h1>
            </div>
            <div className='signup-right'>
                <form className='signup-right-form' onSubmit={handleSubmit}>
                    <h2 className='title'>Create An Account</h2>
                    <p className='sub-title'>Please fill in all the fields below</p>
                    {error && <p className='error-message'>{error}</p>}
                    <label>
                        Full Name
                        <div className='input-container'>
                            <input type='text' name='fullName' placeholder='Enter your Full Name' value={formData.fullName} onChange={handleChange} />
                            <img src={person} alt='person' className='person-icon' />
                        </div>
                    </label>
                    <label>
                        Email Address
                        <div className='input-container'>
                            <input type='email' name='email' placeholder='Enter your Email Address' value={formData.email} onChange={handleChange} />
                            <img src={mail} alt='mail' className='mailicon' />
                        </div>
                    </label>
                    <label>
                        Password
                        <div className='input-container'>
                            <input type='password' name='password' placeholder='Enter your Password (min - 8 characters)' value={formData.password} onChange={handleChange} minLength={8} />
                            <img src={padlock} alt='padlock' className='padlockicon' />
                        </div>
                    </label>
                    <label>
                        Confirm Password
                        <div className='input-container'>
                            <input type='password' name='confirmPassword' placeholder='Confirm your Password (min - 8 characters)' value={formData.confirmPassword} onChange={handleChange} minLength={8} />
                            <img src={padlock} alt='padlock' className='padlockicon' />
                        </div>
                    </label>
                    <label>
                        Role
                        <div className='dropdown'>
                            <select name='role' value={formData.role} onChange={handleChange}>
                                <option value=''>Select Role</option>
                                <option value='student'>Student</option>
                                <option value='lecturer'>Lecturer</option>
                                <option value='registrar'>Registrar</option>
                            </select>
                        </div>
                    </label>
                    <label className='terms'>
                        <input type='checkbox' name='termsAccepted' checked={formData.termsAccepted} onChange={handleChange} />
                        I have read and accepted all the AITS terms and conditions.
                    </label>
                    <button className='signup-button' disabled={!isFormValid()}>SIGN UP</button>
                    <p className='signin-text'>Already have an account? <a href='signin' className='signin-link'>Sign In</a></p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;