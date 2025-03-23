import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('authToken');

    // If the user is not authenticated, redirect to the sign-in page
    if (!token) {
        return <Navigate to="/signin" />;
    }

    // If authenticated, render the child routes
    return <Outlet />;
};

export default ProtectedRoute;