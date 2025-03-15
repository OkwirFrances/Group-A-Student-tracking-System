import React, { useState } from 'react';
import './Dashboardcontent.css';
import search from '../assets/search.png';
import add from '../assets/add.png';
import filter from '../assets/filter.png';
import emptybox from '../assets/emptybox.png';
import { Link } from 'react-router-dom';

const DashboardContent = () => {
    const [pendingIssues] = useState(0);
    const [inprogressIssues] = useState(0);
    const [resolvedIssues] = useState(0);
    const [filterStatus, setFilterStatus] = useState('all');
    

    const handleFilterChange = (event) => {
        setFilterStatus(event.target.value);
    };
 
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
                <Link to = "/app/issueform">
                <button className='new-issue-button'>
                    <img src={add} alt='add' className='add-icon' />
                    New Issue
                </button>
                </Link>
                <div className='filter-select-container'>
                    <select className='filter-select' value={filterStatus} onChange={handleFilterChange}>
                            <option value='all'>All</option>
                            <option value='pending'>Pending</option>
                            <option value='in-progress'>In-progress</option>
                            <option value='resolved'>Resolved</option>
                            <img src={filter} alt='filter' className='filter-icon' />
                    </select>
               </div>
               <div className='my-issues-search-container'>
                    <input 
                    type='text' 
                    placeholder='Search for anything...' 
                    className='my-issues-search-input' />
                    <img src={search} alt='search' className='my-issues-search-icon' />
                </div>
               <div className='issues-table'>
                <div className='table-header'>
                    <div className='table-header-item'>Issue</div>
                    <div className='table-header-item'>Status</div>
                    <div className='table-header-item'>Category</div>
                    <div className='table-header-item'>Date</div>
                </div>
                <div className='table-body'>
                    <div className='empty-image-container'>
                        <img src={emptybox} alt='emptybox' className='emptybox-icon' />
                        <p className='emptybox-p'>There are no recent issues added.<br />Kindly click <b>New Issue</b> to get started</p>
                    </div>
                </div>
               </div>    
            </div>
        </div>
    );
};

export default DashboardContent;