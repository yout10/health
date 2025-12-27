import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('q_ade_user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                // Ensure credits exist for legacy stored users
                if (parsedUser.credits === undefined) {
                    parsedUser.credits = 5;
                }
                setUser(parsedUser);
            } catch (e) {
                console.error("Failed to parse stored user", e);
                localStorage.removeItem('q_ade_user');
            }
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        // New users get 5 credits
        const newUser = { ...userData, credits: 5 };
        setUser(newUser);
        localStorage.setItem('q_ade_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('q_ade_user');
    };

    const deductCredit = () => {
        if (user && user.credits > 0) {
            const updatedUser = { ...user, credits: user.credits - 1 };
            setUser(updatedUser);
            localStorage.setItem('q_ade_user', JSON.stringify(updatedUser));
            return true;
        }
        return false;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, deductCredit, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
