import React from 'react';
import './Issuemanagement.css';
import { FiSearch } from 'react-icons/fi';

const Issuemanagement = () => {
    const mockIssues = [
        { id: 1, title: "Course Registration Issue", category: "Registration", status: "Open", date: "2024-01-15" },
        { id: 2, title: "Missing Grades", category: "Academic", status: "In Progress", date: "2024-01-14" },
        { id: 3, title: "Login Problem", category: "Technical", status: "Resolved", date: "2024-01-13" },
    ];

    const getStatusClass = (status) => {
        switch(status.toLowerCase()) {
            case 'open': return 'status-open';
            case 'in progress': return 'status-in-progress';
            case 'resolved': return 'status-resolved';
            default: return '';
        }
    };

    return (
        <div className="issue-management">
            <div className="issue-header">
                <h1>Issue Management</h1>
            </div>
            
            <div className="issue-actions">
                <div className="search-bar">
                    <FiSearch size={20} color="#A3AED0"/>
                    <input type="text" placeholder="Search issues..." />
                </div>
                <button className="new-issue-btn">+ New Issue</button>
            </div>

            <div className="issues-table">
                <div className="table-header">
                    <div>ID</div>
                    <div>Issue Title</div>
                    <div>Category</div>
                    <div>Status</div>
                    <div>Date</div>
                </div>
                {mockIssues.map(issue => (
                    <div key={issue.id} className="table-row">
                        <div>#{issue.id}</div>
                        <div>{issue.title}</div>
                        <div>{issue.category}</div>
                        <div>
                            <span className={`status-badge ${getStatusClass(issue.status)}`}>
                                {issue.status}
                            </span>
                        </div>
                        <div>{issue.date}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Issuemanagement;