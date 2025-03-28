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
import NotificationScreen from './pages/notificationscreen';
import HelpSupport from './pages/helpsupport';
import Settings from './pages/settings';
import Messages from './pages/messages';
import NewMessage from './pages/newmessage';
import Profile from './pages/profile';
import RegistrarDashboard from './pages/registrardashboard';
import { IssuesProvider } from './context/IssueContext';
import RoleBasedRoute from './components/rolebassedroute';



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
            <Route path='issueform' element={<IssueForm />}/>
            <Route path="issue/:id" element={<IssueDetails />}/>
            <Route path='support' element={<HelpSupport />}/>
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path='registrar-dashboard' element={<RoleBasedRoute allowedRoles={['registrar']}>
            <RegistrarDashboard />
          </RoleBasedRoute>} />
          <Route path='notifications' element={<NotificationScreen />}/>
          <Route path='messages' element={<Messages />}/>
          <Route path='newmessage' element={<NewMessage />}/>
          <Route path='profile' element={<Profile />}/>
        </Routes>
      </BrowserRouter>
    </IssuesProvider>
  );
};

export default App;
