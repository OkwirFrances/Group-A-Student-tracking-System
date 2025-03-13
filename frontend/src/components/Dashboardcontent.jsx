import React, { useState } from 'react';
import './Dashboardcontent.css';
import search from '../assets/search.png';

const DashboardContent = () => {
    const [pendingIssues] = useState(0);
    const [inprogressIssues] = useState(0);
    const [resolvedIssues] = useState(0);

    return (
        <div className='dashboard-content'>
            <h1>Dashboard</h1>
            <div className='cards-container'>
                <div className='card pending'>
                    <h2>Pending Issues</h2>
                    <p className='issue-count'>{pendingIssues}</p>
                    <p>You have {pendingIssues} pending issues.</p>
                </div>
                <div className='card in-progress'>
                    <h2>In-progress Issues</h2>
                    <p className='issue-count'>{inprogressIssues}</p>
                    <p>You have {inprogressIssues} in-progress issues.</p>
                </div>
                <div className='card resolved'>
                    <h2>Resolved Issues</h2>
                    <p className='issue-count'>{resolvedIssues}</p>
                    <p>You have {resolvedIssues} resolved issues.</p>
                </div>
            </div>
            <div className='recent-actions'>
                <h2>Recent Actions</h2>
            </div>
            <div className='my-issues'>
                <h2 className='my-issues-title' >My Issues</h2>
                <div className='my-issues-search-container'>
                    <input 
                    type='text' 
                    placeholder='Search for anything...' 
                    className='my-issues-search-input' />
                    <img src={search} alt='search' className='my-issues-search-icon' />
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;