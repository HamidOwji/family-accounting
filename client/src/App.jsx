import React from 'react';
import './App.css'
import HomePage from './pages/Home';
import Signup from './pages/Signup'; 
import {Routes, Route} from "react-router-dom"
import Login from './pages/Login';

function App() {
  return (
    <>
    <Routes>
      <Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
