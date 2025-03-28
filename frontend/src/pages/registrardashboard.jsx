import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
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