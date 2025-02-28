
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Careers from './components/Careers'; // Adjust the import path as necessary
import Home from './components/Home'; // Assuming you have a Home component or any other initial route
import Privacy from './components/Privacy';
import Terms from './components/Terms'

const App = () => {
  return (
    <Router>
  
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        {/* Add other routes as needed */}

      </Routes>
      <Footer />
     
    </Router>
  );
};

export default App;



