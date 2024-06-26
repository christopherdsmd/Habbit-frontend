import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext.jsx';
import { getDailyRandomInt, getRandomInt } from '../functions/DailyrandomNumber.jsx';
import DateTime from '../functions/dateandtime.jsx';
import '../index.css';
import axios from 'axios';
import Popup from '../components/addPopup.jsx';
import HabitComponent from '../components/habitComponent.jsx';
import CalendarView from '../components/calandarView';
import DeletePopup from '../components/deletePopup.jsx';
import { Tooltip } from 'react-tooltip';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [DailyrandNum, setDailyrandNum] = useState(0); // daily random frog
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [DeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [habits, setHabits] = useState([]);
  const [frogImageIndex, setFrogImageIndex] = useState(getRandomInt()); // State to hold frog image index
  const [isAnimating, setIsAnimating] = useState(false); // State to track animation
  const [redirect, setRedirect] = useState(false);  //track dashboard to login page redirect

  const fetchHabits = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set headers with token
      const response = await axios.get('/habits', { headers }); // Pass headers in the request
      setHabits(response.data);
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  useEffect(() => {
    setDailyrandNum(getDailyRandomInt());
  }, []);

  useEffect(() => {
    // Redirect to login page after 3 seconds if user is not logged in
    const timeout = setTimeout(() => {
      if (!user) {
        toast.success('Welcome to Habbit! Please login to continue. 🐸');
        setRedirect(true);
      }
    }, 3000); // Delay of 3 seconds
  
    return () => clearTimeout(timeout); // Cleanup on unmount
  }, [user]);

  if (redirect) {
    return <Navigate to="/login" />;
  }

  const toggleAddPopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleDeletePopup = () => {
    setDeletePopupOpen(!DeletePopupOpen);
  };

  const handleImageClick = () => {
    setFrogImageIndex(getRandomInt());
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  // Callback function to handle closing of pop-ups and fetch habits
  const handleClosePopups = () => {
    setIsPopupOpen(false);
    setDeletePopupOpen(false);
    fetchHabits(); // Call fetchHabits to update habit list
  };

  return (
    <div>
      <header className="App-header">
        <div className={`header-content`}>
          <h1>Habbit!</h1>
          <img
            src={`assets/frog_photos/frog_${frogImageIndex}.png`}
            alt="frog_emoji"
            width="128"
            height="128"
            onClick={handleImageClick}
            className={isAnimating ? 'newspaper-animation rotate-animation' : ''}
            title="New frog every click!"
          />
        </div>

        <p style={{ marginBottom: '0' }}>Daily Habit Tracker</p>
        {!!user && <h2 style={{ margin: '0' }}>Welcome back, {user.name}! </h2>}

        <div className="Date and time">
          <hr className="solidline" />
          <div className="Habit Tracker Dyanamic">
            <DateTime />
            <p>
              <u>Habits</u>
            </p>
            <HabitComponent habits={habits} handleClosePopups={handleClosePopups} />
            <button onClick={toggleAddPopup}>Add Habit +</button>

            {isPopupOpen && (
              <Popup setHabits={setHabits} handleClose={handleClosePopups} content={<div><h3>Add Habit</h3></div>} />
            )}
          </div>
          <hr className="solidline" />
          <div className="habit calandars">
            <p>
              <u>Calendar View</u>
            </p>
            <CalendarView habits={habits} />
            <button className="deletebtn" onClick={toggleDeletePopup}>
              Delete Habit
            </button>
            {DeletePopupOpen && (
              <DeletePopup userID={user._id} setHabits={setHabits} setDeletePopupOpen={setDeletePopupOpen} handleClosePopups={handleClosePopups} />
            )}
            <div style={{ textAlign: 'center' }}>
              <p className="quote" style={{ textAlign: 'center', color: 'grey', opacity: 0.6 }}>
                <br /><br />
                "Saving $8 per day = $3,000 per year <br />
                Reading 20 pages per day = 30 books per year <br />
                Walking 10,000 steps per day = 70 marathons per year <br /><br />
                Never underestimate the power of small habits."
              </p>
            </div>
          </div>
        </div>
      </header>
      <Tooltip effect="solid" place="bottom" id="rotating-image-tooltip" />
    </div>
  );
}
