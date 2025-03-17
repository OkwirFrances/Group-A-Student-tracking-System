import React from "react";
import { Outlet } from "react-router-dom";
import './studentdashboard.css';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const StudentDashboard = () => {
    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="main-layout">
                <Sidebar />
                <div className="dashboard-content">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;