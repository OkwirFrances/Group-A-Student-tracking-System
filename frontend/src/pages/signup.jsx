import React, { useState } from 'react';
import './signup.css';
import Otp from './otp';
import logo from '../assets/logo.png';
import person from '../assets/person.png';
import mail from '../assets/mail.png';
import padlock from '../assets/padlock.png';
import bcrypt from 'bcryptjs';



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
        if (!fullName) {
            console.error('Full Name is required');
        }
        if (!email){
            console.error('Email is required');
            return false;
        }
        if (!password || password.length < 8){

            console.error('Password is required and should be at least 8 characters');
            return false;
        }
        if (password !== confirmPassword)   
        {
            console.error('Passwords do not match');
            return false;
        }
        if (!role){
            console.error('Role is required');
            return false;
        }
        if (!termsAccepted){
            console.error('Terms and Conditions must be accepted');
            return false;
        }
    
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);

        if (isFormValid()){
            try{

                const hashedPassword = await bcrypt.hash(formData.password, 10);
                console.log('Hashed Password:',
                hashedPassword);

                const response = await fetch('http://localhost:5000/api/auth/signup', {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json',
                    },
                    body : JSON.stringify({
                        username: formData.fullName,
                        email: formData.email,
                        password: hashedPassword, // will send the Hashed Password
                        role: formData.role,
                        terms_accepted: formData.termsAccepted,}),
                });
                console.log('Response Status:', response.status);
                const data = await response.json();
                
                console.log('Signup Response:', data);

                if (response.ok){
                    console.log('Signup Successful:', data);
                    
            generateOtp();
            setShowOtpScreen(true);

        } else {
            console.error('Signup Failed:', data);
        }
    } catch (error) {
        console.error('Signup Failed:', error);
    }
} else {
    console.error('Form is not valid:', formData);
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
                            onChange={handleChange}/>
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
                            onChange={handleChange} />
                            <img src={mail} alt='mail' className='mail-icon' />
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
                            minLength={8} />
                            <img src={padlock} alt='padlock' className='padlock-icon' />
                        </div>
                    </label>
                    <label>
                        Confirm Password
                        <div className='input-container'>
                        <input 
                            className='confirm-password'
                            type='password' 
                            name='confirmPassword' 
                            placeholder='Confirm your Password (min -8 characters)' 
                            value={formData.confirmPassword} 
                            onChange={handleChange}
                            minLength={8} />
                            <img src={padlock} alt='padlock' className='padlock-icon' />
                        </div>
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