import React from 'react';
import './lecturerdashboardcontent.css';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const LecturerDashboardContent = () => {
    return (
        <div className='lecturer-dashboard-contnent'>
            <Navbar />
            <Sidebar />
        </div>
    )
};

export default LecturerDashboardContent;