import React from 'react';

const Terms = () => {
    return (
        <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-gray-700">
            <h1 className="text-3xl font-serif text-gray-900">Terms of Service</h1>
            <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

            <section>
                <h2 className="text-xl font-bold text-gray-900 mb-2">1. Agreement to Terms</h2>
                <p>By accessing our website at Q-ADE Health, you agree to be bound by these terms of service and to comply with all applicable laws and regulations.</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-gray-900 mb-2">2. Use License</h2>
                <p>Permission is granted to temporarily download one copy of the materials (information or software) on Q-ADE Health's website for personal, non-commercial transitory viewing only.</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-gray-900 mb-2">3. Disclaimer</h2>
                <p className="border-l-4 border-yellow-500 pl-4 py-1 italic bg-yellow-50">
                    The materials on Q-ADE Health's website are provided on an 'as is' basis. Q-ADE Health makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    <br /><br />
                    <strong>Medical Advice:</strong> Q-ADE Health does not provide medical advice. The content is for informational purposes only.
                </p>
            </section>
        </div>
    );
};

export default Terms;
