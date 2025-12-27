import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const SymptomChecker = () => {
    const [symptoms, setSymptoms] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const { user, deductCredit } = useAuth();

    // Load API key from local storage on mount
    useEffect(() => {
        const storedKey = localStorage.getItem('openrouter_api_key');
        if (storedKey) setApiKey(storedKey);
    }, []);

    const handleApiKeyChange = (e) => {
        const key = e.target.value;
        setApiKey(key);
        localStorage.setItem('openrouter_api_key', key);
    };

    const analyzeWithOpenRouter = async () => {
        try {
            const prompt = `
        Act as a preliminary medical symptom checker AI. 
        Analyze the following symptoms: "${symptoms}".
        
        Provide the output in the following JSON format ONLY, without any markdown formatting:
        {
          "risk": "Low" | "Moderate" | "High",
          "evaluation": "One or two sentences explaining what these symptoms might indicate.",
          "guidance": "Short, actionable advice on what to do next (e.g., rest, see a doctor within 24 hours, go to ER)."
        }
      `;

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "model": "openrouter/auto",
                    "messages": [
                        { "role": "user", "content": prompt }
                    ],
                    "response_format": { "type": "json_object" }
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `API Error: ${response.status}`);
            }

            const data = await response.json();
            const content = data.choices[0].message.content;

            const cleanText = content.replace(/```json/g, '').replace(/```/g, '').trim();

            return JSON.parse(cleanText);
        } catch (err) {
            console.error("OpenRouter API Error:", err);
            throw new Error(err.message || "Failed to generate analysis. Please check your API Key and try again.");
        }
    };

    const handleAnalyze = async () => {
        if (!symptoms.trim()) return;

        // Check credits
        if (user && user.credits <= 0) {
            setError("You have run out of credits. Please recharge to continue.");
            return;
        }

        setIsAnalyzing(true);
        setError(null);
        setResult(null);

        try {
            if (apiKey.trim()) {
                const aiResult = await analyzeWithOpenRouter();
                setResult(aiResult);
                deductCredit();
            } else {
                // Fallback Simulation
                setTimeout(() => {
                    setResult({
                        risk: 'Moderate (Demo)',
                        evaluation: 'This is a demo analysis. Connect a valid OpenRouter API Key for real-time, personalized insights.',
                        guidance: 'Enter an API Key above to unlock the full power of Q-ADE Health AI.',
                    });
                    deductCredit();
                }, 1500);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleReset = () => {
        setSymptoms('');
        setResult(null);
        setError(null);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 max-w-2xl mx-auto mt-8 animate-fade-in relative overflow-hidden">
            {/* Credit Counter Badge */}
            <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                    ${user?.credits > 0 ? 'bg-teal-100 text-teal-800' : 'bg-red-100 text-red-800'}`}>
                    Credits Results: {user?.credits || 0}
                </span>
            </div>

            {/* API Key Input Section */}
            <div className="absolute top-0 right-0 p-4">
                <input
                    type="password"
                    placeholder="Enter OpenRouter Key"
                    className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-medical-teal w-32 focus:w-48 transition-all"
                    value={apiKey}
                    onChange={handleApiKeyChange}
                    title="Enter your OpenRouter API Key for real analysis"
                />
            </div>

            <h2 className="text-2xl font-serif text-gray-800 mb-6 flex items-center justify-center gap-2 mt-8 md:mt-0">
                <span className="text-medical-teal">✦</span> AI Symptom Analysis
            </h2>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6 text-sm">
                    {error}
                </div>
            )}

            {!result ? (
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Describe your symptoms
                        </label>
                        <textarea
                            className="w-full h-32 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none transition-all"
                            placeholder="e.g., I have a throbbing headache and sensitivity to light..."
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                            disabled={isAnalyzing}
                        />
                        <p className="text-xs text-gray-400 mt-2 text-right">
                            {apiKey ? "Powered by OpenRouter" : "Running in Demo Mode (No API Key)"}
                        </p>
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={!symptoms.trim() || isAnalyzing || (user && user.credits <= 0)}
                        className={`w-full py-4 px-6 rounded-md text-white font-medium text-lg transition-all duration-300
              ${!symptoms.trim() || isAnalyzing || (user && user.credits <= 0)
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-medical-teal hover:bg-teal-700 shadow-md hover:shadow-lg'}`}
                    >
                        {isAnalyzing ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {apiKey ? 'Consulting AI...' : 'Analyzing...'}
                            </span>
                        ) : (
                            user && user.credits > 0 ? 'Analyze Symptoms (1 Credit)' : 'No Credits Remaining'
                        )}
                    </button>
                </div>
            ) : (
                <div className="space-y-6 animate-fade-in">
                    <div className="p-4 bg-teal-50 border-l-4 border-medical-teal rounded-r-md">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-teal-800 mb-1">Risk Assessment</h3>
                        <p className="text-3xl font-serif text-teal-900">{result.risk}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Preliminary Evaluation</h3>
                        <p className="text-gray-600 leading-relaxed">{result.evaluation}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">Recommended Actions</h3>
                        <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-md">{result.guidance}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <button
                            onClick={handleReset}
                            className="w-full py-3 px-6 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                        >
                            Start New Analysis
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SymptomChecker;
