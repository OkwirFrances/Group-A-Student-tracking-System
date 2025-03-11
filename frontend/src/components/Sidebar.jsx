import React from 'react';
import './Sidebar.css';
import dashboard from '../icons/dashboard.png';
import issue from '../icons/issue.png';
import person from '../icons/person.png';
import settings from '../icons/settings.png';
import support from '../icons/support.png';
import logout from '../icons/logout.png';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <ul className='sidebar-menu'>
                <li className='sidebar-item'>
                <img src={dashboard} alt='dashboard' className='sidebar-icon'/>
                    Dashboard</li>
                <li className='sidebar-item'>
                    <img src={issue} alt='issue' className='sidebar-icon'/>
                    Issues</li>
                <li className='sidebar-item'>
                    <img src={person} alt='person' className='sidebar-icon'/>
                    Profile</li>
                <li className='sidebar-item'>
                    <img src={settings} alt='settings' className='sidebar-icon'/>
                    Settings</li>
                <li className='sidebar-item'>
                    <img src={support} alt='support' className='sidebar-icon'/>
                    Help & Support</li>
                <li className='sidebar-item logout'>
                    <img src={logout} alt='logout' className='sidebar-icon'/>
                    Logout</li>
            </ul>
        </div>
    );
};

export default Sidebar;