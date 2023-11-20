import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import ChatUi from './components/ChatUi';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/chat" element={<ChatUi />} />
      
      </Routes>
    </Router>
  );
}

export default App;
