import React from 'react';

const FeatureItem = ({ number, title, description }) => {
    return (
        <div className="group py-6 border-t border-gray-200 hover:bg-gray-50 transition-colors duration-300 cursor-default">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
                <span className="text-sm font-medium text-gray-500 group-hover:text-medical-teal transition-colors duration-300">
                    {number}
                </span>
                <div className="flex-1">
                    <h3 className="text-2xl font-serif text-gray-700 mb-2 group-hover:text-medical-teal transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed max-w-2xl">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FeatureItem;
