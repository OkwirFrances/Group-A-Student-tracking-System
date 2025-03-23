import React from 'react';
import Navbar from '../components/Navbar';
import './newmessage.css';
import backarrow from '../assets/backarrow.png';

const NewMessage = () => {
    return (
        <div className='newmessage-container'>
            <Navbar />
            <div className='newmessage-content'>
                <img src={backarrow} alt='backarrow' className='back-arrow' />
                <h1>New Message</h1>
            </div>
        </div>
    );
};

export default NewMessage;