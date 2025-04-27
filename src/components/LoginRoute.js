import React from 'react';
import { Navigate } from 'react-router-dom';

const LoginRoute = ({ children }) => {
    const token = localStorage.getItem('elk_authorization_token');
    if(!token){
        return children;
    }
    return <Navigate to="/home" replace />;
};

export default LoginRoute;
