import React from "react";
import { Outlet } from "react-router-dom";
import './registrardashboard.css';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";



const RegistrarDashboard = () => {
    const userRole = localStorage.getItem('userRole');
    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="main-layout">
                <Sidebar />
                <div className="dashboard-content">
                    <Outlet content = {{
                       allIssues,
                       lecturers,
                       loading,
                       onAssignIssue: handleAssign
                   }} />
                </div>
            </div>
        </div>
    );
};

export default RegistrarDashboard;