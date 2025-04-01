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
                <Sidebar />
                <div className="dashboard-content">
                    <Outlet/>
                </div>
            </div>
       
    );
};

export default RegistrarDashboard;