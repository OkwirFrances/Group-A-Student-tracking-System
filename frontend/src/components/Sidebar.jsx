import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import dashboard from '../assets/dashboard.png';
import issue from '../assets/issue.png';
import person from '../assets/person.png';
import settings from '../assets/settings.png';
import support from '../assets/support.png';
import logout from '../assets/logout.png';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/signin');
    };
    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                {isCollapsed ? <FiChevronRight size={16} /> : <FiChevronLeft size={16} />}
            </button>
            <ul className='sidebar-menu'>
                <li className='sidebar-item'>
                    <Link to='/app/dashboard'>
                        <img src={dashboard} alt='dashboard' className='sidebar-icon'/>
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li className='sidebar-item'>
                    <Link to='/app/issuemanagement'>
                        <img src={issue} alt='issue' className='sidebar-icon'/>
                        <span>Issues</span>
                    </Link>
                </li>
                <li className='sidebar-item'>
                    <Link to='/app/profile'>
                        <img src={person} alt='person' className='sidebar-icon'/>
                        <span>Profile</span>
                    </Link>
                </li>
                <li className='sidebar-item'>
                    <Link to='/app/settings'>
                        <img src={settings} alt='settings' className='sidebar-icon'/>
                        <span>Settings</span>
                    </Link>
                </li>
                <li className='sidebar-item'>
                    <Link to='/app/support'>
                        <img src={support} alt='support' className='sidebar-icon'/>
                        <span>Help & Support</span>
                    </Link>
                </li>
                <li className='sidebar-item logout'>
                    <button onClick={handleLogout} className='logout-button'>
                        <img src={logout} alt='logout' className='sidebar-icon'/>
                        Logout
                    </button>
                        </li>
            </ul>
        </div>
    );
};

export default Sidebar;