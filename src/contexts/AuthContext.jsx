import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const validateToken = async (token) => {
        // This should be an API call to your backend to validate the token
        // For now, we'll just simulate an API call
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulating token validation
                // In a real app, you'd check if the token is valid and not expired
                resolve(token === 'valid_token');
            }, 100);
        });
    };

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                const isValid = await validateToken(token);
                if (isValid) {
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem('authToken');
                }
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = (token) => {
        localStorage.setItem('authToken', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        // Additional cleanup tasks can be added here
    };

    if (isLoading) {
        return <div>Loading...</div>; // or some loading spinner
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};