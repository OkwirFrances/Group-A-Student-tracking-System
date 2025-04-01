import React, { useState, useContext } from 'react';
import './Dashboardcontent.css';
import search from '../../assets/search.png';
import add from '../../assets/add.png';
import emptybox from '../../assets/emptybox.png';
import { Link, useNavigate } from 'react-router-dom';
import { IssuesContext } from '../../context/IssueContext';

const DashboardContent = () => {
    const { issues:contextIssues } = useContext(IssuesContext);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    
    const outletContext = useOutletContext() || {};
    const { 
        issues = contextIssues || [], 
        assignedIssues = [], 
        allIssues = [],
        loading = false,
        onResolveIssue = () => {},
        onAssignIssue = () => {},
        lecturers = []
    } = outletContext;

    const userRole = localStorage.getItem('userRole') || 'student';
    
    const displayIssues = userRole === 'student' ? issues : 
                        userRole === 'lecturer' ? assignedIssues : 
                        allIssues;

    const filteredIssues = (displayIssues || []).filter(issue => {
        const statusMatch = filterStatus === 'all' || issue.status === filterStatus;
        const searchMatch = issue.title.toLowerCase().includes(searchQuery.toLowerCase());
        return statusMatch && searchMatch;
    });

    return (
        <div className='dashboard-content'>
            <h1>{`${userRole.charAt(0).toUpperCase() + userRole.slice(1)} Dashboard`}</h1>
            
            <div className='cards-container'>
                <div className='card pending'>
                    <h2>Pending</h2>
                    <p>{(displayIssues || []).filter(i => i.status === 'pending').length}</p>
                </div>
                <div className='card in-progress'>
                    <h2>In Progress</h2>
                    <p>{(displayIssues || []).filter(i => i.status === 'in-progress').length}</p>
                </div>
                <div className='card resolved'>
                    <h2>Resolved</h2>
                    <p>{(displayIssues || []).filter(i => i.status === 'resolved').length}</p>
                </div>
            </div>

            <div className='issues-section'>
                <div className='section-header'>
                    <h2>{userRole === 'student' ? 'My Issues' : 
                        userRole === 'lecturer' ? 'Assigned Issues' : 'All Issues'}</h2>
                    
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
                            {/* <img src={filter} alt='filter' className='filter-icon' /> */}
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
                    {filteredIssues.length > 0 ? (
                        filteredIssues.map((issue, index) => (
                            <div key={index} className='table-row' onClick={() => handleIssueClick(issue.id)}>
                                <div className='table-row-item'>{issue.title}</div>
                                <div className='table-row-item'>{issue.status}</div>
                                <div className='table-row-item'>{issue.category}</div>
                                <div className='table-row-item'>{issue.date}</div>
                            </div>
                        ))
                    ) : (
                        <div className='empty-image-container'>
                        <img src={emptybox} alt='emptybox' className='emptybox-icon' />
                        <p className='emptybox-p'>There are no recent issues added.<br />Kindly click <b>New Issue</b> to get started</p>
                        </div>
                        )}
                </div>
               </div>    
            </div>
        </div>
    );
};

export default DashboardContent;