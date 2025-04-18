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

    
};