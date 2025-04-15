import React, { useState, useEffect } from 'react';
import './lecturerdashboardcontent.css';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const LecturerDashboardContent = () => {
    const [issues, setIssues] = useState([]);
    const [assignedIssues, setAssignedIssues] = useState(0);
    const [pendingIssues, setPendingIssues] = useState(0);
    const [inProgressIssues, setInProgressIssues] = useState(0);
    const [resolvedIssues, setResolvedIssues] = useState(0);

    useEffect(() => {
            const loadIssues = () => {
                const storedIssues = JSON.parse(localStorage.getItem('issues')) || [];
                setIssues(storedIssues);
    
                const assignedCount = storedIssues.length;
                const pendingCount = storedIssues.filter(issue => issue.status.toLowerCase() === 'pending').length;
                const inProgressCount = storedIssues.filter(issue => issue.status.toLowerCase() === 'in-progress').length;
                const resolvedCount = storedIssues.filter(issue => issue.status.toLowerCase() === 'resolved').length;   
    
                setAssignedIssues(assignedCount);
                setPendingIssues(pendingCount); 
                setInProgressIssues(inProgressCount);
                setResolvedIssues(resolvedCount);
    
            };

            loadIssues();

        window.addEventListener('storage', loadIssues);

        return () => {
            window.removeEventListener('storage', loadIssues);
        };
    }, []);


    return (
        <div className='lecturer-dashboard-contnent'>
            <Navbar />
            <Sidebar />
            <div className="lecturer-dashboard-content">
            <h1>Dashboard</h1>
            <div className="lecturer-card-container">
                <div className="assigned-card">
                    <h2>Assigned Issues</h2>
                    <p>{assignedIssues}</p>
                    <p>You have {assignedIssues} assigned issues</p>
                </div>
                <div className="pending-card">
                    <h2>Pending Issues</h2>
                    <p>{pendingIssues}</p>
                    <p>You have {pendingIssues} pending issues</p>
                </div>
                <div className="in-progress-card">
                    <h2>In-Progress Issues</h2>
                    <p>{inProgressIssues}</p>
                    <p>You have {inProgressIssues} in-progress issues</p>
                </div>
                <div className="resolved-card">
                    <h2>Resolved Issues</h2>
                    <p>{resolvedIssues}</p>
                    <p>You have {resolvedIssues} resolved issues</p>
                </div>
            </div>
            </div>
        </div>
    )
};

export default LecturerDashboardContent;