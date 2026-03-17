import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // Redirect to login page but save the current location they were
    // trying to go to. This allows us to redirect them back after login.
    return <Navigate to="/auth" state={{ from: location, message: 'Please login to search medicines.' }} replace />;
  }

  return children;
};

export default ProtectedRoute;
