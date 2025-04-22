import React, { useState, useEffect } from 'react';
import './Issuemanagement.css';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { FiPlus, FiSearch, FiFilter } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Issuemanagement = () => {
  const [issues, setIssues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Mock data - Replace with your API call
  const mockIssues = [
    {
      id: 1,
      title: "Course Registration Problem",
      category: "Academic",
      status: "Open",
      date: "2024-04-18",
      priority: "High"
    },
    {
      id: 2,
      title: "Missing Grades",
      category: "Academic",
      status: "In Progress",
      date: "2024-04-17",
      priority: "Medium"
    }
  ];

  useEffect(() => {
    // Replace with your API call
    setIssues(mockIssues);
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open': return 'status-open';
      case 'in progress': return 'status-progress';
      case 'resolved': return 'status-resolved';
      default: return '';
    }
  };

  const handleNewIssue = () => {
    navigate('/app/issueform');
  };

  const renderTableContent = () => {
    if (issues.length === 0) {
      return (
        <tr className="no-issues-row">
          <td colSpan="4">
            <div className="no-issues-message">No issues yet</div>
          </td>
        </tr>
      );
    }

    return issues.map((issue) => (
      <tr key={issue.id}>
        <td>{issue.title}</td>
        <td>
          <span className={`status-badge ${getStatusColor(issue.status)}`}>
            {issue.status}
          </span>
        </td>
        <td>{issue.category}</td>
        <td>{issue.date}</td>
      </tr>
    ));
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-header">
          <h1 className="page-title"></h1>
          <button className="new-issue-btn" onClick={handleNewIssue}>
            <FiPlus />
            New Issue
          </button>
        </div>
        <div className="issues-container">
          <div className="issues-header">
            <h2 className="section-title">My Issues</h2>
            <div className="header-actions">
              <div className="search-bar">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search issues..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="filter-btn">
                <FiFilter />
                Filter
              </button>
            </div>
          </div>

          <div className="issues-table">
            <table>
              <thead>
                <tr>
                  <th>Issue</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {renderTableContent()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Issuemanagement;