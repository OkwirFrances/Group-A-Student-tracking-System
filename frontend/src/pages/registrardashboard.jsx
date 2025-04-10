import React from "react";
import { Outlet } from "react-router-dom";
import './studentdashboard.css';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


const RegistrarDashboard = () => {
    const userRole = localStorage.getItem('userRole');
    return (
            <div className="dashboard-container">
                <h1>Registrar Dashboard</h1>
                <p>Welcome {userRole}</p>
                <Navbar />
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
       
    );
};

export default RegistrarDashboard;

