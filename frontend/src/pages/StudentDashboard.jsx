import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import './studentdashboard.css';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { IssuesContext } from "../context/IssueContext";



const StudentDashboard = () => {
   const {issues, loading} = useContext(IssuesContext);
    return (
            <div className="dashboard-container">
                <Navbar />
                <div className="dashboard-layout">
                    <Sidebar />
                </div>
                <div className="dashboard-content">
                    
                    <Outlet context ={{
                        issues: issues || [],
                        loading: loading || false
                    }}
                    />
                </div>
            </div>
       
    );
};

export default StudentDashboard;