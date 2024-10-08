import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import './Navbar.css';

export default function Navbar({ isDarkMode, toggleTheme }) {
  const navigate = useNavigate();

  const signoutUser = async () => {
    try {
      localStorage.removeItem('token');
      navigate('/login');
      toast.success('You have been signed out');
    } catch (error) {
      console.error('Signout failed:', error);
      toast.error('Signout failed. Please try again.');
    }
  };

  const navigateToSaveTheFrogs = () => {
    navigate('/save-the-frogs');
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  const navigateToRegister = () => {
    navigate('/register');
  };

  const navigateToAbout = () => {
    window.open("https://github.com/christopherdsmd/Habbit", "_blank");
  };

  return (
    <div>
      <nav className={`Navbar ${isDarkMode ? 'navbar-dark' : 'navbar-light'}`}>
        <div className="logo-container">
          <button onClick={() => navigate('/dashboard')}>Habbit</button>
          <img src="assets/frog_hole.png" width="30" height="30" alt="frog logo" />
        </div>

        <div className="signout">
          <button onClick={navigateToSaveTheFrogs}>Save the Frogs! | </button>
          <button className="signout" onClick={signoutUser}>Signout </button> 
          <button onClick={navigateToLogin}>Login </button>
          <button onClick={navigateToRegister}>Register </button> 
          <button onClick={navigateToAbout}>About</button> 
          <button onClick={toggleTheme} id="lightDarkButton">
            <img
              src={isDarkMode ? "assets/Light-Dark mode photos/sun-icon.png" : "assets/Light-Dark mode photos/moon-icon.png"}
              alt="light mode"
              width="30"
              height="30"
            />
          </button>
        </div>
      </nav>
    </div>
  );
}
