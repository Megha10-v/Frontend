import React from 'react';
import Error from './Error';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
    const { token, isAdmin } = useSelector((state) => state.auth)
    // const token = localStorage.getItem('elk_authorization_token');
    // const isAdmin = localStorage.getItem('elk_is_admin') === 'true';
    if (token && isAdmin) {
        return children;
    }

    return <Error />;
};

export default AdminRoute;
