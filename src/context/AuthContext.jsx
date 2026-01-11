import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session
        const getSession = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                if (error) throw error;
                if (session) {
                    await fetchUserProfile(session.user);
                }
            } catch (error) {
                console.error("Error fetching session:", error);
            } finally {
                setLoading(false);
            }
        };

        getSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session) {
                await fetchUserProfile(session.user);
            } else {
                setUser(null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchUserProfile = async (authUser) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authUser.id)
                .single();

            if (error) {
                console.warn("Profile fetch error (might be new user):", error);
                // Fallback for immediate display if trigger hasn't run yet
                setUser({ ...authUser, credits: 5 });
            } else {
                setUser({ ...authUser, ...data });
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const login = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    };

    const signup = async (email, password, fullName) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });
        if (error) throw error;
        return data;
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setUser(null);
    };

    const deductCredit = async () => {
        if (user && user.credits > 0) {
            // Optimistic update
            const newCredits = user.credits - 1;
            setUser({ ...user, credits: newCredits });

            try {
                const { error } = await supabase
                    .from('profiles')
                    .update({ credits: newCredits })
                    .eq('id', user.id);

                if (error) throw error;
                return true;
            } catch (error) {
                console.error("Error deducting credit:", error);
                // Revert logic would go here
                return false;
            }
        }
        return false;
    };

    // Placeholder for when we add subscription
    const addCredits = async (amount) => {
        if (!user) return;

        const newCredits = (user.credits || 0) + amount;
        setUser({ ...user, credits: newCredits });

        try {
            const { error } = await supabase
                .from('profiles')
                .update({ credits: newCredits })
                .eq('id', user.id);
            if (error) throw error;
        } catch (error) {
            console.error("Error adding credits:", error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, deductCredit, addCredits, loading }}>
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
