import React from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import search from '../assets/search.png';
import filter from '../assets/filter.png';
import emptybox from '../assets/emptybox.png';
import './openissues.css';

const OpenIssues = () => {
    return (
        <div className='open-issues-container'>
            <Navbar />
            <Sidebar />
            <div className='open-issues-content'>
                <h1>Assigned Issues</h1>
                <div className='issues-navigation'>
                    <button className='nav-button'>Pending</button>
                    <button className='nav-button'>In-Progress</button>
                    <button className='nav-button'>Resolved</button>
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
                        <img src={emptybox} alt="emptybox" className="emptybox" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpenIssues;