import React from "react";
import './SideBar.css';
import dashboard from '../icons/dashboard.png';
import issue from '../icons/issue.png';
import person from '../icons/person.png';
import settings from '../icons/settings.png';
import support from '../icons/support.png';
import logout from '../icons/logout.png';
import ProfileView from './ProfileView';


function SideBar() {
    return(
        <div className="container">
            <div className="sidebar">
                <ul className="ul">
                    <li className="list"><img src={dashboard} alt="dashboard" className="icon" /> Dashboard</li>
                    <li className="list"><img src={issue} alt="issues" className="icon" /> Issues</li>
                    <li className="list"><img src={person} alt="profile" className="icon" /> Profile</li>
                    <li className="list"><img src={settings} alt="settings" className="icon" /> Settings</li>
                    <li className="list"><img src={support} alt="help and support" className="icon" /> Help & Support</li>
                    <li className="list"><img src={logout} alt="logout" className="icon" /> Logout</li>
                </ul>
            </div>
            <ProfileView />
        </div>
        
    );
};
export default SideBar;