import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './registrardashboardcontent.css';
import filter from '../assets/filter.png';
import emptybox from '../assets/emptybox.png';
import search from '../assets/search.png';
import { issueAPI, lecturerAPI } from "../services/api"; //imports the api methods from the api.js file

const RegistrarDashboardContent = () => {
    const [assignedIssues, setAssignedIssues] = useState(0);
    const [pendingIssues, setPendingIssues] = useState(0);
    const [inProgressIssues, setInProgressIssues] = useState(0);
    const [resolvedIssues, setResolvedIssues] = useState(0);
    const [lecturers, setLecturers] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchData = async () => {
        try {
            const [issuesResponse, lecturersResponse] = await Promise.all([
                issueAPI.getIssues(), // Fetch issues from the API
                lecturerAPI.getLecturers() // Fetch lecturers from the API
            ]);
            setAssignedIssues(issuesResponse);
            setLecturers(lecturersResponse);
        } catch (error) {
            toast.error("Error fetching data:");
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAssign = async (issueId, lecturerId) => {
        try {
            await issueAPI.assignIssue(issueId, lecturerId); 
            await fetchData();// Assign the issue to the lecturer
            toast.success("Issue assigned successfully!");
        } catch (error) {
            toast.error("Error assigning issue:");
            console.error('Error assigning issue:', error);
        }
    };




    const navigate = useNavigate();

    const handleOpenIssuesClick = () => {
        navigate('/registrar-dashboard/openissues');
    };

    return (
        <div className="registrar-dashboard-content">
            <h1>Dashboard</h1>
            <div className="registrar-card-container">
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
            <p className="recent">Recent Actions</p>
            <div className="registrar-recent">
                <p className="assigned">Assigned Issues</p>
                <button className="open-issues-button" onClick={handleOpenIssuesClick}>
                    Open Issues
                </button>
                <div className='filter-issue-container'>
                    <select className='filter-issue' >
                        <option value='all'>All</option>
                        <option value='pending'>Pending</option>
                        <option value='in-progress'>In-progress</option>
                        <option value='resolved'>Resolved</option>
                        <img src={filter} alt='filter' className='issuefiltericon' /> 
                    </select>
                </div>
                <div className='myissuessearchcontainer'>
                    <input 
                        type='text' 
                        placeholder='Search for anything...' 
                        className='myissuessearchinput' />
                        <img src={search} alt='search' className='myissuessearchicon' />
                </div>
                <div className='issuestable'>
                <div className='tableheader'>
                    <div className='tableheader-item'>Issue</div>
                    <div className='tableheader-item'>Status</div>
                    <div className='tableheader-item'>Category</div>
                    <div className='tableheader-item'>Date</div>
                </div>
                <div className="registrar-issues-container">
                    <img src={emptybox} alt="emptybox" className="emptyboxicon" />
                    <p>There are no recent issues worked upon.<br/>Kindly click <b>Open Issues</b> to get started.</p>
                </div>
                </div>
            </div>
        </div>
    )
};


export default RegistrarDashboardContent;