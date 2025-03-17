import React, { useState, createContext, useContext } from 'react';
import LandingPage from './pages/landingpage';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
// import IssueForm from './pages/issueform';
import Congratulations from './pages/congratulations';
import StudentDashboard from './pages/studentdashboard';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Otp from './pages/otp';
import DashboardContent from './components/Dashboardcontent';
import Issuemanagement from './components/Issuemanagement';

// Create auth context
export const AuthContext = createContext(null);

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  
  return children;
};

const App = () => {
  // Add authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');
  
  // Auth context value
  const authValue = {
    isAuthenticated,
    login: () => {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
    },
    logout: () => {
      localStorage.setItem('isAuthenticated', 'false');
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={authValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Navigate to="landing" />} />
          <Route path="landing" element={<LandingPage />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="otp" element={<Otp />} />
          <Route path="congs" element={<Congratulations />} />
          
          {/* Nest all protected routes under /app */}
          <Route path="app" element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<DashboardContent />} />
            <Route path="issuemanagement" element={<Issuemanagement />} />
            <Route index element={<Navigate to="dashboard" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;