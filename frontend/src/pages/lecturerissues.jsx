import React, { useState, useEffect } from 'react';
import './lecturerissues.css';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import search from '../assets/search.png';
import emptybox from '../assets/emptybox.png';


const LecturerIssues = () => {
    const [issues, setIssues] = useState([]);
    const [filterstatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const storedIssues = JSON.parse(localStorage.getItem('issues')) || [];
        setIssues(storedIssues);
    }, []);

    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredIssues = issues.filter(issue => {
        const matchesStatus = filterstatus === 'all' || issue.status.toLowerCase() === filterstatus;
        const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className='lecturer-issue-screen'>
            <Navbar />  
            <Sidebar />
            <div className='lecturer-issue-content'>
                <h1>Assigned Issues</h1>
                <div className='filter-search-container'>
                    <select
                        className='filter-dropdown'
                        value={filterstatus}
                        onChange={handleFilterChange}>
                            <option value={"all"}>All</option>
                            <option value={"pending"}>Pending</option>
                            <option value={"in-progress"}>In-progress</option>
                            <option value={"resolved"}>Resolved</option>
                    </select>
                </div>
            </div>
        </div>
    )
};