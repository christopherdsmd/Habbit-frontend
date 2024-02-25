import React, { useState } from "react";
import axios from 'axios';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const loginUser = async (event) => {
        event.preventDefault();
        localStorage.removeItem('token');
        
        const { email, password } = data;

        try {
            const response = await axios.post('/login', {
                email,
                password
            });
            const token = response.data.token; // Assuming the token is returned in the response
            console.log('Token:', token); // Log the token
            localStorage.setItem('token', token); // Store the token in local storage
            setData({}); // Clear input fields
            navigate('/dashboard'); // Redirect to dashboard
            toast.success('Login Success!');
            
        } catch (error) {
            // Handle login error
            toast.error('Login failed. Please check your credentials.');
        }
    };

    const handleRegisterClick = () => {
        navigate('/register'); // Navigate to the Register page
    };

    const loginAsGuest = async (event) => {
        event.preventDefault();
    
        alert('Warning: Guest accounts are unable to save data');
    
        const guestData = {
            email: 'guest@guest',
            password: 'guestPassword123'
        };
    
        try {
            // Send login request with guest account credentials
            const response = await axios.post('/login', guestData);
    
            // Assuming the token is returned in the response, handle it here
            if (response.data.token) {
                const token = response.data.token;
                console.log('Token:', token); // Log the token
                localStorage.setItem('token', token);
    
                // Clear input fields
                setData({});
                
                // Delete guest habits
                await axios.delete('/habits/guest');
    
                // Redirect user to dashboard
                navigate('/dashboard');
    
                // Show success message
                toast.success('Guest login successful');
            } else {
                // Show error message if login failed
                toast.error('Guest login failed. Please try again.');
            }
        } catch (error) {
            // Handle any errors
            console.error('Error during guest login:', error);
            toast.error('Guest login failed. Please try again.');
        }
    };

    return (
        <div className="form-box">
            <form onSubmit={loginUser} type="login">
                <h2>Welcome to Habbit! <br /><br />
                    <img src="\assets\frog_login.png" width="128" height="128" alt="Frog_login" /> <br />Login</h2>
                <label></label>
                <input type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="Email" /><br />
                <label></label>
                <input type="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} placeholder="Password" /> <br />
                <button type="submit">Login</button>
            </form>
            <br /> <br /> <br />
            <hr className="solidline" />
            <h3>Don't have an Account? </h3>
            <button className="Register-button" onClick={handleRegisterClick}>Register</button>
            <button type="button" className="Guest-button" onClick={loginAsGuest}>Continue as Guest</button>
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
    );
}
