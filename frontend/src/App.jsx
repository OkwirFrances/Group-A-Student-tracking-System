import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { IssuesProvider } from './context/IssueContext';
import ErrorBoundary from './pages/ErrorBoundary';
import ProtectedRoute from './pages/ProectectedRoute';
import './App.css';

// Simple fallback component instead of LoadingSpinner
const Fallback = () => <div>Loading...</div>;

// Lazy load components for better performance
const LandingPage = React.lazy(() => import('./pages/Home/landingpage'));
const SignUp = React.lazy(() => import('./pages/Auth/signup'));
const SignIn = React.lazy(() => import('./pages/Auth/signin'));
const Otp = React.lazy(() => import('./pages/Auth/otp'));
const Congratulations = React.lazy(() => import('./pages/congratulations'));

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
            path="/student/*"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DashboardContent />} />
            <Route path="issue/:id" element={<IssueDetails />} />
            <Route path="support" element={<HelpSupport />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route
            path="/lecturer/*"
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
            path="/registrar/*"
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