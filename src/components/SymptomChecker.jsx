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

    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = false;
            recognitionInstance.interimResults = false;
            recognitionInstance.lang = 'en-US';

            recognitionInstance.onstart = () => setIsListening(true);
            recognitionInstance.onend = () => setIsListening(false);
            recognitionInstance.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setSymptoms((prev) => prev ? `${prev} ${transcript}` : transcript);
            };

            setRecognition(recognitionInstance);
        }
    }, []);

    const toggleListening = () => {
        if (!recognition) {
            alert("Voice input is not supported in this browser.");
            return;
        }

        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
    };

    return (
        <div className="bg-white dark:bg-white/5 p-8 rounded-lg shadow-lg border border-gray-100 dark:border-white/10 max-w-2xl mx-auto mt-8 animate-fade-in relative overflow-hidden backdrop-blur-sm transition-colors duration-300">
            {/* Credit Counter Badge */}
            <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                    ${user?.credits > 0 ? 'bg-teal-100 text-teal-800' : 'bg-red-100 text-red-800'}`}>
                    Credits Results: {user?.credits || 0}
                </span>
            </div>

            <div className="absolute top-0 right-0 p-4">
                <input
                    type="password"
                    placeholder="Enter OpenRouter Key"
                    className="text-xs bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded px-2 py-1 focus:outline-none focus:border-medical-teal dark:text-gray-200 w-32 focus:w-48 transition-all"
                    value={apiKey}
                    onChange={handleApiKeyChange}
                    title="Enter your OpenRouter API Key for real analysis"
                />
            </div>

            <h2 className="text-2xl font-serif text-gray-800 dark:text-white mb-6 flex items-center justify-center gap-2 mt-8 md:mt-0">
                <span className="text-medical-teal">✦</span> AI Symptom Analysis
            </h2>

            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-md mb-6 text-sm">
                    {error}
                </div>
            )}

            {!result ? (
                <div className="space-y-6">
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Describe your symptoms
                        </label>
                        <textarea
                            className="w-full h-32 p-4 border border-gray-300 dark:border-white/10 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none transition-all pr-12 bg-white dark:bg-black/20 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                            placeholder="e.g., I have a throbbing headache and sensitivity to light..."
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                            disabled={isAnalyzing}
                        />
                        <button
                            onClick={toggleListening}
                            className={`absolute bottom-8 right-4 p-2 rounded-full transition-all ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-500 hover:bg-teal-50 hover:text-medical-teal'}`}
                            title="Use Voice Input"
                            disabled={isAnalyzing}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        </button>
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
                    <div className="p-4 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-medical-teal rounded-r-md">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-teal-800 dark:text-teal-400 mb-1">Risk Assessment</h3>
                        <p className="text-3xl font-serif text-teal-900 dark:text-teal-200">{result.risk}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Preliminary Evaluation</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{result.evaluation}</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Recommended Actions</h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-white/5 p-4 rounded-md">{result.guidance}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <button
                            onClick={handleReset}
                            className="w-full py-3 px-6 border border-gray-300 dark:border-white/10 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors font-medium"
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
