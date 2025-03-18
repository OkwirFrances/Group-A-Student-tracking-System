import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboardcontent.css';
import search from '../assets/search.png';
import add from '../assets/add.png';
import filter from '../assets/filter.png';
import emptybox from '../assets/emptybox.png';
import axios from 'axios';

const DashboardContent = () => {
    const [pendingIssues, setPendingIssues] = useState(0);
    const [inprogressIssues, setInprogressIssues] = useState(0);
    const [resolvedIssues, setResolvedIssues] = useState(0);
    const [recentActions, setRecentActions] = useState([]);
    const [searchQuerry,setSearchQuerry] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [issues, setIssues] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/issues')
        .then((response) => {
            const issues = response.data;

            setPendingIssues(issues.filter((issue) => issue.issue_status === 'Pending').length);
            setInprogressIssues(issues.filter((issue) => issue.issue_status === 'In-progress').length);
            setResolvedIssues(issues.filter((issue) => issue.issue_status === 'Resolved').length);
            setRecentActions(issues.sort((a,b) => new Date(b.date_created) -new Date(a.date_created)).slice(0,5));
            setIssues(issues);
        })
        .catch((error) => console.log(error));
    },
    []);


    const handleNewIssueClick = () => {
        navigate('/issueform');
    };

    const handleFilterChange = (event) => {
        setFilterStatus(event.target.value);
    };
    const filteredIssues = issues.filter((issues) => {
        const matchesStatus = filterStatus === 'all' || issues.issue_status.toLowerCase()  ===
        filterStatus.toLowerCase();
        const matchesSearch = issues.issue_type.toLowerCase().includes(searchQuerry.toLowerCase())
        || issues.issue_description.toLowerCase().includes(searchQuerry.toLowerCase())

        return matchesStatus && matchesSearch;
    } );


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
                <ul>{recentActions.map((action) =>
                <li key = {action.id} > {action.issue_type} - {action.issue_status}
                (Created: {new Date(action.date_created).toLocaleDateString()})
                </li>
                )}
                </ul>
                
            </div>
            <div className='my-issues'>
                <h2 className='my-issues-title' >My Issues</h2>
                <button className='new-issue-button' onClick={handleNewIssueClick}>
                    <img src={add} alt='add' className='add-icon' />
                    New Issue
                </button>
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
                    className='my-issues-search-input' 
                    value = {searchQuerry}
                    onChange = {(e) => setSearchQuerry(e.target.value)}/>
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
                        filteredIssues.map((issue) => (
                            <div key = {issue.id} className='table-row'>
                                <div className=' table-row-item' >{issue.issue_type}</div>
                                <div className=' table-row-item' >{issue.issue_status}</div>
                                <div className=' table-row-item' >{issue.course_unit.course_unit_name}</div>
                                <div className=' table-row-item' >{new Date(issue.date_created).toLocaleDateString()}</div>
                                </div>
                        ))
                    ):(
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