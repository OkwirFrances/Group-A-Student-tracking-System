import React from 'react';
import doorkey from '../assets/doorkey.png';
import './emailrequest.css';

const EmailRequest = () => {

    return (
        <div className='otp-container'>
                <div className='aits-logo'>AITS</div>
                    <div className='help'>
                        <img src={help} alt='help logo' className='help-logo' />Help?
                        <div className='tooltip'>
                            Email Address: alvin69david@gmail.com
                            Phone Number: 0758862363
                        </div>
                    </div>
        </div>
        
    );
};

export default EmailRequest;