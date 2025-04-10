
import React, { useState } from 'react';
import './signin.css';
import logo from '../assets/logo.png';
import mail from '../assets/mail.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import padlock from '../assets/padlock.png';
import { authAPI } from '../services/api.jsx';



const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSignInClick = async (e) => {
        e.preventDefault(); 

        // Validate form data
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields.');
            return;
        }
        try {
            if (userRole === 'registrar') {
                navigate('/registrar-dashboard/dashboard');
            } else if (userRole === 'student') {
                navigate('/app/dashboard');
            } else if (userRole === 'lecturer') {
                navigate('/lecturer-dashboard');
            } else {
                console.log('Invalid user role');
            }
        
        } catch (error) {
            console.error('Sign-in failed:', error);
            setError('Unable to connect to the server. Please try again later.');
        }
    };

    const isFormValid = formData.email && formData.password.length >= 8;

    return (
        <div className='signin-container'>
            <div className='signin-left'>
                <img src={logo} alt='logo' className='muk' />
                <h1 className='system-title'>Welcome to the<br /> Academic Issue Tracking System<br />AITS</h1>
            </div>
            <div className='signin-right'>
                <form className='signin-right-form' onSubmit={handleSignInClick}>
                    <h2 className='title'>Sign In Into Your Account</h2>
                    <p className='sub-title'>Please fill in all the fields below</p>
                    {error && <p className='error-message'>{error}</p>}
                    <label>
                        Email Address
                        <div className='input-container'>
                            <input
                                className='emailaddress'
                                type='email'
                                name='email'
                                placeholder='Enter Your Email Address'
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <img src={mail} alt='mail logo' className='input-icon' />
                        </div>
                    </label>
                    <label>
                        Password
                        <div className='input-container'>
                            <input
                                className='pass-word'
                                type='password'
                                name='password'
                                placeholder='Enter Your Password'
                                value={formData.password}
                                onChange={handleChange}
                                minLength={8}
                                required
                            />
                            <img src={padlock} alt='padlock' className='padlock-icon' />
                        </div>
                    </label>
                    <p className='forgot-password'>
                        <Link to="/emailrequest" className='forgot-password-link'>Forgot Password?</Link>
                    </p>
                    <button
                        className='signinbutton'
                        type='submit'
                        onClick={handleSignInClick}
                        disabled={!isFormValid}
                    >
                        SIGN IN
                    </button>
                    <p className='link'>Don't have an account? <a href='signup' className='signup-link'>Sign Up</a></p>
                </form>
            </div>
        </div>
    );
};

export default SignIn;