import React, { useState } from 'react';
import FeatureItem from './components/FeatureItem';
import SymptomChecker from './components/SymptomChecker';
import LoginModal from './components/LoginModal';
import SubscriptionModal from './components/SubscriptionModal';
import { useAuth } from './context/AuthContext';

function App() {
    const [showChecker, setShowChecker] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
    const { user, logout } = useAuth();

    const handleStartAnalysis = () => {
        if (user) {
            setShowChecker(true);
        } else {
            setIsLoginOpen(true);
        }
    };

    const features = [
        {
            number: '01',
            title: 'Instant Symptom Analysis',
            description: 'AI analyzes patient symptoms using medical databases to provide immediate insights.'
        },
        {
            number: '02',
            title: 'Preliminary Evaluation',
            description: 'Generates evidence-based assessments quickly to aid in triage and decision making.'
        },
        {
            number: '03',
            title: 'Risk Level Assessment',
            description: 'Categorizes risk to clarify urgency and prioritize patient care effectively.'
        },
        {
            number: '04',
            title: 'Actionable Guidance',
            description: 'Provides personalized care recommendations tailored to the specific condition.'
        },
    ];

    return (
        <div className="min-h-screen bg-white px-6 py-12 md:py-24 font-sans">
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            <SubscriptionModal isOpen={isSubscriptionOpen} onClose={() => setIsSubscriptionOpen(false)} />

            <div className="max-w-4xl mx-auto">
                <header className="mb-16">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
                        <div className="flex items-center gap-4">
                            <img src="/health.png" alt="Q-ADE Health Logo" className="h-12 w-12 object-contain" />
                            <h1 className="text-4xl font-serif text-gray-900 tracking-tight">Q-ADE Health</h1>
                        </div>

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
                                        onClick={() => setIsSubscriptionOpen(true)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-sm transition-colors uppercase tracking-wider"
                                    >
                                        Get Elite
                                    </button>

                                    {!showChecker && (
                                        <button
                                            onClick={handleStartAnalysis}
                                            className="bg-medical-teal text-white px-6 py-3 rounded-full font-medium hover:bg-teal-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ml-2"
                                        >
                                            Start Analysis
                                        </button>
                                    )}
                                    <button
                                        onClick={() => { logout(); setShowChecker(false); }}
                                        className="text-sm text-gray-500 hover:text-red-500 transition-colors ml-2"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setIsLoginOpen(true)}
                                        className="text-medical-teal font-medium hover:underline"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={handleStartAnalysis}
                                        className="bg-medical-teal text-white px-6 py-3 rounded-full font-medium hover:bg-teal-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        Start AI Analysis
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl">
                        Q-ADE Health uses AI for instant preliminary medical guidance. It analyzes symptoms in real-time,
                        providing immediate evaluations that empower patients and support healthcare providers.
                    </p>
                </header>

                {showChecker ? (
                    <div className="space-y-8 animate-fade-in-up">
                        <button
                            onClick={() => setShowChecker(false)}
                            className="text-gray-500 hover:text-medical-teal flex items-center gap-2 mb-4 transition-colors"
                        >
                            ← Back to Features
                        </button>
                        <SymptomChecker />
                    </div>
                ) : (
                    <div className="space-y-2 animate-fade-in">
                        {features.map((feature, index) => (
                            <FeatureItem
                                key={index}
                                number={feature.number}
                                title={feature.title}
                                description={feature.description}
                            />
                        ))}
                        <div className="border-t border-gray-200"></div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
