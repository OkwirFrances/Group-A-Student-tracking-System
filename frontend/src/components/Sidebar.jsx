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
import department from '../assets/department.png';
import course from '../assets/course.png';

const Sidebar = () => {
<<<<<<< HEAD
=======
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

>>>>>>> de4c61a8e5bf09af41722aea7ae149074d20aa2d
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole'); // Get the user role from localStorage

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        navigate('/signin');
    };

    
    const basePath = userRole === 'registrar' ? '/registrar-dashboard' : '/app';

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                {isCollapsed ? <FiChevronRight size={16} /> : <FiChevronLeft size={16} />}
            </button>
            <ul className='sidebar-menu'>
                <li className='sidebar-item'>
<<<<<<< HEAD
                    <Link to={`${basePath}/dashboard`}> 
                        <img src={dashboard} alt='dashboard' className='sidebar-icon' />
                        Dashboard
                    </Link>
                </li>
                {userRole === 'registrar' && (
                    <>
                        <li className='sidebar-item'>
                            <Link to={`${basePath}/department`}>
                                <img src={department} alt='department' className='sidebar-icon' />
                                Departments
                            </Link>
                        </li>
                        <li className='sidebar-item'>
                            <Link to={`${basePath}/course`}>
                                <img src={course} alt='course' className='sidebar-icon' />
                                Courses
                            </Link>
                        </li>
                    </>
                )}
                <li className='sidebar-item'>
                    <Link to={`${basePath}/issues`}>
                        <img src={issue} alt='issue' className='sidebar-icon' />
                        Issues
                    </Link>
                </li>
                <li className='sidebar-item'>
                    <Link to={`${basePath}/profile`}>
                        <img src={person} alt='person' className='sidebar-icon' />
                        Profile
                    </Link>
                </li>
                <li className='sidebar-item'>
                    <Link to={`${basePath}/settings`}>
                        <img src={settings} alt='settings' className='sidebar-icon' />
                        Settings
                    </Link>
                </li>
                <li className='sidebar-item'>
                    <Link to={`${basePath}/support`}>
                        <img src={support} alt='support' className='sidebar-icon' />
                        Help & Support
=======
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
>>>>>>> de4c61a8e5bf09af41722aea7ae149074d20aa2d
                    </Link>
                </li>
                <li className='sidebar-item logout'>
                    <button onClick={handleLogout} className='logout-button'>
                        <img src={logout} alt='logout' className='sidebar-icon' />
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;