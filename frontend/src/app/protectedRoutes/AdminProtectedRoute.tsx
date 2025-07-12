import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../store';

const AdminProtectedRoute: React.FC = () => {
    const { currentUser } = useSelector((state: RootState) => state.auth);

    if (!currentUser) {
        return <Navigate to="/SignupPopup" replace />;
    }

    if (currentUser.role !== 'ADMIN') {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};

export default AdminProtectedRoute;