import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import ChatUi from './components/ChatUi';
import Navbar from './components/Navbar';
import AdminGroups from './components/AdminGroups';

function App() {
  return (
    <div className='bg-gradient-to-r from-yellow-200 to-pink-400'>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/chat" element={<ChatUi />} />
       <Route path='/admingroups' element={<AdminGroups/>}></Route>
      
      </Routes>
    </Router></div>
    
  );
}

export default App;
