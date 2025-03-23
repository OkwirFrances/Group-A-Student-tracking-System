import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ requiredRole }) => {
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');

    // If the user is not authenticated, redirect to the sign-in page
    if (!token) {
        return <Navigate to="/signin" />;
    }

    // If the user's role does not match the required role, redirect to the sign-in page
    if (userRole !== requiredRole) {
        return <Navigate to="/signin" />;
    }

    // If authenticated and the role matches, render the child routes
    return <Outlet />;
};

export default ProtectedRoute;