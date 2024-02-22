import axios from 'axios';
import { createContext, useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

export const  UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({});
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

    // Fetch data only when user is not logged in or when navigating to the '/dashboard' route
    if (!user && location.pathname === '/dashboard') {
      fetchData();
    }
  }, [user, location.pathname]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};  

export const useUser = () => useContext(UserContext);
