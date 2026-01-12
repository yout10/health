import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <img src="/health.png" alt="Logo" className="h-8 w-8 object-contain" />
                            <span className="text-xl font-serif text-gray-900 font-bold">Q-ADE Health</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Empowering you with AI-driven health insights. Fast, secure, and reliable preliminary guidance.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link to="/" className="hover:text-medical-teal transition-colors">Home</Link></li>
                            <li><Link to="/services" className="hover:text-medical-teal transition-colors">Services</Link></li>
                            <li><Link to="/checker" className="hover:text-medical-teal transition-colors">Symptom Checker</Link></li>
                            <li><Link to="/about" className="hover:text-medical-teal transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link to="/about" className="hover:text-medical-teal transition-colors">Disclaimer</Link></li>
                            <li><Link to="/privacy" className="hover:text-medical-teal transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-medical-teal transition-colors">Terms of Service</Link></li>
                            <li><Link to="/cookie-policy" className="hover:text-medical-teal transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Q-ADE Health. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
