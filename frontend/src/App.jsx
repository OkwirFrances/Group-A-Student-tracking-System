import React from 'react';
import LandingPage from './pages/Home/landingpage';
import SignUp from './pages/Auth/signup';
import SignIn from './pages/Auth/signin';
import IssueForm from './pages/Issues/issueform';
import Congratulations from './pages/congratulations';
import LecturerDashboard from './pages/Dashboard/LecturerDashboard';
import StudentDashboard from './pages/Dashboard/StudentDashboard';
import RegistrarDashboard from './pages/Dashboard/RegistrarDashboard';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Otp from './pages/Auth/otp';
import DashboardContent from './pages/Dashboard/Dashboardcontent';
import IssueDetails from './pages/Issues/issuedetails';
import NotificationScreen from './pages/notificationscreen';
import HelpSupport from './pages/helpsupport';
import Settings from './pages/Profile/settings';
import { IssuesProvider } from './context/IssueContext';
import ErrorBoundary from './pages/ErrorBoundary';
import ProtectedRoute from './pages/ProectectedRoute';

// const App = () => {
//   return (
//     <IssuesProvider>
//       <BrowserRouter>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" index element={<Navigate to="landing" />} />
//           <Route path="landing" element={<ErrorBoundary><LandingPage /></ErrorBoundary>} />
//           <Route path="signup" element={<ErrorBoundary><SignUp /></ErrorBoundary>} />
//           <Route path="signin" element={<SignIn />} />
//           <Route path="otp" element={<Otp />} />
//           <Route path="/congratulations" element={<Congratulations />} />

//           {/* Protected Routes */}
//           <Route path="/student/*" element={<ProtectedRoute requiredRole="student"><StudentDashboard /></ProtectedRoute>}>
//               <Route path="dashboard" element={<DashboardContent />} />
//               <Route path="issues" element={<IssueForm />} />
//               <Route path="issue/:id" element={<IssueDetails />} />
//               <Route path="settings" element={<Settings />} />
//               <Route path="support" element={<HelpSupport />} />
//           </Route>
//           <Route
//             path="/lecturer/*"
//             element={
//               <ProtectedRoute requiredRole="lecturer">
//                 <LecturerDashboard />
//               </ProtectedRoute>
//             }
//           >
//             <Route path="dashboard" element={<DashboardContent />} />
//             <Route path="issue/:id" element={<IssueDetails />} />
//             <Route path="support" element={<HelpSupport />} />
//             <Route path="settings" element={<Settings />} />
//           </Route>

//           <Route
//             path="/registrar/*"
//             element={
//               <ProtectedRoute requiredRole="registrar">
//                 <RegistrarDashboard />
//               </ProtectedRoute>
//             }
//           >
//             <Route path="dashboard" element={<DashboardContent />} />
//             <Route path="issue/:id" element={<IssueDetails />} />
//             <Route path="support" element={<HelpSupport />} />
//             <Route path="settings" element={<Settings />} />
//           </Route>

//           {/* Notifications Route */}
//           <Route path="notifications" element={<NotificationScreen />} />
//         </Routes>
//       </BrowserRouter>
//     </IssuesProvider>
//   );
// };

// export default App;

// import React from 'react';
// import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// import { IssuesProvider } from './context/IssueContext';
// import ErrorBoundary from './pages/ErrorBoundary';
// import ProtectedRoute from './pages/ProtectedRoute';
// Import all your components...

const App = () => {
  return (
    <IssuesProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="landing" />} />
          <Route path="landing" element={<ErrorBoundary><LandingPage /></ErrorBoundary>} />
          <Route path="signup" element={<ErrorBoundary><SignUp /></ErrorBoundary>} />
          <Route path="signin" element={<SignIn />} />
          <Route path="otp" element={<Otp />} />
          <Route path="/congratulations" element={<Congratulations />} />

          {/* Protected Routes with Role-Based Access */}
          <Route
            path="/student/*"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<DashboardContent />} />
            <Route path="issueform" element={<IssueForm />} />
            <Route path="issue/:id" element={<IssueDetails />} />
            <Route path="support" element={<HelpSupport />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route
            path="/lecturer/*"
            element={
              <ProtectedRoute allowedRoles={['lecturer']}>
                <LecturerDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<DashboardContent />} />
            <Route path="issue/:id" element={<IssueDetails />} />
            <Route path="support" element={<HelpSupport />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route
            path="/registrar/*"
            element={
              <ProtectedRoute allowedRoles={['registrar']}>
                <RegistrarDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<DashboardContent />} />
            <Route path="issue/:id" element={<IssueDetails />} />
            <Route path="support" element={<HelpSupport />} />
            <Route path="settings" element={<Settings />} />
            {/* <Route path="departments" element={<DepartmentManagement />} /> */}
            {/* <Route path="courses" element={<CourseManagement />} /> */}
          </Route>

          {/* Notifications Route */}
          <Route path="notifications" element={<NotificationScreen />} />
        </Routes>
      </BrowserRouter>
    </IssuesProvider>
  );
};

export default App;