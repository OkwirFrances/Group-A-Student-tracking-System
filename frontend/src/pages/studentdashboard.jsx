import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './studentdashboard.css';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardContent from "../components/Dashboardcontent";

const StudentDashboard = () => {
    return (
        <Router>
            <div className="dashboard-container">
                <Navbar />
                <Sidebar />
                <div className="dashboard-content">
                    <Routes>
                        <Route path="/dashboard" element={<DashboardContent />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default StudentDashboard;