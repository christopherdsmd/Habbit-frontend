import React from 'react'
import { Navigate } from 'react-router-dom';

function Home() {
  // Redirect to dashboard page
  return <Navigate to="/dashboard" />;
}
export default Home;