import React from 'react';

const CookiePolicy = () => {
    return (
        <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-gray-700">
            <h1 className="text-3xl font-serif text-gray-900">Cookie Policy</h1>
            <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>

            <section>
                <h2 className="text-xl font-bold text-gray-900 mb-2">What Are Cookies</h2>
                <p>As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience.</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-gray-900 mb-2">How We Use Cookies</h2>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Account related cookies:</strong> If you create an account with us then we will use cookies for the management of the signup process and general administration.</li>
                    <li><strong>Login related cookies:</strong> We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page.</li>
                </ul>
            </section>
        </div>
    );
};

export default CookiePolicy;
