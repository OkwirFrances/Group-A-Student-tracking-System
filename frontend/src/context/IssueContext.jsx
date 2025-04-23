import React, { createContext, useState } from 'react';

export const IssuesContext = createContext();

export const IssuesProvider = ({ children }) => {
    const [issues, setIssues] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState(null);

    const addIssue = (newissue) => {
        setIssues((prevIssues) => [...prevIssues, newissue]);
        localStorage.setItem('issues', JSON.stringify([...issues, newissue]));
    };

    return (
        <IssuesContext.Provider value={{ issues, addIssue, notificationMessage, setNotificationMessage }}>
            {children}
        </IssuesContext.Provider>
    );
};



