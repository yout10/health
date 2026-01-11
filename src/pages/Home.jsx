import React from 'react';
import FeatureItem from '../components/FeatureItem';

const Home = () => {
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
    );
};

export default Home;
