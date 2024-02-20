import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const location = useLocation();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set headers with token
        const { data } = await axios.get('/profile', { headers }); // Pass headers in the request
        setUser(data);
      } catch (error) {
        console.error('Error fetching profile:', error.response?.data || error.message);
      }
    };

    if (!user || location.pathname === '/dashboard') {
      // Fetch data when the component mounts or when navigating to the '/dashboard' route
      fetchData();
    }
  }, [user, location.pathname]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
