import React from "react";
import { Outlet } from "react-router-dom";
import './studentdashboard.css';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";



const RegistrarDashboard = () => {
    const userRole = localStorage.getItem('userRole');
    return (
            <div className="dashboard-container">
                <h1>Registrar Dashboard</h1>
                <p>Welcome {userRole}</p>
                <Navbar />
                <Sidebar />
                <div className="dashboard-content">
                    <Outlet/>
                </div>
            </div>
       
    );
};

export default RegistrarDashboard;