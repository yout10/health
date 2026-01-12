import React from 'react';
import FeatureItem from '../components/FeatureItem';
import { Link } from 'react-router-dom';

const Services = () => {
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
        {
            number: '05',
            title: 'Secure & Private',
            description: 'Your health data is encrypted and handled with the utmost security and privacy standards.'
        },
        {
            number: '06',
            title: '24/7 Availability',
            description: 'Access medical insights anytime, anywhere, without waiting for an appointment.'
        }
    ];

    return (
        <div className="animate-fade-in space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-serif text-gray-900 mb-4">Our Services</h1>
                <p className="text-lg text-gray-600">
                    Comprehensive AI-powered health tools designed to empower you with knowledge and clarity.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="text-medical-teal font-extrabold text-2xl mb-3 opacity-20">{feature.number}</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                ))}
            </div>

            <div className="text-center mt-12">
                <Link
                    to="/checker"
                    className="inline-block bg-medical-teal text-white px-8 py-3 rounded-full font-medium hover:bg-teal-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    Try Symptom Checker
                </Link>
            </div>
        </div>
    );
};

export default Services;
