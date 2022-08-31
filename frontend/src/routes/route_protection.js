
import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoutesAfterLogin = ({ children }) => {
    var role = 2;
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn && role === 2) {
        return <Navigate to="/" replace />;
    }
    return children;
}

const ProtectedRoutesBeforeLogin = ({ children }) => {
    var role = 2;
    var isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn && role === 2 ) {
        return <Navigate to="/student_workspace" replace />;
    }
    return children;
}

export { ProtectedRoutesAfterLogin, ProtectedRoutesBeforeLogin };