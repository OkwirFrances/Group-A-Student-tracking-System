import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './helpsupport.css';

const HelpSupport = () => {
    return (
        <div className='helpsupport-container'>
            <Sidebar />
            <div className='helpsupport-content'>
                <Navbar />
                <h1>Help/Support</h1>
                <div className='helpsupport-box'></div>
            </div>
        </div>
    );
};

export default HelpSupport;