import { Navigate } from 'react-router-dom';
import React from 'react';

const ProtectedRoute = ({children}) => {
    const user = localStorage.getItem('token');
    if(!user){
        return <Navigate to='/landing'/>
    }
    return children;
}

export default ProtectedRoute;
