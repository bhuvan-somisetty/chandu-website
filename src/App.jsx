import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingDock from './components/FloatingDock';
import CursorTrail from './components/CursorTrail';
import FloatingBalloons from './components/FloatingBalloons';
import AchievementNotification from './components/AchievementNotification';
import { ThemeProvider } from './context/ThemeContext';
import { AchievementProvider } from './context/AchievementContext';

import Home from './pages/Home';
import GamesPage from './pages/GamesPage';
import ActivitiesPage from './pages/ActivitiesPage';
import GalleryPage from './pages/GalleryPage';
import MessagePage from './pages/MessagePage';
import AchievementsPage from './pages/AchievementsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <ThemeProvider>
      <AchievementProvider>
        <CursorTrail />
        <FloatingBalloons />
        <AchievementNotification />
        <Navbar />

        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/message" element={<MessagePage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <FloatingDock />
        <Footer />
      </AchievementProvider>
    </ThemeProvider>
  );
}
