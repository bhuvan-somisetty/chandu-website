import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import AudioPlayer from './components/AudioPlayer';
import WelcomeScreen from './components/WelcomeScreen';
import HeartBurst from './components/HeartBurst';

import Home from './pages/Home';
import JourneyPage from './pages/JourneyPage';
import GalleryPage from './pages/GalleryPage';
import MessagePage from './pages/MessagePage';
import { NavigationProvider, useHeartNavigation } from './context/NavigationContext';

function AnimatedContent() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/message" element={<MessagePage />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const { showHeartBurst, triggerBurst } = useHeartNavigation();
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <div className="relative font-sans antialiased text-white selection:bg-pink-500 selection:text-white min-h-[100dvh]">
      <HeartBurst isVisible={showHeartBurst} />
      {!hasEntered && (
        <WelcomeScreen 
          onContinue={() => {
            triggerBurst();
            setHasEntered(true);
          }} 
        />
      )}

      {/* Background Star Layer - Persistent across routes */}
      <div className="stars-bg"></div>
      
      {/* Dynamic gradients floating in the background overall */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-purple-800/20 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-float pointer-events-none z-0" style={{ animationDuration: '10s' }}></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-pink-800/15 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-float pointer-events-none z-0" style={{ animationDuration: '15s', animationDelay: '2s' }}></div>

      <Navbar />
      
      <main className="relative z-10 w-full overflow-hidden">
        <AnimatedContent />
      </main>
      
      <AudioPlayer autoPlayTrigger={hasEntered} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </BrowserRouter>
  );
}

export default App;
