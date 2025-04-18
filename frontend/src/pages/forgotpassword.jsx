import React, { useState, useRef } from 'react';
import './forgotpassword.css';
import mail from '../assets/mail.png';
import refresh from '../assets/refresh.png';
import help from '../assets/help.png';
import Congratulations from './congratulations';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = ({ email, onResendOtp }) => {
    const [otp, setOtp] = useState(['','','','']);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showCongratulations, setShowCongratulations] = useState(false);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^\d$/.test(value) || value === '') {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value !== '' && index < 3) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleVerifyClick = () => {
        const enteredOtp = otp.join('');
        const fixedOtp = '1234';
        if (enteredOtp === fixedOtp) {
            setSuccess(true);
            setError('');
            console.log('OTP verified successfully');
            setShowCongratulations(true);

            alert('Your Password Has Been Successfully Reset');

            const userRole = localStorage.getItem('userRole');

            if (userRole === 'registrar') {
                navigate('/signin');
            } else if (userRole === 'student') {
                navigate('/signin');
            } else if (userRole === 'lecturer') {
                navigate('/signin');
            }
        } else {
            setError('Invalid OTP. Please try again.');
            setSuccess(false);
        }
    };

    const handleResendClick = () => {
        setOtp(['','','','']);
        setError('');
        setSuccess(false);
        onResendOtp();
    };

    const isOtpComplete = otp.every(digit => digit !== '');

    if (showCongratulations) {
        return <Congratulations />;
    }

    return (
        <div className='forgotpassword-container'>
            <div className='aits-logo'>AITS</div>
            <div className='help'>
                <img src={help} alt='help logo' className='help-logo' />Help?
                <div className='tooltip'>
                    Email Address: alvin69david@gmail.com
                    Phone Number: 0758862363
                </div>
            </div>
            <div className='forgotpassword-content'>
                <img  className='doorkey'src={mail} alt='mail' />
                <h2 className='reset-title'>Email Verification</h2>
                <p className='reset-sub-title'>Enter the verification code we sent to you on {email}</p>
                <div className='reset-inputs'>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            className='reset-input'
                            type='text'
                            maxLength='1'
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            ref={(el) => (inputRefs.current[index] = el)} 
                        />
                    ))}
                </div>
            <Link to="/signin">
            
            <button 
                onClick={handleVerifyClick}
                className='reset-verify-button' 
               disabled={!isOtpComplete}>
                   Next
            </button></Link>
                <button 
                className='reset-resend-button'>
                    <img className='reset-refresh-icon'src={refresh} alt='refresh icon' /> 
                    Resend Code
                </button>
                </div>   
                {error && <p className='error-message'>{error}</p>}
                {success && <p className='success-message'>OTP verified successfully!</p>}
        </div>
    );
};

export default ForgotPassword;