import React, { useState } from "react";
import "./ProfileManagement.css";
import logo from "../icons/logo.png";
import mail from "../icons/mail.png";
import notification from "../icons/notification.png";
import search from "../icons/search.png";
import userimage from "../icons/userimage.png";

const ProfileManagement = () =>{
    const [searchQuery, setSearchQuery] = useState("");
    const [firstName, setFirstName] = useState("Alvin");
    
    const handleSearch = () => {
        console.log("Searching for:", searchQuery);
    };
    return(
        <>
            <nav className="navbar">
                <img  className="muklogo" src={logo} alt= "logo" />
                <h1 className="title">Academic Issue Tracking System</h1>
                <div className="search-container">
                    <input className="searchbar " type="text"
                    placeholder="Search for anything..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />
                    
                    <img className="search" src={search} 
                    alt="search logo"
                    onClick={handleSearch} />
                </div>
                
                    <img className="notification" src={notification} alt="notification logo" />
                    <img className="mail" src={mail} alt="mail logo" />
                    <img className="image" src={userimage} alt="userimage" />
                    <span className="greeting">Hi, {firstName}</span>

            </nav>
            <div className="sidebar">
                <sidebar />
            </div>
        </>
    );
};
export default ProfileManagement;