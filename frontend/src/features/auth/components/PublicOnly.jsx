import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

const PublicOnly = ({ children }) => {
    const { loading, user } = useAuth();

    if (loading) {
        return (
            <main className="auth-main">
                <div className="auth-loading">
                    <div className="spinner"></div>
                    <h2>Loading...</h2>
                </div>
            </main>
        );
    }

    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicOnly;
