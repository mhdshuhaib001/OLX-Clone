import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignUp from "./Pages/Signup"
import Login from './Pages/Login'


import Home from './Pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
