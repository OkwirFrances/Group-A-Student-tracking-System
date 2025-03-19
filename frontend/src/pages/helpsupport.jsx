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
                <div className='helpsupport-box'>
                    <h2>Kindly reach us via Email or Phone<br /> for any help </h2>
                </div>
            </div>
        </div>
    );
};

export default HelpSupport;