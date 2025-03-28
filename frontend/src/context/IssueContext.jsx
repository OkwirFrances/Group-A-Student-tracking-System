// import React, { createContext, useState } from 'react';

// export const IssuesContext = createContext();

// export const IssuesProvider = ({ children }) => {
//     const [issues, setIssues] = useState([]);
//     const [notificationMessage, setNotificationMessage] = useState(null);

//     const addIssue = (issue) => {
//         setIssues([...issues, issue]);
//     };

//     return (
//         <IssuesContext.Provider value={{ issues, addIssue, notificationMessage, setNotificationMessage }}>
//             {children}
//         </IssuesContext.Provider>
//     );
// };


// src/context/IssueContext.jsx
import React, { createContext, useState } from 'react';
import axios from 'axios';

export const IssuesContext = createContext();

export const IssuesProvider = ({ children }) => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // Fetch issues from the API
  const fetchIssues = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:8000/api/issues/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      
      setIssues(response.data);
    } catch (error) {
      console.error('Error fetching issues:', error);
      setError(error.response?.data?.error || 'Failed to fetch issues.');
    } finally {
      setLoading(false);
    }
  };

  const addIssue = (issue) => {
    setIssues([...issues, issue]);
  };

  return (
    <IssuesContext.Provider value={{ issues, addIssue }}>
      {children}
    </IssuesContext.Provider>
  );
};
