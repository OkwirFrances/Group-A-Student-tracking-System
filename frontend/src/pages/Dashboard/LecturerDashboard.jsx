import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './studentdashboard.css';
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from 'axios';
import { toast } from 'react-toastify';

const LecturerDashboard = () => {
    const [assignedIssues, setAssignedIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAssignedIssues = async () => {
        try {
            const res = await axios.get('http://localhost:8000/issues/', {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            setAssignedIssues(res.data.filter(issue => 
                issue.assigned_to === localStorage.getItem('userId')
            ));
        } catch (error) {
            toast.error('Failed to fetch issues');
        } finally {
            setLoading(false);
        }
    };

    const handleResolve = async (issueId) => {
        try {
            await axios.post(`http://localhost:8000/issues/${issueId}/resolve/`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            await fetchAssignedIssues();
            toast.success('Issue resolved');
        } catch (error) {
            toast.error('Resolution failed');
        }
    };

    useEffect(() => { fetchAssignedIssues(); }, []);

    return (
        <div className="dashboard-container">
            <Navbar />
            <Sidebar />
            <div className="dashboard-content">
                <Outlet context={{ 
                    assignedIssues,
                    loading,
                    onResolveIssue: handleResolve
                }} />
            </div>
        </div>
    );
};

export default LecturerDashboard;