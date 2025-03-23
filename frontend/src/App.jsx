import React from 'react';
import LandingPage from './pages/Home/landingpage';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import IssueForm from './pages/Issues/issueform';
import Congratulations from './pages/congratulations';
import StudentDashboard from './pages/studentdashboard';
import LecturerDashboard from './pages/Dashboard/LecturerDashboard';
import RegistrarDashboard from './pages/Dashboard/RegistrarDashboard';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Otp from './pages/otp';
import DashboardContent from './pages/Dashboard/Dashboardcontent';
import IssueDetails from './pages/IssueDetails/issuedetails';
import NotificationScreen from './pages/Dashboard/notificationscreen';
import HelpSupport from './pages/helpsupport';
import Settings from './pages/Profile/settings';
import { IssuesProvider } from './context/IssueContext';
import ErrorBoundary from './pages/ErrorBoundary';
import ProtectedRoute from './pages/ProtectedRoute';
import { Navigate } from 'react-router-dom';

const App = () => {
  return (
    <IssuesProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" index element={<Navigate to="landing" />} />
          <Route path="landing" element={<ErrorBoundary><LandingPage /></ErrorBoundary>} />
          <Route path="signup" element={<ErrorBoundary><SignUp /></ErrorBoundary>} />
          <Route path="signin" element={<SignIn />} />
          <Route path="otp" element={<Otp />} />
          <Route path="/congratulations" element={<Congratulations />} />

          {/* Protected Routes */}
          <Route
            path="student"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DashboardContent />} />
            <Route path="issueform" element={<IssueForm />} />
            <Route path="issue/:id" element={<IssueDetails />} />
            <Route path="support" element={<HelpSupport />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route
            path="lecturer"
            element={
              <ProtectedRoute requiredRole="lecturer">
                <LecturerDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DashboardContent />} />
            <Route path="issue/:id" element={<IssueDetails />} />
            <Route path="support" element={<HelpSupport />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route
            path="registrar"
            element={
              <ProtectedRoute requiredRole="registrar">
                <RegistrarDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DashboardContent />} />
            <Route path="issue/:id" element={<IssueDetails />} />
            <Route path="support" element={<HelpSupport />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Notifications Route */}
          <Route path="notifications" element={<NotificationScreen />} />
        </Routes>
      </BrowserRouter>
    </IssuesProvider>
  );
};

export default App;