import React from 'react';
import './landingpage.css';
import logo from '../icons/logo.png';


const LandingPage = ({onSignUpClick, onSignInClick}) => {
    return (
            <div className='landing-page'>
                <div className='logo-container'>
                    <img src={logo} className='muk-logo' alt='muk' />
                    <span className='logo-text' >AITS</span>
                </div>
                <div className='auth-buttons'>
                    <button className='auth-button' onClick={onSignUpClick}>SIGN UP</button>
                    <div className='separator' ></div>
                    <button className='auth-button' onClick={onSignInClick}>SIGN IN</button>
                </div>
                <p className='auth-text'>"Please Sign Up to get started"</p>
                <h1 className='body-words'>ACADEMIC ISSUE TRACKING SYSTEM</h1>
                <p className='sub-text' >"Track and manage your issues seamlessly"</p>

            </div>
            
                 
     
    );
};

export default LandingPage;