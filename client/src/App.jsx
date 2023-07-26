import React from 'react';
import './App.css'
import HomePage from './pages/Home';
import Signup from './pages/Signup'; 
import {Routes, Route} from "react-router-dom"

function App() {
  return (
    <>
    <Routes>
      <Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
