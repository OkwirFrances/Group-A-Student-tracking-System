import React, { useState } from 'react';
import './signin.css';
import logo from '../assets/logo.png';
import mail from '../assets/mail.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import padlock from '../assets/padlock.png';

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password:'',
    });

    

    const [isTermsAccepted, setIsTermsAccepted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // SignIn.jsx
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const response = await loginUser(formData);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userRole', response.user.role);
        
        // Redirect based on role
        const dashboardPaths = {
          registrar: '/registrar-dashboard',
          lecturer: '/lecturer-dashboard',
          student: '/student-dashboard'
        };
        
        navigate(dashboardPaths[response.user.role] || '/');
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

    const handleCheckboxChange = (e) => {
        setIsTermsAccepted(e.target.checked);
    };

    const handleSignInClick = (e) => {
        e.preventDefault();
        console.log('Sign In:', formData);
        
        if (isFormValid) {
            const userRole = localStorage.getItem('userRole');
            const userFullname = localStorage.getItem('userFullname');
            const userEmail = localStorage.getItem('userEmail');

            console.log('User Fullname:', userFullname);
            console.log('User Email:', userEmail);
            console.log('User Role:', userRole);

            if (userRole === 'registrar') {
                navigate('/registrar-dashboard/dashboard');
            } else if (userRole === 'student') {
                navigate('/app/dashboard');
            } else if (userRole === 'lecturer') {
                navigate('/lecturer-dashboard');
            } else {
                console.log('Invalid user role');
                navigate('/signup');
            }
        } else {
            console.log('Form is  not valid');
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
                <form className='signin-right-form'    onSubmit={(e)=>handleSignInClick(e)}>
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
                                onChange={handleChange}/>
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
                            minLength={8}/>
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
                            onChange={handleCheckboxChange}/>
                        I have read and accepted all the AITS terms and conditions 
                    </label>
                    <button 
                  
                    className='signinbutton'
                 
                    disabled={!isFormValid}>
                        SIGN IN
                    </button>
                    <p className='link'>Don't have an account? <a href='signup' className='signup-link'>Sign Up</a></p>
                </form>
            </div>
        </div>
    );
};

export default SignIn;