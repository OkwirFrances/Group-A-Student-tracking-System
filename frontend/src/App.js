import ProfileManagement from './components/ProfileManagement';
import React from 'react';
import SideBar from './components/SideBar';


function App() {
  return (
    <>
      <nav>
        <ProfileManagement />
      </nav>
      <div>
        <SideBar />
      </div>
    </>
  );
};

export default App;
