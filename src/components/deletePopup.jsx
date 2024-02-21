import React, { useEffect, useState, useContext } from 'react';
import "./deletePopup.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { UserContext } from '../context/userContext.jsx'; // Import UserContext to access user data and token

const DeletePopup = ({ setDeletePopupOpen, handleClosePopups }) => {
    const { user } = useContext(UserContext); // Get user data from context
    const [habits, setHabits] = useState([]);

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

    const deleteHabit = async (habitId) => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from local storage
            const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set headers with token
            const { data } = await axios.delete(`/delete-habit/${habitId}/${user._id}`, { headers }); // Pass headers in the request
    
            fetchHabits();
    
            if (data.error) {
                toast.error(data.error);
            } else {
                console.log("Habit deleted successfully:");
                toast.success("Habit deleted successfully");
                handleClosePopups();
            }
        } catch (error) {
            toast.error("Error deleting habit");
            console.error("Error deleting habit:", error.response?.data || error.message);
        }
    };
    

    return (
        <div className="overlay">
            <div className="modal">
                <button className="btn-close" onClick={() => setDeletePopupOpen(false)}>
                    x
                </button>
                {habits.map((habit) => (
                    <div key={habit._id} className="habit-entry">
                        <button className="delete-btn" onClick={() => deleteHabit(habit._id)}>
                            Delete
                        </button>
                        <div className="habit-name">
                            {habit.habit_name} {habit.emoji}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeletePopup;
