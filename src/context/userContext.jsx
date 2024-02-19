import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { useLocation, BrowserRouter } from 'react-router-dom';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const location = useLocation();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
        console.log('Token:', token); // Log token for debugging
        const headers = token ? { Authorization: `Bearer ${token.split('=')[1]}` } : {};
        const { data } = await axios.get('/api/v1/profile', { headers });
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
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    </div>
  );
}
