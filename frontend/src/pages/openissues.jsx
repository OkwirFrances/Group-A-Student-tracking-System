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
            </div>
        </div>
    );
};

export default OpenIssues;