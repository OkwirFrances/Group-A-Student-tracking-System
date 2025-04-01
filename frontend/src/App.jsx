import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { IssuesProvider } from './context/IssueContext';
import ProtectedRoute from './pages/ProectectedRoute';
import './App.css';

// Simple fallback component instead of LoadingSpinner
const Fallback = () => <div>Loading...</div>;

// Lazy load components for better performance
const LandingPage = React.lazy(() => import('./pages/landingpage'));
const SignUp = React.lazy(() => import('./pages/signup'));
const SignIn = React.lazy(() => import('./pages/signin'));
const Otp = React.lazy(() => import('./pages/otp'));
const Congratulations = React.lazy(() => import('./pages/congratulations'));
const StudentDashboard = React.lazy(() => import('./pages/StudentDashboard'));
const LecturerDashboard = React.lazy(() => import('./pages/LecturerDashboard'));
const RegistrarDashboard = React.lazy(() => import('./pages/registrardashboard'));
const DashboardContent = React.lazy(() => import('./pages/Dashboardcontent'));
const IssueForm = React.lazy(() => import('./pages/issueform'));
const IssueDetails = React.lazy(() => import('./pages/issuedetails'));
const NotificationScreen = React.lazy(() => import('./pages/notificationscreen'));
const HelpSupport = React.lazy(() => import('./pages/helpsupport'));
const Settings = React.lazy(() => import('./pages/settings'));
const DepartmentManagement = React.lazy(() => import('./pages/DepartmentManagement'));
const CourseManagement = React.lazy(() => import('./pages/CourseManagement'));
import LecturerManagement from './pages/LecturerManagement';
// const LecturerIssues = React.lazy(() => import('./pages/LecturerIssues'));

const App = () => {

  return (
    <IssuesProvider >
      <BrowserRouter>
          <Suspense fallback={<Fallback />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" index element={<Navigate to="landing" />} />
              <Route path="landing" element={<LandingPage />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="otp" element={<Otp />} />
              <Route path="/congratulations" element={<Congratulations />} />

              {/* Protected Routes */}
              <Route
                path="/student/*"
                element={
                  <ProtectedRoute allowedRoles={["student"]}>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
            > 
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<DashboardContent />} />
                <Route path="issueform" element={<IssueForm />} />
                <Route path="issues" element={<DashboardContent />} />
                <Route path="issue/:id" element={<IssueDetails />} />
                <Route path="notifications" element={<NotificationScreen />} />
                <Route path="support" element={<HelpSupport />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            
              {/* Protected Lecturer Routes */}
              <Route
                path="/lecturer/*"
                element={
                  <ProtectedRoute allowedRoles={["lecturer"]}>
                    <LecturerDashboard />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<DashboardContent />} />
                  <Route path="issue/:id" element={<IssueDetails />} />
                  {/* <Route path="issues" element={<LecturerIssues />} /> */}
                  <Route path="notifications" element={<NotificationScreen />} />
                  <Route path="support" element={<HelpSupport />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
                
                {/* Protected Registrar Routes */}
                <Route
                  path="/registrar/*"
                  element={
                    <ProtectedRoute allowedRoles={["registrar"]}>
                      <RegistrarDashboard />
                    </ProtectedRoute>
                  }
              >
                <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<DashboardContent />} />
                  <Route path="issue/:id" element={<IssueDetails />} />
                  <Route path="notifications" element={<NotificationScreen />} />
                  <Route path="support" element={<HelpSupport />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="lecturers" element={<LecturerManagement />} />
                  <Route path="departments" element={<DepartmentManagement />} />
                  <Route path="courses" element={<CourseManagement />} />
                </Route>

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/landing" replace />} />
            </Routes>
          </Suspense>
      </BrowserRouter>
    </IssuesProvider>
  );
};

export default App;