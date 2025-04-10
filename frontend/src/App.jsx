import React from 'react';
import LandingPage from './pages/landingpage';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import IssueForm from './pages/issueform';
import Congratulations from './pages/congratulations';
import StudentDashboard from './pages/StudentDashboard';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Otp from './pages/otp';
import DashboardContent from './pages/Dashboardcontent';
import IssueDetails from './pages/issuedetails';
import Issuemanagement from './pages/Issuemanagement';
import NotificationScreen from './pages/notificationscreen';
import HelpSupport from './pages/helpsupport';
import Settings from './pages/settings';
import Messages from './pages/messages';
import NewMessage from './pages/newmessage';
import Profile from './pages/profile';
import EditPersonalInfo from './pages/EditPersonalInfo';
import EditAcademicInfo from './pages/EditAcademicInfo';
import EditProfilePicture from './pages/EditProfilePicture';
import RegistrarDashboard from './pages/registrardashboard.jsx';
import RegistrarDashboardContent from './pages/registrardashboardcontent';
import OpenIssues from './pages/openissues';
import CourseManagement from './pages/CourseManagement';
import DepartmentManagement from './pages/DepartmentManagement';
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
        <Routes>
          <Route path="/" index element={<Navigate to="landing"/>}/>
          <Route path="landing" element={<LandingPage/>}/>
          <Route path="signup" element={<SignUp/>}/>
          <Route path="signin" element={<SignIn/>}/>
          <Route path="otp" element={<Otp/>}/>
          <Route path="congs" element={<Congratulations/>}/>
          <Route path="app" element={<RoleBasedRoute allowedRoles={['student']}>
            <StudentDashboard />
          </RoleBasedRoute>}>
            <Route path="dashboard" element={ <DashboardContent />}/>
            <Route path='notifications' element={<NotificationScreen />}/>
            <Route path='issueform' element={<IssueForm />}/>
            <Route path="issue/:id" element={<IssueDetails />}/>
            <Route path='support' element={<HelpSupport />}/>
            <Route path="settings" element={<Settings />} />
            <Route path='messages' element={<Messages />}/>
            <Route path='profile' element={<Profile />}/>
            <Route path='editpersonalinfo' element={<EditPersonalInfo />}/>
            <Route path='editacademicinfo' element={<EditAcademicInfo />}/>
            <Route path='editprofilepicture' element={<EditProfilePicture />}/>
            <Route path='issues' element={<Issuemanagement />}/>
          </Route>

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

          <Route path='registrar-dashboard' element={<RoleBasedRoute allowedRoles={['registrar']}>
            <RegistrarDashboard />
          </RoleBasedRoute>} >
            <Route path="dashboard" element={<RegistrarDashboardContent />} />
            <Route path='openissues' element={<OpenIssues />}/>
            <Route path='notifications' element={<NotificationScreen />}/>
            <Route path='profile' element={<Profile />}/>
            <Route path='support' element={<HelpSupport />}/>
            <Route path='settings' element={<Settings />}/>
            <Route path='messages' element={<Messages />}/>
            <Route path='courses' element={<CourseManagement />}/>
            <Route path='departments' element={<DepartmentManagement />}/>
          </Route>
          <Route path='newmessage' element={<NewMessage />}/>
        </Routes>
      </BrowserRouter>
    </IssuesProvider>
  );
};

export default App;