import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onOpenLogin, onOpenSubscription }) => {
    const { user, logout } = useAuth();
    const location = useLocation();

    return (
        <header className="mb-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
                <Link to="/" className="flex items-center gap-4 group">
                    <img src="/health.png" alt="Q-ADE Health Logo" className="h-12 w-12 object-contain group-hover:scale-105 transition-transform" />
                    <h1 className="text-4xl font-serif text-gray-900 tracking-tight">Q-ADE Health</h1>
                </Link>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-end">
                                <span className="text-gray-600 font-medium hidden md:inline">
                                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                                </span>
                                <span className="text-medical-teal text-sm font-bold">
                                    {user.credits} Credits
                                </span>
                            </div>

                            <button
                                onClick={onOpenSubscription}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-sm transition-colors uppercase tracking-wider"
                            >
                                Get Elite
                            </button>

                            {location.pathname !== '/checker' && (
                                <Link
                                    to="/checker"
                                    className="bg-medical-teal text-white px-6 py-3 rounded-full font-medium hover:bg-teal-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ml-2"
                                >
                                    Start Analysis
                                </Link>
                            )}
                            <button
                                onClick={logout}
                                className="text-sm text-gray-500 hover:text-red-500 transition-colors ml-2"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={onOpenLogin}
                                className="text-medical-teal font-medium hover:underline"
                            >
                                Login
                            </button>
                            <Link
                                to="/checker" // Redirects to login via protected route logic or just lets them click and see strict modal
                                className="bg-medical-teal text-white px-6 py-3 rounded-full font-medium hover:bg-teal-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Start AI Analysis
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            {/* Contextual Description only on Home Page */}
            {location.pathname === '/' && (
                <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl animate-fade-in">
                    Q-ADE Health uses AI for instant preliminary medical guidance. It analyzes symptoms in real-time,
                    providing immediate evaluations that empower patients and support healthcare providers.
                </p>
            )}
        </header>
    );
};

export default Navbar;
