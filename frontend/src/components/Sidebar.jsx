import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';
// import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import dashboard from '../assets/dashboard.png';
import issue from '../assets/issue.png';
import person from '../assets/person.png';
import settings from '../assets/settings.png';
import support from '../assets/support.png';
import logout from '../assets/logout.png';
import department from '../assets/department.png';
import course from '../assets/course.png';


const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const userRole = localStorage.getItem('userRole')?.toLowerCase() || 'student'; // Get the user role from localStorage

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userFullName');
        localStorage.removeItem('access_token');
        navigate('/signin');
    };

    const getBasePath = () => `/${userRole}`;
    const menuItems = {
        student: [
          { path: 'dashboard', icon: dashboard, label: 'Dashboard' },
          { path: 'issueform', icon: issue, label: 'New Issue' },
          { path: 'issues', icon: issue, label: 'My Issues' },
          { path: 'profile', icon: person, label: 'Profile' },
          { path: 'settings', icon: settings, label: 'Settings' }
        ],
        lecturer: [
              { path: 'dashboard', icon: dashboard, label: 'Dashboard' },
              { path: 'issues', icon: issue, label: 'Assigned Issues' },
              { path: 'profile', icon: person, label: 'Profile' },
              { path: 'settings', icon: settings, label: 'Settings' }
            ],
        registrar: [
            { path: 'dashboard', icon: dashboard, label: 'Dashboard' },
            { path: 'issues', icon: issue, label: 'All Issues' },
            { path: 'departments', icon: settings, label: 'Departments' },
            { path: 'courses', icon: settings, label: 'Courses' },
            { path: 'lecturer', icon: person, label: 'lecturer' },
            { path: 'profile', icon: person, label: 'Profile' },
            { path: 'settings', icon: settings, label: 'Settings' }
                ]
    };

    const isActive = (path) => {
        return location.pathname.includes(path);
        };
                
    return (
        <div className='sidebar'>
            <ul className='sidebar-menu'>
                {menuItems[userRole]?.map((item) => (
                          <li 
                            key={item.path} 
                            className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
                          >
                            <Link to={`${getBasePath()}/${item.path}`} className="sidebar-link">
                              <img src={item.icon} alt={item.label} className='sidebar-icon' />
                              <span className="sidebar-label">{item.label}</span>
                            </Link>
                          </li>
                        ))}
                <li className='sidebar-item logout'>
                    <button onClick={handleLogout} className='logout-button'>
                        <img src={logout} alt='logout' className='sidebar-icon' />
                        <span className="sidebar-label">Logout</span>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;