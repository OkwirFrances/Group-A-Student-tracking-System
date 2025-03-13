import React, { useState } from 'react';
import './signup.css';
import Otp from './otp';
import logo from '../assets/logo.png';




const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName:'',
        email:'',
        password:'',
        confirmPassword:'',
        role:'',
        termsAccepted: false,
    });

    const [showOtpScreen, setShowOtpScreen] = useState(false);
    const [generatedOtp, setGeneratedOtp] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const isFormValid = () => {
        const { fullName, email, password, confirmPassword, role, termsAccepted } = formData;
        return (
            fullName &&
            email &&
            password &&
            confirmPassword &&
            role &&
            termsAccepted &&
            password === confirmPassword &&
            password.length >= 8 &&
            confirmPassword.length >=8
        );
    };

    const generateOtp = () => {
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedOtp(otp);
        console.log('Generated OTP:', otp);
        console.log('Sending OTP to:', formData.email);
    };

    const handleSignUpClick = () => {
        if (isFormValid()){
            generateOtp();
            setShowOtpScreen(true);
        }    
    };

    if (showOtpScreen) {
        return <Otp email={formData.email} generatedOtp={generatedOtp} />;
    }

    return (
        <div className='signup-container'>
            <div className='signup-left'>
                    <img className='muk'src={logo} alt='muk logo' />
                    <h1 className='system-title'>Welcome to the<br /> Academic Issue Tracking System<br /> AITS</h1>
            </div>
            <div className='sigup-right'>
                <form className='signup-right-form'>
                    <h2 className='title'>Create An Account</h2>
                    <p className='sub-title'>Please fill in all the fields below</p>
                    <label>
                        Full Name
                        <input 
                        className='full-name'
                        type='text'
                        name='fullName' 
                        placeholder='Enter your Full Name' 
                        value={formData.fullName} 
                        onChange={handleChange}/>
                    </label>
                    <label>
                        Email Address
                        <input 
                        className='email-address'
                        type='email' 
                        name='email' 
                        placeholder='Enter your Email Address' 
                        value={formData.email} 
                        onChange={handleChange} />
                    </label>
                    <label>
                        Password
                        <input 
                            className='password'
                            type='password' 
                            name='password' 
                            placeholder='Enter your Password (min - 8 characters)' 
                            value={formData.password} 
                            onChange={handleChange}
                            minLength={8} />
                    </label>
                    <label>
                        Confirm Password
                        <input 
                            className='confirm-password'
                            type='password' 
                            name='confirmPassword' 
                            placeholder='Confirm your Password (min -8 characters)' 
                            value={formData.confirmPassword} 
                            onChange={handleChange}
                            minLength={8} />
                    </label>
                    <label>
                        Role
                        <div className='dropdown' >
                            <select 
                            className='role-select' 
                            name='role' 
                            value={formData.role} 
                            onChange={handleChange} >
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
                            onChange={handleChange}/> 
                        I have read and accepted all the AITS terms and conditions.
                    </label>
                    <button 
                        type='button' 
                        className='signup-button' 
                        onClick={handleSignUpClick} 
                        disabled={!isFormValid()}>
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