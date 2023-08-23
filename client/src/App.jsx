import React from 'react';
import './App.css'
import HomePage from './pages/Home';
import SignUp from './pages/SignUp'; 
import {Routes, Route} from "react-router-dom"
import Login from './pages/Login';
import Operations from './pages/Operations';
import Categories from './pages/Categories';
import CategoryPage from './pages/CategoryPage';
import ForgotPassword from './pages/ForgotPassword';
import PasswordReset from './pages/PasswordReset'

function App() {
  return (
    <>
    <Routes>
      <Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/accounts/api/v1/password-reset/confirm/:token" element={<PasswordReset />} />
        <Route path="/operations" element={<Operations />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/incomes" element={<CategoryPage category="income-category" />} />
        <Route path="/payments" element={<CategoryPage category="payment-category" />} />
        <Route path="/expenses" element={<CategoryPage category="expense-category" />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
