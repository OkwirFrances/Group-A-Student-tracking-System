import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './studentdashboard.css';
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { toast } from 'react-toastify';
import { issueAPI, authAPI } from '../../services/api'; // Adjust import path as needed

const StudentDashboard = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Set user role in localStorage
    useEffect(() => {
        localStorage.setItem('userRole', 'student');
    }, []);

    const fetchStudentIssues = async () => {
        try {
            setLoading(true);
            const studentIssues = await issueAPI.getIssues();
            // Filter issues created by the current student
            const userId = localStorage.getItem('userId');
            const filteredIssues = studentIssues.filter(issue => 
                issue.created_by === userId
            );
            setIssues(filteredIssues);
        } catch (error) {
            if (error === 'Unauthorized') {
                handleLogout();
            } else {
                toast.error(error || 'Failed to fetch your issues');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        authAPI.logout();
        navigate('/signin');
    };

    useEffect(() => { 
        fetchStudentIssues(); 
    }, []);

    return (
        <div className="dashboard-container">
            <Navbar />
            <Sidebar />
            <div className="dashboard-content">
                <Outlet context={{ 
                    issues,
                    loading,
                    onRefresh: fetchStudentIssues
                }} />
            </div>
        </div>
    );
};

export default StudentDashboard;