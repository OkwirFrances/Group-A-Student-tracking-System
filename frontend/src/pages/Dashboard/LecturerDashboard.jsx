import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './studentdashboard.css';
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from 'axios';
import { toast } from 'react-toastify';

const LecturerDashboard = () => {
    const [assignedIssues, setAssignedIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Get auth token and user ID from localStorage
    const authToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    const fetchAssignedIssues = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8000/api/issues/', {
                headers: { 
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });
            
            // Filter issues assigned to current lecturer and are not resolved
            const lecturerIssues = response.data.filter(issue => 
                issue.assigned_to?.id === parseInt(userId) && issue.status !== 'resolved'
            );
            setAssignedIssues(lecturerIssues);
        } catch (error) {
            console.error('Error fetching issues:', error);
            setError('Failed to fetch issues');
            if (error.response?.status === 401) {
                toast.error('Session expired. Please login again.');
                navigate('/login');
            } else {
                toast.error(error.response?.data?.error || 'Failed to fetch issues');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResolve = async (issueId) => {
        try {
            await axios.post(
                `http://localhost:8000/api/issues/${issueId}/resolve/`, 
                {},
                {
                    headers: { 
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            await fetchAssignedIssues();
            toast.success('Issue resolved successfully');
        } catch (error) {
            console.error('Error resolving issue:', error);
            toast.error(error.response?.data?.error || 'Failed to resolve issue');
        }
    };

    const handleAddComment = async (issueId, comment) => {
        try {
            await axios.post(
                `http://localhost:8000/api/issues/${issueId}/comments/`, 
                { content: comment },
                {
                    headers: { 
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            await fetchAssignedIssues();
            toast.success('Comment added successfully');
        } catch (error) {
            console.error('Error adding comment:', error);
            toast.error(error.response?.data?.error || 'Failed to add comment');
        }
    };

    const handleRejectIssue = async (issueId, reason) => {
        try {
            await axios.post(
                `http://localhost:8000/api/issues/${issueId}/reject/`, 
                { reason },
                {
                    headers: { 
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            await fetchAssignedIssues();
            toast.success('Issue rejected successfully');
        } catch (error) {
            console.error('Error rejecting issue:', error);
            toast.error(error.response?.data?.error || 'Failed to reject issue');
        }
    };

    useEffect(() => { 
        // Verify user is lecturer
        if (localStorage.getItem('userRole') !== 'lecturer') {
            toast.error('Unauthorized access');
            navigate('/login');
            return;
        }

        fetchAssignedIssues(); 
        
        // Set up interval for periodic refresh (optional)
        const interval = setInterval(fetchAssignedIssues, 30000); // Refresh every 30 seconds
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="dashboard-container">
            <Navbar />
            <Sidebar />
            <div className="dashboard-content">
                <Outlet context={{ 
                    assignedIssues,
                    loading,
                    error,
                    onResolveIssue: handleResolve,
                    onAddComment: handleAddComment,
                    onRejectIssue: handleRejectIssue,
                    refreshIssues: fetchAssignedIssues
                }} />
            </div>
        </div>
    );
};

export default LecturerDashboard;