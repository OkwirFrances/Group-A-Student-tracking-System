import React from "react";
import './studentdashboard.css';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const StudentDashboard = () => {
    return (
        <div className="dashboard-container">
            <Navbar />
            <Sidebar />
            <div className="dashboard-content">
            </div>
        </div>
    );
};

export default StudentDashboard;