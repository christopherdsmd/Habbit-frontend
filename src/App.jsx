import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import Register from '../src/pages/Register';
import Login from '../src/pages/Login';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './context/userContext.jsx';
import Dashboard from './pages/Dashboard';
import SaveTheFrogs from './pages/save-the-frogs';

axios.defaults.baseURL = 'https://habbit-backend.onrender.com/';
axios.defaults.withCredentials = true;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('isDarkMode', newMode);
    document.body.classList.toggle('app-dark', newMode);
    document.body.classList.toggle('app-light', !newMode);
  };

  useEffect(() => {
    const savedMode = localStorage.getItem('isDarkMode') === 'true';
    setIsDarkMode(savedMode);
    document.body.classList.toggle('app-dark', savedMode);
    document.body.classList.toggle('app-light', !savedMode);
  }, []);

  return (
    <UserContextProvider>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/save-the-frogs' element={<SaveTheFrogs />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
