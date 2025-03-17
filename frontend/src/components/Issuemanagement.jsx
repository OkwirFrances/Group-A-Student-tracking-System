import React from 'react';
import './Sidebar.css';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Issuemanagement = () => {
    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="main-layout">
                <Sidebar />
                <div className="dashboard-content">
                    <h1>Issue Management</h1>
                </div>
            </div>
        </div>
    );
};

export default Issuemanagement;