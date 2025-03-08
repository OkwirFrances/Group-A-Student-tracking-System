import React, { useState } from 'react';
import LandingPage from './components/landingpage';
import SignUp from './components/signup';
import SignIn from './components/signin';


import './App.css';

const App = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowSignIn(false);
  };

  const handleSignInClick = () => {
    setShowSignIn(true);
    setShowSignUp(false);
  };


  return (
    <div className='App'>
      {showSignUp ? (
        <SignUp />
      ) : showSignIn ? (
        <SignIn />
      ) : (
        <LandingPage onSignUpClick={handleSignUpClick} onSignInClick={handleSignInClick} />
      )}
    </div>
  );
};

export default App;
