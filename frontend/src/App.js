import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './index.css';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import Register from './screens/Register';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          hey
        </div>
        <Routes>
          <Route path="/" element={ <Dashboard /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/Register" element={ <Register /> } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
