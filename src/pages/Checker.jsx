import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import SymptomChecker from '../components/SymptomChecker';
import { useAuth } from '../context/AuthContext';

const Checker = ({ onOpenLogin }) => {
    const { user, loading } = useAuth();

    if (loading) return <div className="text-center p-10">Loading...</div>;

    // If not logged in, show a friendly message or redirect. 
    // Here we show a locked state or redirect. Let's redirect to home but open modal? 
    // Easier: Just return the checker BUT the checker itself checks for credits/user.
    // However, the requirement is to have it on a separate page.

    if (!user) {
        // Option: Redirect to home or show a specific "Login Required" view.
        // Let's show a "Login Required" view for better UX than a harsh redirect.
        return (
            <div className="text-center py-20 animate-fade-in">
                <h2 className="text-3xl font-serif text-gray-800 mb-4">Login Required</h2>
                <p className="text-gray-600 mb-8">Please log in to access the AI Symptom Checker.</p>
                <button
                    onClick={onOpenLogin}
                    className="bg-medical-teal text-white px-8 py-3 rounded-full font-medium hover:bg-teal-700 transition-colors shadow-lg"
                >
                    Login Now
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in-up">
            <Link
                to="/"
                className="text-gray-500 hover:text-medical-teal flex items-center gap-2 mb-4 transition-colors inline-block"
            >
                ← Back to Features
            </Link>
            <SymptomChecker />
        </div>
    );
};

export default Checker;
