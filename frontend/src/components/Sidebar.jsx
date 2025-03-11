import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <ul className='sidebar-menu'>
                <li className='sidebar-item'>Dashboard</li>
                <li className='sidebar-item'>Issues</li>
                <li className='sidebar-item'>Profile</li>
                <li className='sidebar-item'>Settings</li>
                <li className='sidebar-item'>Help & Support</li>
                <li className='sidebar-item'>Logout</li>
            </ul>
        </div>
    );
};

export default Sidebar;