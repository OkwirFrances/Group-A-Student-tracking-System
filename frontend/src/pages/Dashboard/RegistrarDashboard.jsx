import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './studentdashboard.css';
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from 'axios';
import { toast } from 'react-toastify';

const RegistrarDashboard = () => {
    const [allIssues, setAllIssues] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [issuesRes, lecturersRes] = await Promise.all([
                axios.get('http://localhost:8000/issues/'),
                axios.get('http://localhost:8000/lecturers/')
            ]);
            setAllIssues(issuesRes.data);
            setLecturers(lecturersRes.data);
        } catch (error) {
            toast.error('Data fetch failed');
        } finally {
            setLoading(false);
        }
    };

    const handleAssign = async (issueId, lecturerId) => {
        try {
            await axios.post(`http://localhost:8000/issues/${issueId}/assign/${lecturerId}/`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
            });
            await fetchData();
            toast.success('Assignment successful');
        } catch (error) {
            toast.error('Assignment failed');
        }
    };

    useEffect(() => { fetchData(); }, []);

    return (
        <div className="dashboard-container">
            <Navbar />
            <Sidebar />
            <div className="dashboard-content">
                <Outlet context={{ 
                    allIssues,
                    lecturers,
                    loading,
                    onAssignIssue: handleAssign
                }} />
            </div>
        </div>
    );
};

export default RegistrarDashboard;