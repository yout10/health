import React from 'react';
import FeatureItem from '../components/FeatureItem';
import { Link } from 'react-router-dom';

const Home = () => {
    const features = [
        {
            number: '01',
            title: 'Instant Analysis',
            description: 'AI-powered symptom evaluation in seconds.'
        },
        {
            number: '02',
            title: 'Smart Triage',
            description: 'Determine urgency and next steps immediately.'
        },
        {
            number: '03',
            title: 'Secure Data',
            description: 'Your health information is encrypted and private.'
        },
        {
            number: '04',
            title: '24/7 Access',
            description: 'Medical guidance whenever you need it.'
        },
    ];

    return (
        <div className="animate-fade-in space-y-24">
            {/* Hero Section */}
            <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32 max-w-7xl mx-auto">
                <div className="flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-24">
                    <div className="flex-1 space-y-8 text-center md:text-left">
                        <div className="inline-block px-4 py-2 bg-teal-50 dark:bg-teal-400/10 text-medical-teal dark:text-teal-300 rounded-full text-sm font-bold tracking-wide uppercase mb-2">
                            Advanced AI Health Assistant
                        </div>
                        <h1 className="text-5xl md:text-6xl font-serif text-gray-900 dark:text-gray-100 leading-tight">
                            Your Health, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-teal to-teal-400">
                                Decoded by Intelligence.
                            </span>
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed max-w-lg mx-auto md:mx-0">
                            Instant, reliable preliminary medical guidance powered by next-generation Artificial Intelligence.
                            Understanding your symptoms has never been this fast.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                            <Link
                                to="/checker"
                                className="w-full sm:w-auto bg-medical-teal text-white px-8 py-4 rounded-full font-bold hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
                            >
                                Start Analysis
                            </Link>
                            <Link
                                to="/services"
                                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors border border-gray-200 dark:border-white/10 text-center"
                            >
                                Learn More
                            </Link>
                        </div>

                        <div className="pt-8 flex items-center justify-center md:justify-start gap-6 text-sm text-gray-400 font-medium">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span> Live System
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                HIPAA Compliant
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-teal-200/20 to-transparent rounded-full filter blur-3xl animate-pulse"></div>
                        <img
                            src="/hero.png"
                            alt="AI Health Illustration"
                            className="relative z-10 w-full h-auto object-contain drop-shadow-2xl rounded-3xl transform hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="bg-gray-50 dark:bg-slate-900/50 py-24 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-serif text-gray-900 dark:text-white mb-4">Why Trust Q-ADE?</h2>
                        <p className="text-gray-600 dark:text-gray-300">Built with precision, prioritized for your peace of mind.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white dark:bg-white/5 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 hover:shadow-lg transition-all flex items-start gap-6 backdrop-blur-sm">
                                <span className="text-4xl font-serif text-teal-100 dark:text-teal-500/20 font-bold">{feature.number}</span>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
