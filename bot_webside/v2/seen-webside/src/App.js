import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Route>
          <Route Route='/' exact />
        </Route>
      </Router>
    </>
  );
}

export default App;
