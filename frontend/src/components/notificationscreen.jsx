import React from 'react';
import './notificationscreen.css';
import emptybox from '../assets/emptybox.png';
import backarrow from '../assets/backarrow.png';
import Navbar from './Navbar';


const NotificationScreen = () => {
    return (
        <div>
            <Navbar />
            <div className='notification-screen'>
                <img src={backarrow} alt="backarrow" className='backarrow-icon'/>
                <h1>Notifications</h1>
                <img src={emptybox} alt="emptybox"  className='notification-emptybox'/>
                <p>There are no notifications here. You will get notified when you get a notification which will appear here.</p>
            </div>
        </div>
    );
};

export default NotificationScreen;