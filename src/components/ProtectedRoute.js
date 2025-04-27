import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
// import { useCookies } from 'react-cookie';

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    // const [cookies] = useCookies(['elk_authorization_token']);
    // const token = cookies.elk_authorization_token;
    const token = localStorage.getItem('elk_authorization_token');
    
    if(token){
        return children;
    }
    return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
