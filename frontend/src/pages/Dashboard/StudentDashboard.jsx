import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import './studentdashboard.css';
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { IssuesContext } from '../../context/IssueContext';

// Example for StudentDashboard.jsx
const StudentDashboard = () => {
    const { issues, loading } = useContext(IssuesContext);
    
    return (
        <div className="dashboard-container">
            <Navbar />
            <Sidebar />
            <div className="dashboard-content">
                <Outlet context={{ 
                    issues: issues || [],
                    loading: loading || false
                }} />
            </div>
        </div>
    );
};
export default StudentDashboard;