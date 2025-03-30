import React, { useState } from "react";
import './registrardashboardcontent.css';

const RegistrarDashboardContent = () => {
    const [assignedIssues, setAssignedIssues] = useState(0);
    const [pendingIssues, setPendingIssues] = useState(0);
    const [inProgressIssues, setInProgressIssues] = useState(0);
    const [resolvedIssues, setResolvedIssues] = useState(0);

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
                <button className="open-issues-button">Open Issues</button>
            </div>
        </div>
    )
};


export default RegistrarDashboardContent;