import React from "react";
import './registrardashboard.css';
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";



const RegistrarDashboard = () => {
    const userRole = localStorage.getItem('userRole');
    return (
            <div className="dashboard-container">
                <h1>Registrar Dashboard</h1>
                <Navbar />
                <Sidebar />
                <div className="dashboard-content">
                
                </div>
            </div>
       
    );
};

export default RegistrarDashboard;