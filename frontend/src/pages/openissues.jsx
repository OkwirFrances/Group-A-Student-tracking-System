import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import search from '../assets/search.png';
import filter from '../assets/filter.png';
import emptybox from '../assets/emptybox.png';
import './openissues.css';

const OpenIssues = () => {
    const [selectedTab, setSelectedTab] = useState('pending');

    return (
        <div className='open-issues-container'>
            <Navbar />
            <Sidebar />
            <div className='open-issues-content'>
                <h1>Assigned Issues</h1>
                <div className='issues-navigation'>
                    <button 
                    className={`nav-button ${selectedTab === 'pending' ? 'active' : ''}`}
                    onClick={() => setSelectedTab('pending')}>
                        Pending
                    </button>
                    <button 
                    className={`nav-button ${selectedTab === 'in-progress' ? 'active' : ''}`}
                    onClick={() => setSelectedTab('in-progress')}>
                        In-Progress
                    </button>
                    <button 
                    className={`nav-button ${selectedTab === 'resolved' ? 'active' : ''}`}
                    onClick={() => setSelectedTab('resolved')}>
                        Resolved
                    </button>
                </div>
                <div className='issue'>
                    <p>Issues</p>
                    <div className='myissuescontainer'>
                        <input 
                            type='text' 
                            placeholder='Search for anything...' 
                            className='myissuesinput' />
                        <img src={search} alt='search' className='myissuesicon' />
                    </div>
                </div>
                <div className='filter-issues-container'>
                    <select className='filter-issues' >
                        <option value='all'>All</option>
                        <option value='pending'>Pending</option>
                        <option value='in-progress'>In-progress</option>
                        <option value='resolved'>Resolved</option>
                        <img src={filter} alt='filter' className='issuefiltersicon' /> 
                    </select>
                </div>
                <div className='table'>
                    <div className='header'>
                        <div className='item'>Issue</div>
                        <div className='item'>Status</div>
                        <div className='item'>Category</div>
                        <div className='item'>Date</div>
                    </div>
                    <div className='body'>
                        {selectedTab === 'pending' && (
                        <div className='emptyboxcontainers'>
                            <img src={emptybox} alt="emptybox" className="emptybox" />
                            <p>There are no pending issues.</p>
                        </div>
                    )}
                    {selectedTab === 'in-progress' && (
                        <div className='emptyboxcontainers'>
                            <img src={emptybox} alt="emptybox" className="emptybox" />
                            <p>There are no in-progress issues.</p>
                        </div>
                        )}
                        {selectedTab === 'resolved' && (
                            <div className='emptyboxcontainers'>
                                <img src={emptybox} alt="emptybox" className="emptybox" />
                                <p>There are no resolved issues.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpenIssues;