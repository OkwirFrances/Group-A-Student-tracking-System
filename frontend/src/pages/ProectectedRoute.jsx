// ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }) => {
    // Get authentication data from local storage
    const authToken = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');

    // If no token or role, redirect to signin
    if (!authToken || !userRole) {
        return <Navigate to="/signin" replace />;
    }
