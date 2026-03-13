
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import FeedbackBright from './pages/FeedbackBright';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<FeedbackBright />} />
        <Route path="/tusi" element={<Navigate to="/feedback" replace />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
