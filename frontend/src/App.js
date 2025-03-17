import React, { useState } from 'react';
import LandingPage from './pages/landingpage';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import IssueForm from './pages/issueform';
import Congratulations from './pages/congratulations';
import StudentDashboard from './pages/studentdashboard';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Otp from './pages/otp';
import DashboardContent from './components/Dashboardcontent';
import IssueDetails from './components/issuedetails';
import NotificationScreen from './components/notificationscreen';
import Navbar from './components/Navbar';
import { IssuesProvider } from './context/IssueContext';



const App = () => {
  const [badgeCount, setBadgeCount] = useState(0);

  return (
    <IssuesProvider >
      <BrowserRouter>
      <Navbar badgeCount={badgeCount} />
        <Routes>
          <Route path="/" index element={<Navigate to="landing"/>}/>
          <Route path="landing" element={<LandingPage/>}/>
          <Route path="signup" element={<SignUp/>}/>
          <Route path="signin" element={<SignIn/>}/>
          <Route path="otp" element={<Otp/>}/>
          <Route path="congs" element={<Congratulations/>}/>
          <Route path="app" element={<StudentDashboard/>}>
            <Route path="dashboard" element={ <DashboardContent />}/>
            <Route path='issueform' element={<IssueForm setBadgeCount={setBadgeCount} />}/>
            <Route path="issue/:id" element={<IssueDetails />}/>
          </Route>
          <Route path='notifications' element={<NotificationScreen />}/>
        </Routes>
      </BrowserRouter>
    </IssuesProvider>
  );
};

export default App;
