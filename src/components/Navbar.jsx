import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onOpenLogin, onOpenSubscription }) => {
    const { user, logout } = useAuth();
    const location = useLocation();

    return (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <Link to="/" className="flex items-center gap-4 group">
                        <img src="/health.png" alt="Q-ADE Health Logo" className="h-12 w-12 object-contain group-hover:scale-105 transition-transform" />
                        <h1 className="text-4xl font-serif text-gray-900 tracking-tight">Q-ADE Health</h1>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6 text-gray-600 font-medium">
                        <Link to="/" className="hover:text-medical-teal transition-colors">Home</Link>
                        <Link to="/services" className="hover:text-medical-teal transition-colors">Services</Link>
                        <Link to="/about" className="hover:text-medical-teal transition-colors">About</Link>
                        <Link to="/contact" className="hover:text-medical-teal transition-colors">Contact</Link>
                    </nav>

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
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-sm transition-colors uppercase tracking-wider"
                                >
                                    Get Elite
                                </button>
                                <button
                                    onClick={onOpenLogin}
                                    className="text-medical-teal font-medium hover:underline"
                                >
                                    Login
                                </button>
                                <Link
                                    to="/checker"
                                    className="bg-medical-teal text-white px-6 py-3 rounded-full font-medium hover:bg-teal-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    Start AI Analysis
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
