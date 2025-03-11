import React, { useState } from 'react';
import LandingPage from './pages/landingpage';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import Congratulations from './pages/congratulations';
import StudentDashboard from './pages/studentdashboard';


import './App.css';

const App = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowSignIn(false);
    setShowCongratulations(false);
    setShowDashboard(false);
  };

  const handleSignInClick = () => {
    console.log('Sign in button clicked in App');
    setShowSignIn(true);
    setShowSignUp(false);
    setShowCongratulations(false);
    setShowDashboard(false);
  };

  const handleCongratulations = () => {
    setShowCongratulations(true);
    setShowSignUp(false);
    setShowSignIn(false);
    setShowDashboard(false);
  };

  const handleDashboard = () => {
    setShowDashboard(true);
    setShowSignUp(false);
    setShowSignIn(false);
    setShowCongratulations(false);
  };

  


  return (
    <div className='App'>
      { showSignUp ? (
        <SignUp onCongratulations={handleCongratulations} />
      ) : showSignIn ? (
        <SignIn onDashboard ={handleDashboard} />
      ) : showCongratulations ? (
        <Congratulations onSignInClick={handleSignInClick} />
      ) : showDashboard ? (
        <StudentDashboard />
      ) : (
        <LandingPage onSignUpClick={handleSignUpClick} onSignInClick={handleSignInClick} />
      )}
    </div>
  );
};

export default App;
