import React from 'react';
import './emailrequest.css';
import help from '../assets/help.png';
import doorkey from '../assets/doorkey.png';

const EmailRequest = () => {

    return (
        <div className='emailrequest-container'>
            <h1>AITS</h1>
            <div className='emailrequest-help'>
                <img src={help} alt='help logo' className='emailrequest-help-logo' />Help?
                <div className='tooltip'>
                    Email Address: alvin69david@gmail.com
                    Phone Number: 0758862363
                </div>
            </div>
            <div className='emailrequest-content'>
                <img src={doorkey} alt='door' className='emailrequest-door' />
                <h1>Reset Password</h1>
                <p>Don't worry! Enter your registered Email Address<br />to reset your password.</p>
                <input type='email' className='emailrequest-email' placeholder='Enter Your Email Address' required />
            </div>
        </div>
        
    );
};

export default EmailRequest;