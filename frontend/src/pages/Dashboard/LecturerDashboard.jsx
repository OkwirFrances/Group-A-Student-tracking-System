import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './studentdashboard.css';
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from 'axios';
import { toast } from 'react-toastify';
import {ClipLoader} from 'react-spinners/ClipLoader';

const LecturerDashboard = () => {
    const [assignedIssues, setAssignedIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false); // Prevent overlapping requests
    const navigate = useNavigate();

    // Fetch auth token and user details from localStorage
    const authToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');

    // Validate user session and role
    const validateUser = useCallback(() => {
        if (!authToken || !userId || userRole !== 'lecturer') {
            toast.error('Unauthorized access. Please login again.');
            navigate('/login');
            return false;
        }
        return true;
    }, [authToken, userId, userRole, navigate]);

    // Fetch assigned issues
    const fetchAssignedIssues = useCallback(async () => {
        if (!validateUser() || isFetching) return;

        setLoading(true);
        setError(null);
        setIsFetching(true); // Prevent overlapping requests

        try {
            const response = await axios.get('http://localhost:8000/api/issues/', {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });

            // Filter issues assigned to the current lecturer and are not resolved
            const lecturerIssues = response.data.filter(
                (issue) => issue.assigned_to?.id === parseInt(userId) && issue.status !== 'resolved'
            );
            setAssignedIssues(lecturerIssues);
        } catch (error) {
            console.error('Error fetching issues:', error);
            setError(
                error.response?.data?.error || 'Failed to fetch issues. Please try again.'
            );
            if (error.response?.status === 401) {
                toast.error('Session expired. Please login again.');
                navigate('/login');
            }
        } finally {
            setLoading(false);
            setIsFetching(false); // End API request
        }
    }, [authToken, userId, navigate, validateUser, isFetching]);

    // Handle resolve issue
    const handleResolve = async (issueId) => {
        if (!validateUser()) return;

        try {
            await axios.post(
                `http://localhost:8000/api/issues/${issueId}/resolve/`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            toast.success('Issue resolved successfully.');
            await fetchAssignedIssues(); // Refresh issues
        } catch (error) {
            console.error('Error resolving issue:', error);
            toast.error(
                error.response?.data?.error || 'Failed to resolve issue. Please try again.'
            );
        }
    };

    // Handle add comment to issue
    const handleAddComment = async (issueId, comment) => {
        if (!validateUser()) return;

        try {
            await axios.post(
                `http://localhost:8000/api/issues/${issueId}/comments/`,
                { content: comment },
                {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            toast.success('Comment added successfully.');
            await fetchAssignedIssues(); // Refresh issues
        } catch (error) {
            console.error('Error adding comment:', error);
            toast.error(
                error.response?.data?.error || 'Failed to add comment. Please try again.'
            );
        }
    };

    // Handle reject issue
    const handleRejectIssue = async (issueId, reason) => {
        if (!validateUser()) return;

        try {
            const confirmReject = window.confirm('Are you sure you want to reject this issue?');
            if (!confirmReject) return;

            await axios.post(
                `http://localhost:8000/api/issues/${issueId}/reject/`,
                { reason },
                {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            toast.success('Issue rejected successfully.');
            await fetchAssignedIssues(); // Refresh issues
        } catch (error) {
            console.error('Error rejecting issue:', error);
            toast.error(
                error.response?.data?.error || 'Failed to reject issue. Please try again.'
            );
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchAssignedIssues();

        // Periodic refresh every 30 seconds
        const interval = setInterval(fetchAssignedIssues, 30000);
        return () => clearInterval(interval); // Cleanup on component unmount
    }, [fetchAssignedIssues]);

    return (
        <div className="dashboard-container">
            <Navbar />
            <Sidebar />
            <div className="dashboard-content">
                {loading ? (
                    <div className="loading-indicator">
                        <ClipLoader size={50} color={"#123abc"} loading={loading} />
                        <p>Loading...</p>
                    </div>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : assignedIssues.length === 0 ? (
                    <p>No issues assigned to you at the moment.</p>
                ) : (
                    <ul className="issues-list">
                        {assignedIssues.map((issue) => (
                            <li key={issue.id} className="issue-item">
                                <h3>{issue.title}</h3>
                                <p>Status: {issue.status}</p>
                                <button onClick={() => handleResolve(issue.id)}>Resolve</button>
                                <button onClick={() => handleAddComment(issue.id, 'Great progress.')}>
                                    Add Comment
                                </button>
                                <button onClick={() => handleRejectIssue(issue.id, 'Invalid data')}>
                                    Reject
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <Outlet
                    context={{
                        assignedIssues,
                        loading,
                        error,
                        onResolveIssue: handleResolve,
                        onAddComment: handleAddComment,
                        onRejectIssue: handleRejectIssue,
                        refreshIssues: fetchAssignedIssues,
                    }}
                />
            </div>
        </div>
    );
};

export default LecturerDashboard;
