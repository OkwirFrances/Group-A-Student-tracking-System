import React, { useState, createContext, useContext } from 'react';
import LandingPage from './pages/landingpage';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import Congratulations from './pages/congratulations';
import StudentDashboard from './pages/studentdashboard';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Otp from './pages/otp';
import DashboardContent from './components/Dashboardcontent';
import IssueDetails from './components/issuedetails';
import NotificationScreen from './components/notificationscreen';
import HelpSupport from './pages/helpsupport';
import Settings from './pages/settings';
import { IssuesProvider } from './context/IssueContext';

// Create the AuthContext
export const AuthContext = createContext();

const App = () => {
  const [auth, setAuth] = useState(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <IssuesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<Navigate to="landing" />} />
            <Route path="landing" element={<LandingPage />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="otp" element={<Otp />} />
            <Route path="congs" element={<Congratulations />} />
            <Route path="app" element={<StudentDashboard />}>
              <Route path="dashboard" element={<DashboardContent />} />
              <Route path="issue/:id" element={<IssueDetails />} />
              <Route path="support" element={<HelpSupport />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="notifications" element={<NotificationScreen />} />
          </Routes>
        </BrowserRouter>
      </IssuesProvider>
    </AuthContext.Provider>
  );
};

export default App;