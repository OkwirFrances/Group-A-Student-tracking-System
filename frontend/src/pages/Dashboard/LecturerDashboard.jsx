import React from "react";
import { Outlet } from "react-router-dom";
import './studentdashboard.css';
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";



const LecturerDashboard = () => {
    return (
            <div className="dashboard-container">
                <Navbar />
                <Sidebar />
                <div className="dashboard-content">
                    <Outlet/>
                </div>
            </div>
       
    );
};

export default LecturerDashboard;