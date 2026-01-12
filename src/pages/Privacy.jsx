import React from 'react';

const Privacy = () => {
    return (
        <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-gray-700">
            <h1 className="text-3xl font-serif text-gray-900">Privacy Policy</h1>
            <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

            <section>
                <h2 className="text-xl font-bold text-gray-900 mb-2">1. Information We Collect</h2>
                <p>We collect information you provide directly to us when you create an account, use our symptom checker, or subscribe to our premium services. This may include your email address, name, and health-related symptoms you input.</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-gray-900 mb-2">2. How We Use Your Information</h2>
                <p>We use the information we collect to operate, maintain, and improve our services, including processing your symptom inputs via our AI models to provide relevant health insights.</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-gray-900 mb-2">3. Data Security</h2>
                <p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. However, remember that no method of transmission over the internet is 100% secure and reliable.</p>
            </section>
        </div>
    );
};

export default Privacy;
