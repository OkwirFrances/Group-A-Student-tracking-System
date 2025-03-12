import React from 'react';
import './congratulations.css';
import congratulations from '../icons/congratulations.png';
import help from '../icons/help.png';

const Congratulations = ({onSignInClick}) => {

    return (
        <div className='congratulations-container'>
            <div className='aits-logo'>AITS</div>
            <div className='help'>
                <img src={help} alt='help logo' className='help-logo' />Help?
                <div className='tooltip'>
                    Email Address: alvin69david@gmail.com
                    Phone Number: 0758862363
                </div>
            </div>
            <div className='congratulations-content'>
                <img className='congratulations-logo'src={congratulations} alt='congratulations logo' />
                <h1>Congratulations!</h1>
                <p>Your account has been successfully created and verified.<br/>Sign In to access your account.</p>
                <button className='signin-button' onClick={onSignInClick}>
                    SIGN IN
                </button>
            </div>
        </div>
    );
};

export default Congratulations;