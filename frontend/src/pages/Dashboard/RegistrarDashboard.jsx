import React from "react";
import { Outlet } from "react-router-dom";
import './studentdashboard.css';
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";



const RegistrarDashboard = () => {
    return (
            <div className="dashboard-container">
                <h1>Registrar</h1>
                <Navbar />
                <Sidebar />
                <div className="dashboard-content">
                    <Outlet/>
                </div>
            </div>
       
    );
};

export default RegistrarDashboard;