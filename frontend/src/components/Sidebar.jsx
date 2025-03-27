import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import dashboard from '../assets/dashboard.png';
import issue from '../assets/issue.png';
import person from '../assets/person.png';
import settings from '../assets/settings.png';
import support from '../assets/support.png';
import logout from '../assets/logout.png';

const Sidebar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/signin');
    };
    return (
        <div className='sidebar'>
            <ul className='sidebar-menu'>
                <li className='sidebar-item'>
                    <Link to='dashboard'>
                        <img src={dashboard} alt='dashboard' className='sidebar-icon'/>
                            Dashboard
                    </Link>
                    </li>
                <li className='sidebar-item'>
                    <Link to='issues'>
                        <img src={issue} alt='issue' className='sidebar-icon'/>
                        Issues
                    </Link>
                    </li>
                <li className='sidebar-item'>
                    <Link to='/profile'>
                        <img src={person} alt='person' className='sidebar-icon'/>
                        Profile
                    </Link>
                    </li>
                <li className='sidebar-item'>
                    <Link to='/app/settings'>
                        <img src={settings} alt='settings' className='sidebar-icon'/>
                        Settings
                    </Link>
                    </li>
                <li className='sidebar-item'>
                    <Link to='/app/support'>
                        <img src={support} alt='support' className='sidebar-icon'/>
                        Help & Support
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