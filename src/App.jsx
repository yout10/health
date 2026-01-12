import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Checker from './pages/Checker';
import About from './pages/About';
import Services from './pages/Services';
import Footer from './components/Footer';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import CookiePolicy from './pages/CookiePolicy';
import LoginModal from './components/LoginModal';
import SubscriptionModal from './components/SubscriptionModal';
import Contact from './pages/Contact';


function App() {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);

    return (
        <Router>
            <div className="min-h-screen bg-white font-sans flex flex-col">
                <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
                <SubscriptionModal isOpen={isSubscriptionOpen} onClose={() => setIsSubscriptionOpen(false)} />

                <Navbar
                    onOpenLogin={() => setIsLoginOpen(true)}
                    onOpenSubscription={() => setIsSubscriptionOpen(true)}
                />

                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/cookie-policy" element={<CookiePolicy />} />
                        <Route path="/checker" element={<Checker onOpenLogin={() => setIsLoginOpen(true)} />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
