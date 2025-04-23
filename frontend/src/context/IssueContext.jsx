import React, { createContext, useState } from 'react';


export const IssuesContext = createContext();


export const IssuesProvider = ({ children }) => {
    
    const [issues, setIssues] = useState(() => {
        
        const storedIssues = JSON.parse(localStorage.getItem('issues')) || [];
        return storedIssues;
    });

   
    const [notificationMessage, setNotificationMessage] = useState(null);

    
    const addIssue = (newIssue) => {
        setIssues((prevIssues) => {
            const updatedIssues = [...prevIssues, newIssue];
            localStorage.setItem('issues', JSON.stringify(updatedIssues));
            return updatedIssues;
        });
    };


    return (
        <IssuesContext.Provider value={{ issues, addIssue, notificationMessage, setNotificationMessage }}>
            {children}
        </IssuesContext.Provider>
    );
};



