import React from 'react';
import { Route, Navigate } from 'react-router-dom';


const PrivateRoute = ({ element: Element, ...props }) => {
  

  // Check if the user is authenticated based on the presence of the token
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? (
    <Route {...props} element={<Element />} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
