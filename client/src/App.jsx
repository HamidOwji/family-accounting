import React from 'react';
import './App.css'
import HomePage from './pages/Home';
import SignUp from './pages/SignUp'; 
import {Routes, Route} from "react-router-dom"
import Login from './pages/Login';
import Operations from './pages/Operations';

function App() {
  return (
    <>
    <Routes>
      <Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/operations" element={<Operations />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
