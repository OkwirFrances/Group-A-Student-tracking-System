import React from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import './openissues.css';

const OpenIssues = () => {
    return (
        <div className='open-issues-container'>
            <Navbar />
            <Sidebar />
            <div className='open-issues-content'>
                <h1>Assigned Issues</h1>
                <div className='issues-navigation'>
                    <button className='nav-button'>Pending</button>
                    <button className='nav-button'>In-Progress</button>
                    <button className='nav-button'>Resolved</button>
                </div>
                <div className='Issues'></div>
            </div>
        </div>
    );
};

export default OpenIssues;