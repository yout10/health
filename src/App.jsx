import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Checker from './pages/Checker';
import About from './pages/About';
import LoginModal from './components/LoginModal';
import SubscriptionModal from './components/SubscriptionModal';


function App() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);

    return (
        <Router>
            <div className="min-h-screen bg-white px-6 py-12 md:py-24 font-sans">
                <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
                <SubscriptionModal isOpen={isSubscriptionOpen} onClose={() => setIsSubscriptionOpen(false)} />

                <div className="max-w-4xl mx-auto">
                    <Navbar
                        onOpenLogin={() => setIsLoginOpen(true)}
                        onOpenSubscription={() => setIsSubscriptionOpen(true)}
                    />

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/checker" element={<Checker onOpenLogin={() => setIsLoginOpen(true)} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
