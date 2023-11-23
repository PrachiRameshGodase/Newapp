import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm/AuthForm';
import ChatUi from './components/Chats/ChatUi';
import Navbar from './components/Layout/Navbar';
import AdminGroups from './components/Chats/AdminGroups';
import Allgroup from './components/Chats/Allgroup';

function App() {
  return (
    <div >
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/chat" element={<ChatUi />} />
       <Route path='/admingroups' element={<AdminGroups/>}></Route>
       <Route path='/allgroups' element={<Allgroup/>}></Route>
      
      </Routes>
    </Router></div>
    
  );
}

export default App;
