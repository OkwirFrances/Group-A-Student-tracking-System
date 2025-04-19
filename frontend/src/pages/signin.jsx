import React, { useState } from 'react';
import './signin.css';
import logo from '../assets/logo.png';
import mail from '../assets/mail.png';
import padlock from '../assets/padlock.png';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        setIsTermsAccepted(e.target.checked);
    };

    const handleSignInClick = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!formData.email || !formData.password) {
            setError('Please fill in all fields.');
            setLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long.');
            setLoading(false);
            return;
        }

        try {
            const data = await authAPI.login(formData.email, formData.password);

            // Store user data in localStorage
            localStorage.setItem('authToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            localStorage.setItem('userRole', data.role);
            localStorage.setItem('userEmail', data.email);
            localStorage.setItem('userFullname', data.fullname);

            // Redirect to the appropriate dashboard based on the user's role
            const dashboardPaths = {
                registrar: '/registrar-dashboard/dashboard',
                lecturer: '/lecturer/dashboard',
                student: '/app/dashboard',
            };

            navigate(dashboardPaths[data.role] || '/');
        } catch (error) {
            console.error('Sign-in failed:', error);
            setError(error.response?.data?.message || 'Unable to connect to the server. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = formData.email && formData.password.length >= 8 && isTermsAccepted;

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
                    <label>
                        Email Address
                        <div className='input-container'>
                            <input
                                className='emailaddress'
                                type='email'
                                name='email'
                                placeholder='Enter Your Email Address'
                                value={formData.email}
                                onChange={handleChange} />
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
                                minLength={8} />
                            <img src={padlock} alt='padlock' className='padlock-icon' />
                        </div>
                    </label>
                    <p className='forgot-password'>
                        <Link to="/emailrequest" className='forgot-password-link'>Forgot Password?</Link>
                    </p>
                    <label className='aits-terms'>
                        <input
                            type='checkbox'
                            className='termscheckbox'
                            checked={isTermsAccepted}
                            onChange={handleCheckboxChange} />
                        I have read and accepted all the AITS terms and conditions
                    </label>
                    <button
                        className='signinbutton'
                        disabled={!isFormValid || loading}>
                        {loading ? 'Signing In...' : 'SIGN IN'}
                    </button>
                    {error && <p className='error-message'>{error}</p>}
                    <p className='link'>Don't have an account? <Link to='/signup' className='signup-link'>Sign Up</Link></p>
                </form>
            </div>
        </div>
    );
};

export default SignIn;