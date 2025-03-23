import React from 'react';
import './messages.css';
import Navbar from './Navbar';
import backarrow from '../assets/backarrow.png';

const Messages = () => {
    return (
        <div className='messages-container'>
            <Navbar />
            <div className='messages-content'>
                <h1>Messages</h1>
                <img src={backarrow} alt='backarrow' className='backarrow'/>
                <div>
                    <h2>There are no messages here.</h2>
                    <p>You will get notified when you get a message which will appear here.<br/>You can also start a new message by clicking <b>New Message</b>.</p>
                </div>
            </div>
        </div>
    );
};

export default Messages;