import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const SubscriptionModal = ({ isOpen, onClose }) => {
    const { addCredits, user } = useAuth();
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubscribe = async () => {
        setLoading(true);
        // Simulate network request for payment
        setTimeout(async () => {
            await addCredits(10);
            setLoading(false);
            onClose();
            alert("Congratulations! You are now an Elite Member. 10 Credits added.");
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 animate-fade-in backdrop-blur-sm">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-1 relative border border-yellow-500/30 overflow-hidden">

                {/* Decorative Glow */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-yellow-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>

                <div className="bg-gray-900 rounded-xl p-8 h-full relative z-10">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    >
                        ✕
                    </button>

                    <div className="text-center mb-8">
                        <div className="inline-block p-3 rounded-full bg-yellow-500/10 mb-4 border border-yellow-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-serif text-white mb-2">Elite Access</h2>
                        <p className="text-yellow-500 font-medium tracking-wide text-sm uppercase">Limited Time Offer</p>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg p-6 mb-8 border border-gray-700">
                        <div className="flex justify-between items-end mb-4">
                            <span className="text-gray-400 text-lg">Price</span>
                            <span className="text-4xl font-bold text-white">$0<span className="text-lg text-gray-500 font-normal">/mo</span></span>
                        </div>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-center gap-2">
                                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Get <strong className="text-white">10 AI Credits</strong> instantly</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Priority Parsing</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Ad-free Experience</span>
                            </li>
                        </ul>
                    </div>

                    <button
                        onClick={handleSubscribe}
                        disabled={loading}
                        className={`w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold py-4 rounded-lg hover:from-yellow-400 hover:to-amber-500 transition-all shadow-lg shadow-yellow-500/20 transform hover:-translate-y-0.5
                        ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Activating...' : 'Upgrade to Elite'}
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-4">
                        No credit card required. Cancel anytime.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionModal;
