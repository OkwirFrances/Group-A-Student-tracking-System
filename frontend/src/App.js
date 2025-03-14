import React from 'react';
import LandingPage from './pages/landingpage';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import Congratulations from './pages/congratulations';
import StudentDashboard from './pages/studentdashboard';


import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Otp from './pages/otp';
import DashboardContent from './components/Dashboardcontent';


const App = () => {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" index element={<Navigate to="landing"/>}/>
      <Route path="landing" element={<LandingPage/>}/>
      <Route path="signup" element={<SignUp/>}/>
      <Route path="signin" element={<SignIn/>}/>
      <Route path="otp" element={<Otp/>}/>
      <Route path="congs" element={<Congratulations/>}/>
      <Route path="app" element={<StudentDashboard/>}>
      
      <Route path="dashboard" element={ <DashboardContent />}/>
      
      
      
      </Route>
    </Routes>
    
    </BrowserRouter>
  );
};

export default App;
