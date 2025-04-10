import React, { useState, useEffect } from 'react';
import './Dashboardcontent.css';
import search from '../../assets/search.png';
import add from '../../assets/add.png';
import emptybox from '../../assets/emptybox.png';
import { Link, useNavigate } from 'react-router-dom';

const DashboardContent = () => {
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

    useEffect(() => {
        const loadIssues = () => {
            const storedIssues = JSON.parse(localStorage.getItem('issues')) || [];
            setIssues(storedIssues);
        };

        loadIssues();

        window.addEventListener('storage', loadIssues);

        return () => {
            window.removeEventListener('storage', loadIssues);
        };
    }, []);

 
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
                    
                    <div className='header-actions'>
                        {userRole === 'student' && (
                            <Link to={`/${userRole}/issueform`}>
                                <button className='new-issue-button'>
                                    <img 
                                        src={add} 
                                        alt='add' 
                                        className='add-icon'
                                        width={16}
                                        height={16}
                                        loading="lazy"
                                    /> New Issue
                                </button>
                            </Link>
                        )}

                        <select 
                            value={filterStatus} 
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className='filter-select'
                        >
                            <option value='all'>All</option>
                            <option value='pending'>Pending</option>
                            <option value='in-progress'>In Progress</option>
                            <option value='resolved'>Resolved</option>
                        </select>

                        <div className='search-container'>
                            <input 
                                type='text' 
                                placeholder='Search...'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <img 
                                src={search}
                                alt='search' 
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>

                <div className='issues-table'>
                    <div className='table-header'>
                        <div>Title</div>
                        <div>Status</div>
                        {userRole === 'registrar' && <div>Assigned To</div>}
                        <div>Date</div>
                        <div>Actions</div>
                    </div>
                       
                    {filteredIssues.length > 0 ? (
                        filteredIssues.map(issue => (
                            <div key={issue.id} className='table-row'>
                                <div onClick={() => navigate(`/${userRole}/issue/${issue.id}`)}>
                                    {issue.title}
                                </div>
                                <div className={`status-${issue.status.replace(' ', '-')}`}>
                                    {issue.status}
                                </div>
                                {userRole === 'registrar' && (
                                    <div>
                                        <select 
                                            value={issue.assigned_to || ''}
                                            onChange={(e) => onAssignIssue(issue.id, e.target.value)}
                                            className='filter-select'
                                        >
                                            <option value="">Unassigned</option>
                                            {lecturers.map(l => (
                                                <option key={l.id} value={l.id}>{l.fullname}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                <div>{new Date(issue.date).toLocaleDateString()}</div>
                                <div>
                                    {userRole === 'lecturer' && issue.status !== 'resolved' && (
                                        <button 
                                            className='action-button resolve-button'
                                            onClick={() => onResolveIssue(issue.id)}
                                        >
                                            Resolve
                                        </button>
                                    )}
                                    <button 
                                        className='action-button view-button'
                                        onClick={() => navigate(`/${userRole}/issue/${issue.id}`)}
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='empty-state'>
                            <img src={emptybox} alt='No issues' className='emptybox-icon' />
                            <p className='emptybox-p'>{searchQuery ? 'No matching issues' : 'No issues found'}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;


