import React, { createContext, useState } from 'react';

export const IssuesContext = createContext();

export const IssuesProvider = ({ children }) => {
    const [issues, setIssues] = useState([]);

    const addIssue = (issue) => {
        setIssues([...issues, issue]);
    };

    return (
        <IssuesContext.Provider value={{ issues, addIssue}}>
            {children}
        </IssuesContext.Provider>
    );
};