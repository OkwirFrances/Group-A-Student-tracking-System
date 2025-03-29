import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './registrardashboard.css';

const RegistrarDashboard = () => {
    return (
        <div>
            <Sidebar />
            <div>
                <Navbar />
                <h1>Lecturer Dashboard</h1>
            </div>
        </div>
    );
};

export default RegistrarDashboard;