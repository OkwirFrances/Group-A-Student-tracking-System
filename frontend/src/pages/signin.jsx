import React, { useContext } from 'react';
import { AuthContext } from '../App';

const SignIn = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const handleSignIn = () => {
    // Example: Set the auth state after signing in
    setAuth({ user: 'John Doe', token: 'abc123' });
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignIn;