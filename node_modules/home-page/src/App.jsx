
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TusiBrida from './pages/TusiBrida';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tusi" element={<TusiBrida />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
