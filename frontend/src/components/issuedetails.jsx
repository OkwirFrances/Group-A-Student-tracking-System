import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { IssuesContext } from '../context/IssueContext';
import './issuedetails.css';

const IssueDetails = () => {
    const { id } = useParams();
    const { issues } = useContext(IssuesContext);
    const issue = issues.find(issue => issue.id === id);

    if (!issue) {
        return <div>Issue not found</div>;
    }

    return (
        <div className='issue-detail-container'>
            
        </div>
    )
};