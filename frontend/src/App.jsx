import React from 'react';
import LandingPage from './pages/landingpage';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import IssueForm from './pages/issueform';
import Congratulations from './pages/congratulations';
import StudentDashboard from './pages/studentdashboard';
import LecturerDashboard from './pages/LecturerDashboard';
import RegistrarDashboard from './pages/RegistrarDashboard';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Otp from './pages/otp';
import DashboardContent from './components/Dashboardcontent';
import IssueDetails from './components/issuedetails';
import NotificationScreen from './components/notificationscreen';
import HelpSupport from './pages/helpsupport';
import Settings from './pages/settings';
import { IssuesProvider } from './context/IssueContext';
import ErrorBoundary from './pages/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

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