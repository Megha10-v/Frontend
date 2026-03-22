import React from 'react';
import Error from './Error';
import { useSelector } from 'react-redux';

const SuperAdminRoute = ({ children }) => {
    const { token, isAdmin, role } = useSelector((state) => state.auth)
    if (token && role == 'superadmin') {
        return children;
    }
    return <Error />;
};

export default SuperAdminRoute;