import React, { useState } from 'react';
import './signup.css';
import Otp from './otp';
import logo from '../assets/logo.png';
import person from '../assets/person.png';
import mail from '../assets/mail.png';
import padlock from '../assets/padlock.png';

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        role: '',
        termsAccepted: false,
    });

    const [showOtpScreen, setShowOtpScreen] = useState(false);
    const [error, setError] = useState(''); // State to store error messages

    const [isFormValidState, setIsFormValidState] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const updatedFormData = {
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        };
        setFormData(updatedFormData);
        setIsFormValidState(validateForm(updatedFormData));
    };
    
    const validateForm = (data) => {
        const { fullname, email, password, role, termsAccepted } = data;
        return (
            fullname &&
            email &&
            password &&
            password.length >= 8 &&
            role &&
            termsAccepted
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);

        if (isFormValid()) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/signup/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fullname: formData.fullname,
                        email: formData.email,
                        password: formData.password,
                        role: formData.role,
                    }),
                });

                const data = await response.json();
                console.log('Signup Response:', data);

                if (response.ok) {
                    console.log('Signup Successful:', data);
                    setShowOtpScreen(true); // Show OTP screen after successful signup
                } else {
                    // Display backend error message
                    setError(data.error || 'Signup failed. Please try again.');
                }
            } catch (error) {
                console.error('Signup Failed:', error);
                // Handle network errors
                setError('Unable to connect to the server. Please try again later.');
            }
        }
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
            <div className='sigup-right'>
                <form className='signup-right-form' onSubmit={handleSubmit}>
                    <h2 className='title'>Create An Account</h2>
                    <p className='sub-title'>Please fill in all the fields below</p>
                    {error && <p className='error-message'>{error}</p>} {/* Display error message */}
                    <label>
                        Full Name
                        <div className='input-container'>
                            <input
                                className='full-name'
                                type='text'
                                name='fullname'
                                placeholder='Enter your Full Name'
                                value={formData.fullname}
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
                disabled={!isFormValidState}
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