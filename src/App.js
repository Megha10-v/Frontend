// import logo from "./logo.svg";
// import "./App.css";
// import Header from "./components/Header";
// import Home from "./components/Home";

// function App() {
//   return (
//     <>
//    <Home />

// </>

//   );
// }

// export default App;

// App.js
// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
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
     
    </Router>
  );
};

export default App;



